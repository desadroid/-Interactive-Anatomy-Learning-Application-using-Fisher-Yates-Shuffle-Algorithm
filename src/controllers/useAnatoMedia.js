import { useState, useEffect, useRef } from 'react';
import { Animated, Easing, Dimensions, BackHandler } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import MedicalDatabase from '../../data/database.json';
import MainQuizQuestionsPool from '../../data/questions.json';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function useAnatoMedia() {
  // Navigation & Screen Control
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [presenterVisible, setPresenterVisible] = useState(false);

  // Active Organ Study Dashboard state
  const [activeStudySystem, setActiveStudySystem] = useState('digestive');
  const [studyTab, setStudyTab] = useState('atlas'); // 'atlas', 'kamus', 'kartu'
  const [dictionarySearch, setDictionarySearch] = useState('');
  
  // Flashcard Deck study state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [flashcardProgress, setFlashcardProgress] = useState({ 
    circulatory: 0, 
    respiratory: 0, 
    digestive: 0, 
    skeletal: 0, 
    muscular: 0, 
    excretory: 0 
  });

  // First Time User Walkthrough flag
  const [firstTimeUser, setFirstTimeUser] = useState(true);

  // Quiz Difficulty parameter
  const [quizDifficulty, setQuizDifficulty] = useState('medium'); // 'easy', 'medium', 'hard'
  const [quizSettings, setQuizSettings] = useState({ system: 'all' });
  const [activeQuizQuestions, setActiveQuizQuestions] = useState([]);
  const [quizActiveIndex, setQuizActiveIndex] = useState(0);
  const [quizAnswersCorrect, setQuizAnswersCorrect] = useState(0);
  const [quizAnswersWrong, setQuizAnswersWrong] = useState(0);
  const [quizSelectedOptionIdx, setQuizSelectedOptionIdx] = useState(null);
  const [quizIsAnswered, setQuizIsAnswered] = useState(false);
  const [quizTimerSecs, setQuizTimerSecs] = useState(20);
  const [quizHistoriesList, setQuizHistoriesList] = useState([
    { title: 'Kuis Pencernaan (Gaster)', date: 'Baru Saja', score: 90, color: '#2ECC71' },
    { title: 'Kuis Rangka (Costae)', date: 'Kemarin', score: 70, color: '#FF9F43' }
  ]);
  const [isQuizResultMode, setIsQuizResultMode] = useState(false);

  const getTimerDuration = () => {
    return 60; // Generous 60 seconds limit for all levels
  };

  const getDifficultyCleanName = (lvl) => {
    if (lvl === 'easy') return 'Mudah (Istilah Dasar)';
    if (lvl === 'hard') return 'Sulit (Struktur & Klinis)';
    return 'Sedang (Fungsi Organ)';
  };

  // Quiz countdown timer ticker
  useEffect(() => {
    let timerInterval;
    if (activeScreen === 'quiz' && !quizIsAnswered) {
      timerInterval = setInterval(() => {
        setQuizTimerSecs(prev => {
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
    Speech.stop();
    Speech.speak(text, {
      language: 'id', // Clean ID speech dialect pronunciation
      pitch: 1.0,
      rate: 0.85 // Slightly slower for clear clinical terminology articulation
    });
    triggerToast(`Audio: "${text}"`);
  };

  const stopSpeak = () => {
    Speech.stop();
  };

  const navigateTo = (screen) => {
    Speech.stop();
    setQuizTimerSecs(getTimerDuration());
    setActiveScreen(screen);
    triggerToast(`Navigasi ke ${screen.toUpperCase()}`);

    if (screen === 'scoreboard') {
      const totalActive = activeQuizQuestions.length || 50;
      const finalScore = Math.round((quizAnswersCorrect / totalActive) * 100);

      // Append score to local histories log
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const newHistory = {
        title: `Ujian Anatomi (${getDifficultyCleanName(quizDifficulty)})`,
        date: `Baru Saja • ${now.getDate()} Mei • ${timeStr}`,
        score: finalScore,
        color: finalScore >= 80 ? '#2ECC71' : (finalScore >= 60 ? '#00A896' : '#FF9F43')
      };
      setQuizHistoriesList(prev => [newHistory, ...prev.slice(0, 3)]);
    }
  };

  const getSystemCleanName = (key) => {
    switch (key) {
      case 'circulatory': return 'Peredaran Darah';
      case 'respiratory': return 'Pernapasan';
      case 'digestive': return 'Pencernaan';
      case 'skeletal': return 'Rangka';
      case 'muscular': return 'Otot';
      case 'excretory': return 'Ekskresi';
      default: return 'Semua Sistem';
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
    if (quizSettings.system !== 'all') {
      pool = MainQuizQuestionsPool.filter(q => q.sys === quizSettings.system);
    }
    let filtered = pool.filter(q => q.level === quizDifficulty);
    if (filtered.length < 5) return pool.length;
    return filtered.length;
  };

  // Launch and initialize the customized Quiz
  const startQuizSimulator = () => {
    let pool = MainQuizQuestionsPool;
    if (quizSettings.system !== 'all') {
      pool = MainQuizQuestionsPool.filter(q => q.sys === quizSettings.system);
    }

    if (pool.length === 0) {
      triggerToast("Kuis sistem terpilih belum siap!");
      return;
    }

    // Filter by anatomical difficulty
    let filteredByDiff = pool.filter(q => q.level === quizDifficulty);
    
    // Fallback if system has too few questions under this level
    if (filteredByDiff.length < 5) {
      filteredByDiff = pool;
    }

    const shuffled = shuffleArray(filteredByDiff);
    // Pick all questions (50 questions per session)
    const selected = shuffled.slice(0, 50);

    setActiveQuizQuestions(selected);
    setQuizActiveIndex(0);
    setQuizAnswersCorrect(0);
    setQuizAnswersWrong(0);
    setQuizSelectedOptionIdx(null);
    setQuizIsAnswered(false);
    setQuizTimerSecs(getTimerDuration());

    navigateTo('quiz');
  };

  const resumeQuizSimulator = () => {
    setActiveScreen('quiz');
  };

  // Android Hardware Back Button Handler
  useEffect(() => {
    const backAction = () => {
      // Return true to prevent default exit, false to allow exit
      switch (activeScreen) {
        case 'overview':
          setActiveScreen('organ-selection');
          return true;
        case 'quiz':
          setActiveScreen('quiz-setup');
          return true;
        case 'scoreboard':
          setActiveScreen('dashboard');
          return true;
        case 'organ-selection':
        case 'quiz-setup':
          setActiveScreen('dashboard');
          return true;
        case 'dashboard':
        default:
          return false; // Allow exit app
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [activeScreen]);

  // Handle choice locking & explanation triggers
  const handleSelectOption = (idx) => {
    if (quizIsAnswered) return;
    setQuizIsAnswered(true);
    setQuizSelectedOptionIdx(idx);

    const question = activeQuizQuestions[quizActiveIndex];
    const isCorrect = idx === question.correct;

    if (isCorrect) {
      setQuizAnswersCorrect(prev => prev + 1);
      triggerToast("Jawaban Benar");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setQuizAnswersWrong(prev => prev + 1);
      triggerToast("Jawaban Kurang Tepat");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); // Native Android/iOS strong haptic feedback
    }

    // Hold screen for 4.5 seconds so students can read the detailed clinical explanation
    setTimeout(() => {
      const totalQs = activeQuizQuestions.length;
      if (quizActiveIndex < totalQs - 1) {
        setQuizActiveIndex(prev => prev + 1);
        setQuizSelectedOptionIdx(null);
        setQuizIsAnswered(false);
        setQuizTimerSecs(getTimerDuration());
      } else {
        setIsQuizResultMode(true);
        navigateTo('scoreboard');
      }
    }, 4500);
  };

  const nextFlashcard = () => {
    const terms = MedicalDatabase.filter(t => t.sys === activeStudySystem);
    setFlashcardFlipped(false);
    setTimeout(() => {
      setFlashcardIndex(prev => (prev < terms.length - 1 ? prev + 1 : 0));
    }, 120);
  };

  const prevFlashcard = () => {
    const terms = MedicalDatabase.filter(t => t.sys === activeStudySystem);
    setFlashcardFlipped(false);
    setTimeout(() => {
      setFlashcardIndex(prev => (prev > 0 ? prev - 1 : terms.length - 1));
    }, 120);
  };

  const jumpToFlashcard = (umumName) => {
    const terms = MedicalDatabase.filter(t => t.sys === activeStudySystem);
    const foundIdx = terms.findIndex(t => t.umum.toLowerCase() === umumName.toLowerCase());
    if (foundIdx !== -1) {
      setFlashcardIndex(foundIdx);
      setFlashcardFlipped(true); // Auto flipped to reveal medical term & structure illustration
      setStudyTab('kartu');
      triggerToast(`Buka Kartu: ${umumName}`);
    }
  };

  // Open specific Organ Dashboard
  const openOrganDashboard = (sysKey) => {
    setActiveStudySystem(sysKey);
    setStudyTab('atlas');
    setFlashcardIndex(0);
    setFlashcardFlipped(false);
    setDictionarySearch('');
    navigateTo('overview');
  };

  return {
    activeScreen,
    toastMessage,
    toastVisible,
    aboutModalVisible,
    presenterVisible,
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
    setPresenterVisible,
    setQuizSettings,
    getTimerDuration,
    getDifficultyCleanName,
    getFilteredQuestionsCount,
    resumeQuizSimulator
  };
}
