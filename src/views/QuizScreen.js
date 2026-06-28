import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';
import { OrganImageFlash } from '../views/ImageMapping';

export default function QuizScreen({ controller }) {
  const question = controller.activeQuizQuestions[controller.quizActiveIndex];

  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const contentSlideAnim = useRef(new Animated.Value(20)).current;
  const explainFadeAnim = useRef(new Animated.Value(0)).current;
  const explainSlideAnim = useRef(new Animated.Value(-10)).current;

  // Animasikan masuknya pertanyaan baru setiap kali index berubah
  useEffect(() => {
    if (question && question.question) {
      // 1. Jalankan fungsi suara dari controller utama
      controller.speakText(question.question);
    }

    contentFadeAnim.setValue(0);
    contentSlideAnim.setValue(15);
    Animated.parallel([
      Animated.timing(contentFadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(contentSlideAnim, { toValue: 0, duration: 300, useNativeDriver: true })
    ]).start();
  }, [controller.quizActiveIndex, question]);

  // Animasikan kartu penjelasan saat soal dijawab
  useEffect(() => {
    if (controller.quizIsAnswered) {
      explainFadeAnim.setValue(0);
      explainSlideAnim.setValue(-10);
      Animated.parallel([
        Animated.timing(explainFadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(explainSlideAnim, { toValue: 0, duration: 250, useNativeDriver: true })
      ]).start();
    }
  }, [controller.quizIsAnswered]);

  // Hentikan suara pertanyaan saat keluar dari kuis (unmount)
  useEffect(() => {
    return () => {
      if (controller.stopSpeak) {
        controller.stopSpeak();
      }
    };
  }, []);

  if (!question) return null;

  const totalQs = controller.activeQuizQuestions.length;
  const progressPercent = ((controller.quizActiveIndex) / totalQs) * 100;
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <View style={styles.screenContainer}>
      {/* Notch Safe Header */}
      <View style={[styles.navHeader, { paddingTop: STATUSBAR_PADDING }]}>
        <TouchableOpacity style={styles.navBtn} onPress={() => controller.navigateTo('quiz-setup')}>
          <Ionicons name="close" size={22} color="#E63946" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Kuis Interaktif</Text>
        <View style={[styles.quizTimerBox, controller.quizTimerSecs <= 5 && styles.quizTimerBoxTicking]}>
          <Ionicons name="timer" size={14} color={controller.quizTimerSecs <= 5 ? "#E63946" : "#FF9F43"} />
          <Text style={[styles.quizTimerText, controller.quizTimerSecs <= 5 && { color: '#E63946' }]}>{controller.quizTimerSecs}s</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.quizContentScroll}>
        <View style={styles.quizStatsRow}>
          <Text style={styles.quizIndexText}>Soal {controller.quizActiveIndex + 1} dari {totalQs}</Text>
          <Text style={styles.quizPointsText}>Poin: {controller.quizAnswersCorrect * 2} / {totalQs * 2}</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.quizProgressBarBg}>
          <View style={[styles.quizProgressBarFill, { width: `${progressPercent}%` }]} />
        </View>

        {/* Animated Wrapper for Question and Options */}
        <Animated.View style={{ opacity: contentFadeAnim, transform: [{ translateY: contentSlideAnim }] }}>
          {/* Question Card */}
          <View style={styles.quizQuestionCard}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 12 
            }}>
              <View style={styles.questionSystemRow}>
                <Text style={styles.questionSystemText}>
                  {controller.getSystemCleanName(question.sys).toUpperCase()}
                </Text>
              </View>
              
              {/* TOMBOL AUDIO MANUAL PREMIUM */}
              <TouchableOpacity 
                activeOpacity={0.6}
                onPress={() => controller.speakText(question.question)}
                style={{ 
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  backgroundColor: 'rgba(0, 168, 150, 0.1)', // Teal transparan lembut
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(0, 168, 150, 0.2)',
                  // Efek shadow halus khusus iOS/Android
                  shadowColor: '#00A896',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <Ionicons name="volume-high" size={18} color="#00A896" />
              </TouchableOpacity>
            </View>

            {question.image && OrganImageFlash[question.image] && (
              <Image
                source={OrganImageFlash[question.image]}
                style={{
                  width: '100%',
                  height: 220,
                  resizeMode: 'contain',
                  marginBottom: 15,
                  borderRadius: 12,
                  backgroundColor: '#FFF'
                }}
              />
            )}
            
            {/* Teks Soal Utama */}
            <Text style={styles.quizQuestionText}>{question.question}</Text>
          </View>

          {/* Choices Options list or Spelling inputs */}
          {(question.questionMode || 'choice') === 'choice' ? (
            <View style={styles.quizOptionsList}>
              {question.options.map((optText, idx) => {
                const isSelected = controller.quizSelectedOptionIdx === idx;
                const isCorrectChoice = question.correct === idx;
                
                let btnStyle = styles.quizOptionBtn;
                let letterStyle = styles.quizOptionLetter;
                let letterTextColor = '#718096';

                if (controller.quizIsAnswered) {
                  if (isCorrectChoice) {
                    btnStyle = [styles.quizOptionBtn, styles.quizOptionBtnCorrect];
                    letterStyle = [styles.quizOptionLetter, styles.quizOptionLetterCorrect];
                    letterTextColor = '#FFFFFF';
                  } else if (isSelected) {
                    btnStyle = [styles.quizOptionBtn, styles.quizOptionBtnIncorrect];
                    letterStyle = [styles.quizOptionLetter, styles.quizOptionLetterIncorrect];
                    letterTextColor = '#FFFFFF';
                  }
                }

                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.7}
                    style={btnStyle}
                    disabled={controller.quizIsAnswered}
                    onPress={() => controller.handleSelectOption(idx)}
                  >
                    <View style={letterStyle}>
                      <Text style={{ fontWeight: 'bold', fontSize: 12, color: letterTextColor }}>{letters[idx]}</Text>
                    </View>
                    <Text style={styles.quizOptionText}>{optText}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            /* Baru: Tebak Kata (Spelling Mode) */
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              
              {/* Row Kotak-Kotak Jawaban (Alphabet Toy Blocks) */}
              <View style={{ 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: 8, 
                marginBottom: 28,
                width: '100%',
                paddingHorizontal: 8
              }}>
                {controller.spellingInput.map((char, index) => {
                  const isLetter = char !== ' ' && char !== '/' && char !== '-';
                  
                  // Deteksi warna berdasarkan status jawaban kuis & pengisian
                  let boxBg = '#F7FAFC'; // Default empty
                  let boxBorderColor = '#CBD5E0';
                  let textColor = '#2D3748';
                  let borderW = 2.5;

                  if (isLetter) {
                    if (char !== '') {
                      // Sudah terisi tapi belum diperiksa
                      boxBg = '#EBF8FF'; // Pastel Blue
                      boxBorderColor = '#4299E1'; // Blue
                      textColor = '#2B6CB0';
                    } else {
                      // Masih kosong (Alphabet block holder)
                      boxBg = '#FFFDF0'; // Soft Yellow Cream
                      boxBorderColor = '#FED7D7'; // Soft reddish outline
                      textColor = '#A0AEC0';
                    }

                    if (controller.quizIsAnswered) {
                      const isQuizCorrect = controller.quizSelectedOptionIdx === question.correct;
                      if (isQuizCorrect) {
                        boxBg = '#C6F6D5'; // Pastel Green
                        boxBorderColor = '#48BB78';
                        textColor = '#22543D';
                      } else {
                        boxBg = '#FED7D7'; // Pastel Red
                        boxBorderColor = '#F56565';
                        textColor = '#742A2A';
                      }
                    }
                  }

                  if (!isLetter) {
                    // Spasi atau pemisah
                    return (
                      <View 
                        key={index} 
                        style={{ 
                          width: char === ' ' ? 20 : 15, 
                          justifyContent: 'center', 
                          alignItems: 'center' 
                        }}
                      >
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#A0AEC0' }}>
                          {char}
                        </Text>
                      </View>
                    );
                  }

                  return (
                    <View
                      key={index}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12, // Chunky round blocks
                        borderWidth: borderW,
                        borderColor: boxBorderColor,
                        backgroundColor: boxBg,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // Subtle 3D shadow for wood block look
                        shadowColor: boxBorderColor,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 1,
                        elevation: 2,
                      }}
                    >
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: textColor }}>
                        {char}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* Grid Keyboard Tombol Huruf (Pebble/Toy Buttons) */}
              <View style={{ 
                flexDirection: 'row', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: 10, 
                maxWidth: 290, // Limit width to form a nice 3-row grid (5, 5, 5)
                marginBottom: 24
              }}>
                {controller.spellingOptions.map((char, idx) => {
                  const isUsed = controller.spellingSelectedIndexes.includes(idx);
                  return (
                    <TouchableOpacity
                      key={idx}
                      activeOpacity={0.6}
                      disabled={isUsed || controller.quizIsAnswered}
                      onPress={() => controller.handlePressLetter(char, idx)}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 14,
                        borderWidth: isUsed ? 1.5 : 2.5,
                        borderColor: isUsed ? '#CBD5E0' : '#ECC94B', // Yellow border
                        backgroundColor: isUsed ? '#EDF2F7' : '#FEFCBF', // Yellow key
                        justifyContent: 'center',
                        alignItems: 'center',
                        // 3D Push button effect
                        shadowColor: isUsed ? '#000' : '#D69E2E',
                        shadowOffset: { width: 0, height: isUsed ? 0 : 3.5 },
                        shadowOpacity: isUsed ? 0 : 0.8,
                        shadowRadius: 0,
                        elevation: isUsed ? 0 : 3,
                        transform: [{ translateY: isUsed ? 2 : 0 }]
                      }}
                    >
                      <Text style={{ 
                        fontSize: 18, 
                        fontWeight: 'bold', 
                        color: isUsed ? '#A0AEC0' : '#7B341E' // Warm brown text
                      }}>
                        {char}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                {/* Tombol Backspace / Hapus */}
                <TouchableOpacity
                  activeOpacity={0.6}
                  disabled={controller.spellingSelectedIndexes.length === 0 || controller.quizIsAnswered}
                  onPress={() => controller.handleDeleteLetter()}
                  style={{
                    width: 54,
                    height: 44,
                    borderRadius: 14,
                    borderWidth: (controller.spellingSelectedIndexes.length === 0 || controller.quizIsAnswered) ? 1.5 : 2.5,
                    borderColor: (controller.spellingSelectedIndexes.length === 0 || controller.quizIsAnswered) ? '#CBD5E0' : '#F56565',
                    backgroundColor: (controller.spellingSelectedIndexes.length === 0 || controller.quizIsAnswered) ? '#EDF2F7' : '#FED7D7',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // 3D Push button effect for delete
                    shadowColor: (controller.spellingSelectedIndexes.length === 0 || controller.quizIsAnswered) ? '#000' : '#C53030',
                    shadowOffset: { width: 0, height: (controller.spellingSelectedIndexes.length === 0 || controller.quizIsAnswered) ? 0 : 3.5 },
                    shadowOpacity: (controller.spellingSelectedIndexes.length === 0 || controller.quizIsAnswered) ? 0 : 0.8,
                    shadowRadius: 0,
                    elevation: (controller.spellingSelectedIndexes.length === 0 || controller.quizIsAnswered) ? 0 : 3,
                    transform: [{ translateY: (controller.spellingSelectedIndexes.length === 0 || controller.quizIsAnswered) ? 2 : 0 }]
                  }}
                >
                  <Ionicons 
                    name="backspace" 
                    size={22} 
                    color={(controller.spellingSelectedIndexes.length === 0 || controller.quizIsAnswered) ? '#A0AEC0' : '#E53E3E'} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Animated.View>

        {/* Correct Explanation Banner Sheet */}
        {controller.quizIsAnswered && (
          <Animated.View style={[styles.quizExplanationCard, { opacity: explainFadeAnim, transform: [{ translateY: explainSlideAnim }] }]}>
            <Ionicons name="information-circle" size={20} color="#00A896" style={{ marginRight: 8, marginTop: 2 }} />
            <Text style={styles.quizExplanationText}>
              {(question.questionMode || 'choice') === 'spelling'
                ? `Koreksi: Kata yang benar adalah "${question.options[question.correct]}".\n\n${question.explanation.replace(/Pembahasan:\s*Pilihan yang tepat adalah [A-D]\.?\s*/i, '')}`
                : question.explanation
              }
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}
