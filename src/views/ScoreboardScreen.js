import React, { useEffect, useRef } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';

export default function ScoreboardScreen({ controller }) {
  const isResultMode = controller.isQuizResultMode;
  const totalQs = (isResultMode && controller.lastQuizResult)
    ? controller.lastQuizResult.total
    : (controller.activeQuizQuestions.length > 0 ? controller.activeQuizQuestions.length : 50);

  let finalScore = (isResultMode && controller.lastQuizResult)
    ? controller.lastQuizResult.score
    : Math.round((controller.quizAnswersCorrect / totalQs) * 100);

  if (isNaN(finalScore)) {
    finalScore = 0;
  }

  // Local Animation Value
  const confettiAnimValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (controller.isQuizResultMode) {
      const animLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(confettiAnimValue, {
            toValue: 1,
            duration: 2200,
            useNativeDriver: false
          }),
          Animated.timing(confettiAnimValue, {
            toValue: 0,
            duration: 2200,
            useNativeDriver: false
          })
        ])
      );
      animLoop.start();

      // Clean up infinite loop to prevent Android freeze on background
      return () => animLoop.stop();
    }
  }, [controller.isQuizResultMode, confettiAnimValue]);

  // High tech laser scanning translateY value
  const scannerY = confettiAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 170]
  });

  // PERBAIKAN UTAMA: Ambil histori spesifik berdasarkan User Aktif
  const currentUsername = controller.currentUser?.username?.toLowerCase() || '';
  // Ambil data dari objek map, jika belum ada atau kosong, default ke array []
  const histories = (controller.quizHistoriesList && controller.quizHistoriesList[currentUsername]) || [];

  const totalQuizzes = histories.length;
  const averageScore = totalQuizzes > 0
    ? Math.round(histories.reduce((sum, item) => sum + item.score, 0) / totalQuizzes)
    : 0;
  const passedQuizzes = histories.filter(item => item.score >= 80).length;

  if (!controller.isQuizResultMode) {
    return (
      <View style={styles.screenContainer}>
        {/* Notch Safe Header */}
        <View style={[styles.navHeader, { paddingTop: STATUSBAR_PADDING }]}>
          <TouchableOpacity style={styles.navBtn} onPress={() => controller.navigateTo('dashboard')}>
            <Ionicons name="arrow-back" size={20} color="#2C3E50" />
          </TouchableOpacity>
          <Text style={styles.navTitle}>Riwayat Kuis</Text>
          <TouchableOpacity style={styles.navBtn} onPress={() => controller.triggerToast("Data Riwayat Sinkron")}>
            <Ionicons name="pulse" size={18} color="#00A896" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scoreboardScroll}>
          <Text style={styles.celebrateTitle}>RINGKASAN KUIS</Text>
          <Text style={styles.celebrateSub}>Evaluasi hasil belajar dan kuis kedokteran mandiri</Text>

          {/* Quick Stats Grid */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginVertical: 18, paddingHorizontal: 4 }}>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 2, elevation: 1 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(52, 152, 219, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="ribbon" size={18} color="#3498DB" />
              </View>
              <Text style={{ fontSize: 9, color: '#718096', fontWeight: 'bold' }}>RATA RATA</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginTop: 4 }}>{averageScore}%</Text>
            </View>

            <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 2, elevation: 1 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(0, 168, 150, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="checkmark-circle" size={18} color="#00A896" />
              </View>
              <Text style={{ fontSize: 9, color: '#718096', fontWeight: 'bold' }}>KUIS LULUS</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginTop: 4 }}>{passedQuizzes}/{totalQuizzes}</Text>
            </View>

            <View style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 2, elevation: 1 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255, 159, 67, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                <Ionicons name="time" size={18} color="#FF9F43" />
              </View>
              <Text style={{ fontSize: 9, color: '#718096', fontWeight: 'bold' }}>TOTAL KUIS</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginTop: 4 }}>{totalQuizzes}</Text>
            </View>
          </View>

          {/* Action buttons */}
          <View style={[styles.scoreboardActionRow, { marginBottom: 16 }]}>
            <TouchableOpacity style={styles.btnFilledTeal} onPress={() => controller.navigateTo('quiz-setup')}>
              <Ionicons name="refresh" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.btnFilledTealText}>Mulai Kuis Baru</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutlinedSecondary} onPress={() => controller.navigateTo('dashboard')}>
              <Ionicons name="home" size={18} color="#2C3E50" style={{ marginRight: 6 }} />
              <Text style={styles.btnOutlinedSecondaryText}>Kembali ke Dashboard</Text>
            </TouchableOpacity>
          </View>

          {/* Local Scoreboard log list */}
          <View style={styles.scoreboardHistorySection}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={[styles.scoreboardHistoryHeading, { marginBottom: 0 }]}>Daftar Riwayat Kuis Anda:</Text>
              
              {/* TOMBOL RESET BARU */}
              {histories.length > 0 && (
                <TouchableOpacity 
                  style={{ backgroundColor: '#FFF5F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#FEB2B2' }}
                  onPress={controller.resetQuizHistory}
                >
                  <Text style={{ color: '#E53E3E', fontSize: 11, fontWeight: '600' }}>Reset Histori</Text>
                </TouchableOpacity>
              )}
            </View>
            
            {histories.length === 0 ? (
              <Text style={{ textAlign: 'center', color: '#718096', fontSize: 12, marginTop: 24, fontStyle: 'italic' }}>Belum ada kuis yang diikuti. Riwayat kuis Anda akan muncul di sini.</Text>
            ) : (
              histories.map((item, idx) => (
                <View key={idx} style={styles.historyItemBox}>
                  <View>
                    <Text style={styles.historyItemName}>{item.title}</Text>
                    <Text style={styles.historyItemMeta}>
                      {item.date} &bull; <Text style={{ fontWeight: '600' }}>{item.status === 'finished' ? 'Selesai' : (item.status === 'aborted' ? 'Dibatalkan' : 'Sedang Berjalan')}</Text>
                    </Text>
                  </View>
                  <View style={[styles.historyItemScoreBadge, { backgroundColor: (item.color || '#718096') + '15', borderColor: item.color || '#718096' }]}>
                    <Text style={[styles.historyItemScoreText, { color: item.color || '#718096' }]}>
                      {item.status === 'finished' ? item.score : (item.progress || 0)}%
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>

        </ScrollView>
      </View>
    );
  }

  // Quiz Result Mode (Show circular progress bar and celebration title)
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
          {finalScore >= 80 ? 'LULUS EVALUASI MATERI' : (finalScore >= 60 ? 'HASIL CUKUP MEMUASKAN' : 'EVALUASI BELAJAR DIANJURKAN')}
        </Text>
        <Text style={styles.celebrateSub}>Pembelajaran Kedokteran Mandiri dengan Profil Lokal</Text>

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
            <Text style={[styles.statsVal, { color: '#2ECC71' }]}>
              {controller.lastQuizResult ? controller.lastQuizResult.correct : controller.quizAnswersCorrect}
            </Text>
            <Text style={styles.statsLabel}>Jawaban Benar</Text>
          </View>
          <View style={[styles.statsCol, styles.borderRightLeft]}>
            <Text style={[styles.statsVal, { color: '#E74C3C' }]}>
              {controller.lastQuizResult ? controller.lastQuizResult.wrong : controller.quizAnswersWrong}
            </Text>
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
          {histories.map((item, idx) => (
            <View key={idx} style={styles.historyItemBox}>
              <View>
                <Text style={styles.historyItemName}>{item.title}</Text>
                <Text style={styles.historyItemMeta}>
                  {item.date} &bull; <Text style={{ fontWeight: '600' }}>{item.status === 'finished' ? 'Selesai' : (item.status === 'aborted' ? 'Dibatalkan' : 'Sedang Berjalan')}</Text>
                </Text>
              </View>
              <View style={[styles.historyItemScoreBadge, { backgroundColor: (item.color || '#718096') + '15', borderColor: item.color || '#718096' }]}>
                <Text style={[styles.historyItemScoreText, { color: item.color || '#718096' }]}>
                  {item.status === 'finished' ? item.score : (item.progress || 0)}%
                </Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}