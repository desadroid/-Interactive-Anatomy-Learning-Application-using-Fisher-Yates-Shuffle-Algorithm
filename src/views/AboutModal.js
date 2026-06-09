import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

export default function AboutModal({ controller }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={controller.aboutModalVisible}
      onRequestClose={() => controller.setAboutModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalSheetContainer}>
          <View style={styles.modalSheetBar} />
          <View style={styles.modalSheetHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="information-circle" size={22} color="#9B5DE5" style={{ marginRight: 8 }} />
              <Text style={styles.modalSheetTitle}>Tentang AnatoMedia</Text>
            </View>
            <TouchableOpacity onPress={() => controller.setAboutModalVisible(false)} style={styles.modalSheetCloseBtn}>
              <Ionicons name="close" size={20} color="#2C3E50" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ paddingVertical: 12 }}>
            <Text style={styles.aboutDesc}>
              AnatoMedia adalah aplikasi pembelajaran anatomi kedokteran interaktif 100% luring (offline) dengan profil mandiri. Aplikasi ini mengintegrasikan seluruh materi istilah medis resmi dari data PDF berdasarkan kurikulum IDI 2026.
            </Text>
            <View style={styles.aboutTagsRow}>
              <Text style={styles.aboutTag}>Profil Mandiri (Privasi Penuh)</Text>
              <Text style={styles.aboutTag}>100 Istilah Medis PDF</Text>
              <Text style={styles.aboutTag}>Kuis 50 Soal Kustom</Text>
            </View>
            <View style={styles.aboutCreditsCard}>
              <Text style={styles.aboutCreditsText}><Text style={{ fontWeight: 'bold' }}>Teknologi:</Text> React Native Expo (Android APK)</Text>
              <Text style={styles.aboutCreditsText}><Text style={{ fontWeight: 'bold' }}>Sumber Data:</Text> Dokumen Kurikulum Medis data.pdf</Text>
              <Text style={styles.aboutCreditsText}><Text style={{ fontWeight: 'bold' }}>Lisensi:</Text> Terbuka Medis &amp; Akademik Kedokteran</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
