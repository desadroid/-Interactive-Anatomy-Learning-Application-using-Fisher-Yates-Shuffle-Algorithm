import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

export default function TutorialModal({ controller }) {
  const [step, setStep] = useState(0);

  const stepsData = [
    {
      title: "Selamat Datang di AnatoMedia 🩺",
      desc: "Platform pembelajaran anatomi interaktif luring (100% offline). Belajar dan uji kompetensi kedokteran Anda tanpa perlu pendaftaran akun sama sekali.",
      icon: "pulse",
      color: "#00A896"
    },
    {
      title: "Atlas Anatomi & Kamus PDF 📖",
      desc: "Jelajahi 6 sistem organ mayor dengan peta atlas interaktif. Pelajari 100 istilah Latin medis resmi kurikulum IDI lengkap dengan pengucapan audio Google Speech.",
      icon: "book",
      color: "#FF9F43"
    },
    {
      title: "Kuis Anatomi 3 Level 🏆",
      desc: "Uji pemahaman Anda melalui kuis 50 soal pilihan ganda. Pilih 3 tingkat kesulitan (Mudah, Sedang, Sulit) dengan countdown timer dinamis per pertanyaan.",
      icon: "trophy",
      color: "#3498DB"
    }
  ];

  const currentStepData = stepsData[step];

  const handleNext = () => {
    if (step < stepsData.length - 1) {
      setStep(prev => prev + 1);
    } else {
      controller.setFirstTimeUser(false);
      controller.triggerToast("Selamat Belajar, Calon Dokter!");
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={controller.firstTimeUser}
      onRequestClose={() => {}}
    >
      <View style={styles.tutorialOverlay}>
        <View style={styles.tutorialCard}>
          
          {/* Top Step indicators */}
          <View style={styles.tutorialStepIndicator}>
            {stepsData.map((_, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.tutorialDot, 
                  step === idx && styles.tutorialDotActive
                ]} 
              />
            ))}
          </View>

          {/* Animated Icon Circle */}
          <View style={[styles.tutorialIconCircle, { backgroundColor: currentStepData.color + '12' }]}>
            <Ionicons name={currentStepData.icon} size={36} color={currentStepData.color} />
          </View>

          {/* Text descriptions */}
          <Text style={styles.tutorialTitle}>{currentStepData.title}</Text>
          <Text style={styles.tutorialDesc}>{currentStepData.desc}</Text>

          {/* Bottom Action buttons */}
          <View style={styles.tutorialBtnRow}>
            {step > 0 && (
              <TouchableOpacity 
                style={[styles.btnOutlinedSecondary, { flex: 1, height: 44 }]} 
                onPress={() => setStep(prev => prev - 1)}
              >
                <Text style={styles.btnOutlinedSecondaryText}>Kembali</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.btnFilledTeal, { flex: 2, height: 44 }]} 
              onPress={handleNext}
            >
              <Text style={styles.btnFilledTealText}>
                {step === stepsData.length - 1 ? "Mulai Belajar 🩺" : "Lanjut"}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
}
