import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

export default function PresenterModal({ controller }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={controller.presenterVisible}
      onRequestClose={() => controller.setPresenterVisible(false)}
    >
      <View style={styles.presenterModalOverlay}>
        <View style={styles.presenterCard}>
          <View style={styles.presenterHeader}>
            <Text style={styles.presenterTitle}>Presenter Quick Teleport</Text>
            <TouchableOpacity onPress={() => controller.setPresenterVisible(false)}>
              <Ionicons name="close" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.presenterDesc}>
            Gunakan switcher instan ini untuk melompat layar selama pengujian presentasi:
          </Text>

          <ScrollView contentContainerStyle={{ gap: 8 }}>
            {[
              { key: 'dashboard', name: '1. Dashboard Utama', sub: 'ECG widget, Menu Grid, Chart' },
              { key: 'organ-selection', name: '2. Pilihan Atlas Anatomi', sub: 'Pilihan 6 sistem organ mayor' },
              { key: 'overview', name: '3. Dashboard Organ (Pencernaan)', sub: 'Visual, Kamus PDF & Flashcards' },
              { key: 'quiz-setup', name: '4. Setup Kuis Anatomi', sub: 'Pilih sistem organ & 3 kesulitan' },
              { key: 'scoreboard', name: '5. Evaluasi Papan Skor', sub: 'Circular progress & riwayat kuis' }
            ].map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={[styles.presenterBtn, controller.activeScreen === opt.key && styles.presenterBtnActive]}
                onPress={() => {
                  controller.setPresenterVisible(false);
                  controller.navigateTo(opt.key);
                }}
              >
                <View>
                  <Text style={styles.presenterBtnName}>{opt.name}</Text>
                  <Text style={styles.presenterBtnSub}>{opt.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#00A896" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
