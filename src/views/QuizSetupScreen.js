import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';

export default function QuizSetupScreen({ controller }) {
  return (
    <View style={styles.screenContainer}>
      {/* Notch Safe Header */}
      <View style={[styles.navHeader, { paddingTop: STATUSBAR_PADDING }]}>
        <TouchableOpacity style={styles.navBtn} onPress={() => controller.navigateTo('dashboard')}>
          <Ionicons name="arrow-back" size={20} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Kuis Anatomi</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.setupHeading}>Konfigurasi Kuis Anatomi</Text>
        <Text style={styles.setupSubheading}>Atur parameter kuis kedokteran interaktif di bawah:</Text>

        {/* Setting 1: System Organ */}
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}><Ionicons name="grid" size={16} color="#00A896" /> Pilih Cakupan Bahasan</Text>
          <View style={styles.settingOptionRow}>
            {[
              { key: 'all', label: 'Campuran' },
              { key: 'circulatory', label: 'Peredaran' },
              { key: 'respiratory', label: 'Napas' },
              { key: 'digestive', label: 'Cerna' },
              { key: 'skeletal', label: 'Rangka' }
            ].map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.settingOptionBtn, controller.quizSettings.system === opt.key && styles.settingOptionBtnActive]}
                onPress={() => controller.setQuizSettings(prev => ({ ...prev, system: opt.key }))}
              >
                <Text style={[styles.settingOptionText, controller.quizSettings.system === opt.key && styles.settingOptionTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Setting 2: Difficulty Levels */}
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
          <Text style={styles.metricsText}>&bull; Mode Kuis: <Text style={{ fontWeight: 'bold' }}>Tanpa Akun (100% Offline)</Text></Text>
          <Text style={styles.metricsText}>
            &bull; Jumlah Pertanyaan: <Text style={{ fontWeight: 'bold' }}>50 Soal Terpilih</Text>
          </Text>
          <Text style={styles.metricsText}>
            &bull; Waktu Menjawab: <Text style={{ fontWeight: 'bold' }}>{controller.getTimerDuration()} Detik per Soal</Text>
          </Text>
          <Text style={styles.metricsText}>
            &bull; Estimasi Total Durasi: <Text style={{ fontWeight: 'bold' }}>{Math.round((50 * controller.getTimerDuration()) / 60)} Menit</Text>
          </Text>
          <Text style={styles.metricsText}>&bull; Standar Kelulusan Kompetensi: <Text style={{ fontWeight: 'bold', color: '#00A896' }}>Skor &ge; 80%</Text></Text>
        </View>

        <TouchableOpacity style={styles.btnFilledTeal} onPress={controller.startQuizSimulator}>
          <Ionicons name="play" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.btnFilledTealText}>Mulai Kuis Anatomi</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
