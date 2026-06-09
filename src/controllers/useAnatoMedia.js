import { useState, useEffect, useRef } from "react";
import { Animated, Easing, Dimensions, BackHandler } from "react-native";
import * as Haptics from "expo-haptics";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MedicalDatabase from "../../data/database.json";
import MainQuizQuestionsPool from "../../data/questions.json";
import InitialUsersDatabase from "../../data/users.json";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function useAnatoMedia() {
  // Navigation & Screen Control
  const [activeScreen, setActiveScreen] = useState("splash"); // 'splash', 'login-screen', 'dashboard', 'organ-selection', 'overview', 'quiz-setup', 'quiz', 'scoreboard'
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [lastQuizResult, setLastQuizResult] = useState(null);

  // --- STATE DATA USER & FORM INPUT BARU ---
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState("login"); // 'login' atau 'register'
  const [usersDatabase, setUsersDatabase] = useState([]);
  const [formName, setFormName] = useState("");
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");

  // Active Organ Study Dashboard state
  const [activeStudySystem, setActiveStudySystem] = useState("digestive");
  const [studyTab, setStudyTab] = useState("atlas"); // 'atlas', 'kamus', 'kartu'
  const [dictionarySearch, setDictionarySearch] = useState("");

  // Flashcard Deck study state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [flashcardProgress, setFlashcardProgress] = useState({
    circulatory: 0,
    respiratory: 0,
    digestive: 0,
    skeletal: 0,
    muscular: 0,
    excretory: 0,
  });

  // First Time User Walkthrough flag
  const [firstTimeUser, setFirstTimeUser] = useState(false);

  // Quiz Difficulty parameter
  const [quizDifficulty, setQuizDifficulty] = useState("medium"); // 'easy', 'medium', 'hard'
  const [quizSettings, setQuizSettings] = useState({ system: "all" });
  const [activeQuizQuestions, setActiveQuizQuestions] = useState([]);
  const [quizActiveIndex, setQuizActiveIndex] = useState(0);
  const [quizAnswersCorrect, setQuizAnswersCorrect] = useState(0);
  const [quizAnswersWrong, setQuizAnswersWrong] = useState(0);
  const [quizSelectedOptionIdx, setQuizSelectedOptionIdx] = useState(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState(false);
  const [quizTimerSecs, setQuizTimerSecs] = useState(20);
  const [quizHistoriesList, setQuizHistoriesList] = useState({});
  const [isQuizResultMode, setIsQuizResultMode] = useState(false);
  const [isStartingQuiz, setIsStartingQuiz] = useState(false);

  const getTimerDuration = () => {
    if (quizDifficulty === "easy") return 30;
    if (quizDifficulty === "medium") return 20;
    return 10;
  };

  const getDifficultyCleanName = (lvl) => {
    if (lvl === "easy") return "Mudah";
    if (lvl === "hard") return "Sulit";
    return "Sedang";
  };

  // --- LOGIKA UTAMA SINKRONISASI DATABASE USERS ---
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      // Mengambil data pendaftaran lokal dari local storage HP
      const localUsersJson = await AsyncStorage.getItem("@custom_users_db");
      const localUsers = localUsersJson ? JSON.parse(localUsersJson) : [];
      // Menggabungkan isi users.json statis dengan data register baru
      setUsersDatabase([...InitialUsersDatabase, ...localUsers]);
    } catch (error) {
      console.error("Gagal memuat database user:", error);
    }
  };

  // Fungsi Pendaftaran Akun Baru
  const handleRegister = async () => {
    if (!formName || !formUsername || !formPassword) {
      triggerToast("Semua kolom wajib diisi!");
      return;
    }

    const userExists = usersDatabase.find(
      (u) => u.username.toLowerCase() === formUsername.toLowerCase(),
    );

    if (userExists) {
      triggerToast("Username sudah terpakai!");
      return;
    }

    try {
      const localUsersJson = await AsyncStorage.getItem("@custom_users_db");
      const localUsers = localUsersJson ? JSON.parse(localUsersJson) : [];

      // Dibuat SAMA PERSIS dengan struktur file users.json milikmu
      const newUser = {
        username: formUsername,
        password: formPassword,
        name: formName,
        history: [], // Menampung data riwayat progres di masa depan
      };

      const updatedLocalUsers = [...localUsers, newUser];
      await AsyncStorage.setItem(
        "@custom_users_db",
        JSON.stringify(updatedLocalUsers),
      );

      // Update data di memori aplikasi saat ini
      setUsersDatabase([...InitialUsersDatabase, ...updatedLocalUsers]);

      triggerToast("Pendaftaran berhasil! Silakan masuk.");
      setAuthMode("login");
      setFormPassword("");
      setFormName("");
      setFormUsername("");
    } catch (error) {
      triggerToast("Gagal menyimpan ke basis data.");
    }
  };

  // Fungsi Masuk Akun
  const handleLogin = () => {
    if (!formUsername || !formPassword) {
      triggerToast("Username dan Password wajib diisi!");
      return;
    }

    const userExists = usersDatabase.find(
      (u) => u.username.toLowerCase() === formUsername.toLowerCase(),
    );

    if (!userExists) {
      triggerToast("Gagal Masuk: Username tidak terdaftar!");
      return;
    }

    if (userExists.password !== formPassword) {
      triggerToast("Gagal Masuk: Password yang Anda masukkan salah!");
      return;
    }

    // ==== PROSES MASUK SUKSES ====
    setCurrentUser(userExists);

    // TAMBAHKAN BARIS INI: Mengaktifkan status pop-up tutorial saat masuk dashboard
    setFirstTimeUser(true);

    triggerToast(`Selamat datang, ${userExists.name}!`);
    navigateTo("dashboard");
  };
  // Fungsi Keluar Akun
  const handleLogout = () => {
    setCurrentUser(null);
    setFormUsername("");
    setFormPassword("");
    setFormName("");
    navigateTo("login-screen");
    triggerToast("Berhasil keluar.");
  };

  // Fungsi Update Profil Akun
  const handleUpdateProfile = async (newName, newUsername, newPassword) => {
    if (!newName || !newUsername || !newPassword) {
      triggerToast("Semua kolom profil wajib diisi!");
      return false;
    }

    try {
      const currentUsername = currentUser.username.toLowerCase();
      
      // Check if new username is already taken by someone else
      if (currentUsername !== newUsername.toLowerCase()) {
        const usernameTaken = usersDatabase.find(
          u => u.username.toLowerCase() === newUsername.toLowerCase()
        );
        if (usernameTaken) {
          triggerToast("Username sudah digunakan oleh akun lain!");
          return false;
        }
      }

      // Update local storage
      const localUsersJson = await AsyncStorage.getItem('@custom_users_db');
      const localUsers = localUsersJson ? JSON.parse(localUsersJson) : [];
      
      let userUpdated = false;
      const updatedLocalUsers = localUsers.map(u => {
        if (u.username.toLowerCase() === currentUsername) {
          userUpdated = true;
          return { ...u, name: newName, username: newUsername, password: newPassword };
        }
        return u;
      });

      if (!userUpdated) {
        updatedLocalUsers.push({ ...currentUser, name: newName, username: newUsername, password: newPassword });
      }

      await AsyncStorage.setItem('@custom_users_db', JSON.stringify(updatedLocalUsers));

      const updatedUser = { ...currentUser, name: newName, username: newUsername, password: newPassword };
      setCurrentUser(updatedUser);
      
      setUsersDatabase(prev => prev.map(u => {
        if (u.username.toLowerCase() === currentUsername) {
           return updatedUser;
        }
        return u;
      }));

      triggerToast("Profil berhasil diperbarui!");
      return true;
    } catch (error) {
      triggerToast("Gagal menyimpan perubahan profil.");
      return false;
    }
  };
  const saveQuizScore = (newHistoryItem) => {
    const currentUsername = currentUser?.username?.toLowerCase();
    if (!currentUsername) return;

    setQuizHistoriesList((prev) => {
      // Pengaman anti-crash jika state terdeteksi bukan objek
      const safePrev =
        prev && typeof prev === "object" && !Array.isArray(prev) ? prev : {};
      const userOldHistory = safePrev[currentUsername] || [];
      return {
        ...safePrev,
        [currentUsername]: [newHistoryItem, ...userOldHistory],
      };
    });
  };
  // Quiz countdown timer ticker
  useEffect(() => {
    let timerInterval;
    if (activeScreen === "quiz" && !quizIsAnswered) {
      timerInterval = setInterval(() => {
        setQuizTimerSecs((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            handleSelectOption(-1); // Automatically mark as timed out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [activeScreen, quizActiveIndex, quizIsAnswered, quizDifficulty]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  // Google Text-to-Speech Pronunciation Engine
  const speakText = (text) => {
    if (!text) return;
    try {
      Speech.stop();
      Speech.speak(text, {
        language: "id", // Clean ID speech dialect pronunciation
        pitch: 1.0,
        rate: 0.85, // Slightly slower for clear clinical terminology articulation
      });
      triggerToast(`Audio: "${text}"`);
    } catch (e) {
      console.warn("Speech pronunciation error:", e);
    }
  };

  const stopSpeak = () => {
    try {
      Speech.stop();
    } catch (e) {
      console.warn("Speech stop error:", e);
    }
  };

  const navigateTo = (screen) => {
    Speech.stop();
    setQuizTimerSecs(getTimerDuration());
    setActiveScreen(screen);
    triggerToast(`Navigasi ke ${screen.toUpperCase()}`);
  };

  const getSystemCleanName = (key) => {
    switch (key) {
      case "circulatory":
        return "Peredaran Darah";
      case "respiratory":
        return "Pernapasan";
      case "digestive":
        return "Pencernaan";
      case "skeletal":
        return "Rangka";
      case "muscular":
        return "Otot";
      case "excretory":
        return "Ekskresi";
      default:
        return "Semua Sistem";
    }
  };

  // Fisher-Yates array shuffling
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const getFilteredQuestionsCount = () => {
    let pool = MainQuizQuestionsPool;
    if (quizSettings.system !== "all") {
      pool = MainQuizQuestionsPool.filter((q) => q.sys === quizSettings.system);
    }
    let filtered = pool.filter((q) => q.level === quizDifficulty);
    if (filtered.length < 5) return pool.length;
    return filtered.length;
  };

  // Launch and initialize the customized Quiz
  const startQuizSimulator = (force = false) => {
    const isForce = force === true;
    if (
      !isForce &&
      activeQuizQuestions.length > 0 &&
      quizActiveIndex < activeQuizQuestions.length &&
      !isQuizResultMode
    ) {
      navigateTo("quiz");
      return;
    }
    // cegah double tap / double execute

    let pool = MainQuizQuestionsPool;

    if (quizSettings.system !== "all") {
      pool = MainQuizQuestionsPool.filter((q) => q.sys === quizSettings.system);
    }

    if (pool.length === 0) {
      triggerToast("Kuis sistem terpilih belum siap!");
      setIsStartingQuiz(false);
      return;
    }

    let filteredByDiff = pool.filter((q) => q.level === quizDifficulty);

    if (filteredByDiff.length < 5) {
      filteredByDiff = pool;
    }

    const shuffled = shuffleArray(filteredByDiff);

    const selected = shuffled.slice(0, 50);

    setActiveQuizQuestions(selected);
    setQuizActiveIndex(0);
    setQuizAnswersCorrect(0);
    setQuizAnswersWrong(0);
    setQuizSelectedOptionIdx(null);
    setQuizIsAnswered(false);
    setQuizTimerSecs(getTimerDuration());

    setIsQuizResultMode(false);

    const now = new Date();

    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const currentUsername = currentUser?.username?.toLowerCase();

    if (currentUsername) {
      setQuizHistoriesList((prev) => {
        const safePrev =
          prev && typeof prev === "object" && !Array.isArray(prev) ? prev : {};

        let userOldHistory = safePrev[currentUsername] || [];

        // If force restart, update any existing ongoing quizzes to 'aborted'
        if (isForce) {
          userOldHistory = userOldHistory.map((item) => {
            if (item.status === "ongoing") {
              const progressPercent = activeQuizQuestions.length > 0
                ? Math.round((quizActiveIndex / activeQuizQuestions.length) * 100)
                : 0;
              return {
                ...item,
                status: "aborted",
                title: item.title
                  .replace("Ujian Anatomi Kesulitan", "Kuis Dibatalkan:")
                  .replace("Kuis Anatomi -", "Kuis Dibatalkan:")
                  .replace("Kuis Anatomi:", "Kuis Dibatalkan:"),
                progress: progressPercent,
                color: "#E74C3C", // Red color for aborted
              };
            }
            return item;
          });
        } else {
          // kalau ada ongoing jangan tambah
          const hasOngoing = userOldHistory.some(
            (item) => item.status === "ongoing",
          );

          if (hasOngoing) {
            return safePrev;
          }
        }

        const ongoingQuiz = {
          id: Date.now(),
          title: `Kuis Anatomi: ${getDifficultyCleanName(quizDifficulty)}`,
          date: `${now.getDate()}/${
            now.getMonth() + 1
          }/${now.getFullYear()} • ${timeStr}`,
          score: 0,
          progress: 0,
          status: "ongoing",
          color: "#FF9F43",
        };

        return {
          ...safePrev,
          [currentUsername]: [ongoingQuiz, ...userOldHistory],
        };
      });
    }

    navigateTo("quiz");
  };

  const resetQuizHistory = () => {
    const currentUsername = currentUser?.username?.toLowerCase();
    if (!currentUsername) return;

    setQuizHistoriesList((prev) => {
      const safePrev =
        prev && typeof prev === "object" && !Array.isArray(prev) ? prev : {};
      return {
        ...safePrev,
        [currentUsername]: [], // Hanya bersihkan laci milik user aktif ini
      };
    });

    triggerToast("Histori kuis Anda berhasil dibersihkan!");
  };

  const resumeQuizSimulator = () => {
    setActiveScreen("quiz");
  };

  // Android Hardware Back Button Handler
  useEffect(() => {
    const backAction = () => {
      switch (activeScreen) {
        case "overview":
          setActiveScreen("organ-selection");
          return true;
        case "quiz":
          setActiveScreen("quiz-setup");
          return true;
        case "scoreboard":
          setActiveScreen("dashboard");
          return true;
        case "organ-selection":
        case "quiz-setup":
          setActiveScreen("dashboard");
          return true;
        case "dashboard":
          // Di halaman dashboard, tombol back fisik membawa user kembali ke halaman login
          setActiveScreen("login-screen");
          return true;
        case "login-screen":
        default:
          return false; // Di halaman login, tombol back fisik langsung keluar dari aplikasi
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [activeScreen]);

  // Handle choice locking & explanation triggers
  const handleSelectOption = (idx) => {
    if (quizIsAnswered) return;

    setQuizIsAnswered(true);
    setQuizSelectedOptionIdx(idx);

    const question = activeQuizQuestions[quizActiveIndex];
    const isCorrect = idx === question.correct;

    // hitung nilai lokal langsung
    const newCorrectCount = isCorrect
      ? quizAnswersCorrect + 1
      : quizAnswersCorrect;

    try {
      if (isCorrect) {
        setQuizAnswersCorrect((prev) => prev + 1);
        triggerToast("Jawaban Benar");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        setQuizAnswersWrong((prev) => prev + 1);
        triggerToast("Jawaban Kurang Tepat");
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (e) {
      console.warn("Haptics trigger failed:", e);
    }

    // Update ongoing progress in history
    const totalQs = activeQuizQuestions.length;
    const currentUsername = currentUser?.username?.toLowerCase();
    if (currentUsername) {
      setQuizHistoriesList((prev) => {
        const safePrev =
          prev && typeof prev === "object" && !Array.isArray(prev) ? prev : {};
        const updatedHistory = [...(safePrev[currentUsername] || [])];
        const ongoingIndex = updatedHistory.findIndex(
          (item) => item.status === "ongoing",
        );
        if (ongoingIndex !== -1) {
          const progressPercent = totalQs > 0 ? Math.round(((quizActiveIndex + 1) / totalQs) * 100) : 0;
          updatedHistory[ongoingIndex] = {
            ...updatedHistory[ongoingIndex],
            progress: progressPercent,
          };
        }
        return {
          ...safePrev,
          [currentUsername]: updatedHistory,
        };
      });
    }

    setTimeout(() => {
      if (quizActiveIndex < totalQs - 1) {
        // lanjut soal berikutnya
        setQuizActiveIndex((prev) => prev + 1);
        setQuizSelectedOptionIdx(null);
        setQuizIsAnswered(false);
        setQuizTimerSecs(getTimerDuration());
      } else {
        // ===== QUIZ SELESAI =====
        const finalScore = Math.round((newCorrectCount / totalQs) * 100);

        if (currentUsername) {
          setQuizHistoriesList((prev) => {
            const safePrev =
              prev && typeof prev === "object" && !Array.isArray(prev)
                ? prev
                : {};

            const userOldHistory = safePrev[currentUsername] || [];
            const updatedHistory = [...userOldHistory];

            const ongoingIndex = updatedHistory.findIndex(
              (item) => item.status === "ongoing",
            );

            if (ongoingIndex !== -1) {
              updatedHistory[ongoingIndex] = {
                ...updatedHistory[ongoingIndex],
                score: finalScore,
                progress: 100,
                status: "finished",
                title: `Kuis Anatomi: ${getDifficultyCleanName(quizDifficulty)}`,
                color:
                  finalScore >= 80
                    ? "#2ECC71"
                    : finalScore >= 60
                      ? "#00A896"
                      : "#FF9F43",
              };
            }

            return {
              ...safePrev,
              [currentUsername]: updatedHistory,
            };
          });
        }

        setLastQuizResult({
          correct: newCorrectCount,
          wrong: totalQs - newCorrectCount,
          total: totalQs,
          score: finalScore
        });

        setIsQuizResultMode(true);
        navigateTo("scoreboard");
      }
    }, 4500);
  };

  const nextFlashcard = () => {
    const terms = MedicalDatabase.filter((t) => t.sys === activeStudySystem);
    setFlashcardFlipped(false);
    setTimeout(() => {
      setFlashcardIndex((prev) => (prev < terms.length - 1 ? prev + 1 : 0));
    }, 120);
  };

  const prevFlashcard = () => {
    const terms = MedicalDatabase.filter((t) => t.sys === activeStudySystem);
    setFlashcardFlipped(false);
    setTimeout(() => {
      setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : terms.length - 1));
    }, 120);
  };

  const jumpToFlashcard = (umumName) => {
    const terms = MedicalDatabase.filter((t) => t.sys === activeStudySystem);
    const foundIdx = terms.findIndex(
      (t) => t.umum.toLowerCase() === umumName.toLowerCase(),
    );
    if (foundIdx !== -1) {
      setFlashcardIndex(foundIdx);
      setFlashcardFlipped(true); // Auto flipped to reveal medical term & structure illustration
      setStudyTab("kartu");
      triggerToast(`Buka Kartu: ${umumName}`);
    }
  };

  // Open specific Organ Dashboard
  const openOrganDashboard = (sysKey) => {
    setActiveStudySystem(sysKey);
    setStudyTab("atlas");
    setFlashcardIndex(0);
    setFlashcardFlipped(false);
    setDictionarySearch("");
    navigateTo("overview");
  };

  return {
    activeScreen,
    toastMessage,
    toastVisible,
    aboutModalVisible,
    activeStudySystem,
    studyTab,
    dictionarySearch,
    flashcardIndex,
    flashcardFlipped,
    flashcardProgress,
    activeQuizQuestions,
    quizActiveIndex,
    quizAnswersCorrect,
    quizAnswersWrong,
    quizSelectedOptionIdx,
    quizIsAnswered,
    quizTimerSecs,
    quizHistoriesList,
    isQuizResultMode,
    setIsQuizResultMode,
    lastQuizResult,
    resetQuizHistory,
    firstTimeUser,
    quizSettings,
    setFirstTimeUser,
    quizDifficulty,
    setQuizDifficulty,
    setQuizSettings,
    triggerToast,
    speakText,
    stopSpeak,
    navigateTo,
    getSystemCleanName,
    startQuizSimulator,
    handleSelectOption,
    nextFlashcard,
    prevFlashcard,
    jumpToFlashcard,
    openOrganDashboard,
    setStudyTab,
    setDictionarySearch,
    setFlashcardFlipped,
    setAboutModalVisible,
    getTimerDuration,
    getDifficultyCleanName,
    getFilteredQuestionsCount,
    resumeQuizSimulator,
    currentUser,
    authMode,
    setAuthMode,
    formName,
    setFormName,
    formUsername,
    setFormUsername,
    formPassword,
    setFormPassword,
    handleLogin,
    handleRegister,
    handleLogout,
    handleUpdateProfile,
  };
}
