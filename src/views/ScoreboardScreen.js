import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';

export default function ScoreboardScreen({ controller }) {
  const totalQs = controller.activeQuizQuestions.length > 0 ? controller.activeQuizQuestions.length : 50;
  const finalScore = Math.round((controller.quizAnswersCorrect / totalQs) * 100);

  // High tech laser scanning translateY value
  const scannerY = controller.confettiAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 170]
  });

  return (
    <View style={styles.screenContainer}>
      {/* Notch Safe Header */}
      <View style={[styles.navHeader, { paddingTop: STATUSBAR_PADDING }]}>
        <TouchableOpacity style={styles.navBtn} onPress={() => controller.navigateTo('dashboard')}>
          <Ionicons name="arrow-back" size={20} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Evaluasi Hasil Kuis</Text>
        <TouchableOpacity style={styles.navBtn} onPress={() => controller.triggerToast("Skor Berhasil Disimpan")}>
          <Ionicons name="pulse" size={18} color="#00A896" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scoreboardScroll}>
        <Text style={styles.celebrateTitle}>
          {finalScore >= 80 ? 'LULUS EVALUASI ANATOMI' : (finalScore >= 60 ? 'HASIL CUKUP MEMUASKAN' : 'EVALUASI BELAJAR DIANJURKAN')}
        </Text>
        <Text style={styles.celebrateSub}>Pembelajaran Kedokteran Mandiri Tanpa Akun</Text>

        {/* SVG Score Circle with integrated neon cardiac scanner */}
        <View style={styles.circularProgressContainer}>
          <Svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: [{ rotate: '-90deg' }] }}>
            <Circle cx="90" cy="90" r="75" fill="none" stroke="#F1F5F9" strokeWidth="12" />
            <Circle
              cx="90"
              cy="90"
              r="75"
              fill="none"
              stroke="#00A896"
              strokeWidth="12"
              strokeDasharray="471.2"
              strokeDashoffset={471.2 - (471.2 * finalScore) / 100}
              strokeLinecap="round"
            />
          </Svg>
          
          {/* Animated Diagnostics Scanner Laser Line */}
          <View style={styles.scannerContainer}>
            <Animated.View style={[styles.scannerLine, { transform: [{ translateY: scannerY }] }]} />
          </View>

          <View style={styles.circularProgressTextBox}>
            <Text style={styles.circularProgressScore}>{finalScore}%</Text>
            <Text style={styles.circularProgressLabel}>SKOR KUIS</Text>
          </View>
        </View>

        {/* Statistics summary row */}
        <View style={styles.statsDetailsCard}>
          <View style={styles.statsCol}>
            <Text style={[styles.statsVal, { color: '#2ECC71' }]}>{controller.quizAnswersCorrect}</Text>
            <Text style={styles.statsLabel}>Jawaban Benar</Text>
          </View>
          <View style={[styles.statsCol, styles.borderRightLeft]}>
            <Text style={[styles.statsVal, { color: '#E74C3C' }]}>{controller.quizAnswersWrong}</Text>
            <Text style={styles.statsLabel}>Jawaban Salah</Text>
          </View>
          <View style={styles.statsCol}>
            <Text style={[styles.statsVal, { color: '#00A896' }]}>{totalQs} Soal</Text>
            <Text style={styles.statsLabel}>Jumlah Soal</Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.scoreboardActionRow}>
          <TouchableOpacity style={styles.btnFilledTeal} onPress={() => controller.navigateTo('quiz-setup')}>
            <Ionicons name="refresh" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.btnFilledTealText}>Ulangi Kuis (Atur Kembali)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnOutlinedSecondary} onPress={() => controller.navigateTo('dashboard')}>
            <Ionicons name="home" size={18} color="#2C3E50" style={{ marginRight: 6 }} />
            <Text style={styles.btnOutlinedSecondaryText}>Kembali ke Dashboard Utama</Text>
          </TouchableOpacity>
        </View>

        {/* Local Scoreboard log list */}
        <View style={styles.scoreboardHistorySection}>
          <Text style={styles.scoreboardHistoryHeading}>Daftar Riwayat Kuis Anda:</Text>
          {controller.quizHistoriesList.map((item, idx) => (
            <View key={idx} style={styles.historyItemBox}>
              <View>
                <Text style={styles.historyItemName}>{item.title}</Text>
                <Text style={styles.historyItemMeta}>{item.date}</Text>
              </View>
              <View style={[styles.historyItemScoreBadge, { backgroundColor: item.color + '15', borderColor: item.color }]}>
                <Text style={[styles.historyItemScoreText, { color: item.color }]}>{item.score}%</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}
