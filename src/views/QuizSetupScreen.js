import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';

export default function QuizSetupScreen({ controller }) {
  const poolCount = controller.getFilteredQuestionsCount ? controller.getFilteredQuestionsCount() : 50;
  const sessionQsCount = Math.min(50, poolCount);
  const currentDuration = controller.quizDifficulty === 'easy' ? 30 : controller.quizDifficulty === 'medium' ? 20 : 10;
  const estMinutes = Math.max(1, Math.round((sessionQsCount * currentDuration) / 60));

  const isQuizActive = controller.activeQuizQuestions && 
                       controller.activeQuizQuestions.length > 0 && 
                       controller.quizActiveIndex < controller.activeQuizQuestions.length &&
                       !controller.isQuizResultMode;

  return (
    <View style={styles.screenContainer}>
      {/* Notch Safe Header */}
      <View style={[styles.navHeader, { paddingTop: STATUSBAR_PADDING }]}>
        <TouchableOpacity style={styles.navBtn} onPress={() => controller.navigateTo('dashboard')}>
          <Ionicons name="arrow-back" size={20} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Kuis Interaktif</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.setupHeading}>Konfigurasi Kuis</Text>
        <Text style={styles.setupSubheading}>Atur parameter kuis kedokteran interaktif di bawah:</Text>
        
        {/* Setting 1: Difficulty Levels */}
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}><Ionicons name="flash" size={16} color="#FF9F43" /> Pilih Tingkat Kesulitan</Text>
          <View style={styles.settingOptionRow}>
            {[
              { key: 'easy', label: 'Mudah (30s)' },
              { key: 'medium', label: 'Sedang (20s)' },
              { key: 'hard', label: 'Sulit (10s)' }
            ].map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.settingOptionBtn, controller.quizDifficulty === opt.key && styles.settingOptionBtnActive]}
                onPress={() => controller.setQuizDifficulty(opt.key)}
              >
                <Text style={[styles.settingOptionText, controller.quizDifficulty === opt.key && styles.settingOptionTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Simulation overview metrics info */}
        <View style={styles.simulationMetricsCard}>
          <Text style={styles.metricsTitle}>Detil Kuis:</Text>
          <Text style={styles.metricsText}>&bull; Mode Kuis: <Text style={{ fontWeight: 'bold' }}>Campuran (Pilihan Ganda & Tebak Kata)</Text></Text>
          <Text style={styles.metricsText}>
            &bull; Jumlah Soal Sesi Ini: <Text style={{ fontWeight: 'bold' }}>{sessionQsCount} Soal (dari total {poolCount} soal level ini)</Text>
          </Text>
          <Text style={styles.metricsText}>
            &bull; Waktu Menjawab: <Text style={{ fontWeight: 'bold' }}>{controller.quizDifficulty === 'easy' ? 30 : controller.quizDifficulty === 'medium' ? 20 : 10} Detik per Soal</Text>
          </Text>
          <Text style={styles.metricsText}>
            &bull; Estimasi Total Durasi: <Text style={{ fontWeight: 'bold' }}>{estMinutes} Menit</Text>
          </Text>
          <Text style={styles.metricsText}>&bull; Standar Kelulusan Kompetensi: <Text style={{ fontWeight: 'bold', color: '#00A896' }}>Skor &ge; 80%</Text></Text>
          <Text style={styles.metricsText}>
            &bull; Algoritma Keacakan Soal: <Text style={{ fontWeight: 'bold', color: '#FF9F43' }}>Fisher-Yates Shuffle (Aktif)</Text>
          </Text>
        </View>
        <Text style={{ fontSize: 9.5, color: '#A0AEC0', fontStyle: 'italic', marginBottom: 16, marginTop: -4, paddingHorizontal: 4 }}>
          *Sistem secara dinamis menyaring tingkat kesulitan soal berdasarkan bobot istilah anatomis kedokteran (bukan durasi waktu), lalu mengacak urutannya di latar belakang di setiap sesi baru menggunakan Fisher-Yates Shuffle.
        </Text>

        {isQuizActive ? (
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity style={[styles.btnFilledTeal, { flex: 1, paddingVertical: 14 }]} onPress={controller.resumeQuizSimulator}>
              <Ionicons name="play-forward" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.btnFilledTealText}>Lanjutkan Kuis</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnFilledTeal, { flex: 1, backgroundColor: '#E63946', paddingVertical: 14 }]} onPress={() => controller.startQuizSimulator(true)}>
              <Ionicons name="refresh" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.btnFilledTealText}>Mulai Ulang</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.btnFilledTeal} onPress={controller.startQuizSimulator}>
            <Ionicons name="play" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.btnFilledTealText}>Mulai Kuis</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </View>
  );
}
