import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';

export default function QuizScreen({ controller }) {
  const question = controller.activeQuizQuestions[controller.quizActiveIndex];

  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const contentSlideAnim = useRef(new Animated.Value(20)).current;
  const explainFadeAnim = useRef(new Animated.Value(0)).current;
  const explainSlideAnim = useRef(new Animated.Value(-10)).current;

  // Animasikan masuknya pertanyaan baru setiap kali index berubah
  useEffect(() => {
    contentFadeAnim.setValue(0);
    contentSlideAnim.setValue(15);
    Animated.parallel([
      Animated.timing(contentFadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(contentSlideAnim, { toValue: 0, duration: 300, useNativeDriver: true })
    ]).start();
  }, [controller.quizActiveIndex]);

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

  if (!question) return null;

  const totalQs = controller.activeQuizQuestions.length;
  const progressPercent = ((controller.quizActiveIndex) / totalQs) * 100;
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <View style={styles.screenContainer}>
      {/* Notch Safe Header */}
      <View style={[styles.navHeader, { paddingTop: STATUSBAR_PADDING }]}>
        <TouchableOpacity style={styles.navBtn} onPress={() => controller.navigateTo('dashboard')}>
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
          <Text style={styles.quizPointsText}>Poin: {controller.quizAnswersCorrect * 10} / {totalQs * 10}</Text>
        </View>

        {/* Progress bar */}
        <View style={styles.quizProgressBarBg}>
          <View style={[styles.quizProgressBarFill, { width: `${progressPercent}%` }]} />
        </View>

        {/* Animated Wrapper for Question and Options */}
        <Animated.View style={{ opacity: contentFadeAnim, transform: [{ translateY: contentSlideAnim }] }}>
          {/* Question Card */}
          <View style={styles.quizQuestionCard}>
            <View style={styles.questionSystemRow}>
              <Text style={styles.questionSystemText}>{controller.getSystemCleanName(question.sys).toUpperCase()}</Text>
            </View>
            <Text style={styles.quizQuestionText}>{question.question}</Text>
          </View>

          {/* Choices Options list */}
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
        </Animated.View>

        {/* Correct Explanation Banner Sheet */}
        {controller.quizIsAnswered && (
          <Animated.View style={[styles.quizExplanationCard, { opacity: explainFadeAnim, transform: [{ translateY: explainSlideAnim }] }]}>
            <Ionicons name="information-circle" size={20} color="#00A896" style={{ marginRight: 8, marginTop: 2 }} />
            <Text style={styles.quizExplanationText}>
              {question.explanation}
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}
