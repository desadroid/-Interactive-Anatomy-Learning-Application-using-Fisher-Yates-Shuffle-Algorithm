import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';

export default function OrganSelectionScreen({ controller }) {
  const majorSystems = [
    { key: 'circulatory', name: 'Sistem Peredaran Darah', total: 15, sub: '15 Istilah • Jantung', icon: 'heart', color: '#E53E3E', bg: '#FFF5F5', border: '#FED7D7' },
    { key: 'respiratory', name: 'Sistem Pernapasan', total: 13, sub: '13 Istilah • Paru', icon: 'leaf', color: '#3182CE', bg: '#EBF8FF', border: '#BEE3F8' },
    { key: 'digestive', name: 'Sistem Pencernaan', total: 26, sub: '26 Istilah • Lambung', icon: 'restaurant', color: '#805AD5', bg: '#FAF5FF', border: '#E9D8FD' },
    { key: 'skeletal', name: 'Sistem Rangka', total: 30, sub: '30 Istilah • Tulang', icon: 'body', color: '#ED8936', bg: '#FFFAF0', border: '#FEEBC8' },
    { key: 'muscular', name: 'Sistem Otot', total: 14, sub: '14 Istilah • Tendon', icon: 'flash', color: '#38A169', bg: '#F0FFF4', border: '#C6F6D5' },
    { key: 'excretory', name: 'Sistem Ekskresi', total: 8, sub: '8 Istilah • Ginjal', icon: 'water', color: '#D69E2E', bg: '#FFFFF0', border: '#FEFCBF' }
  ];

  return (
    <View style={styles.screenContainer}>
      {/* Notch Safe Header */}
      <View style={[styles.navHeader, { paddingTop: STATUSBAR_PADDING }]}>
        <TouchableOpacity style={styles.navBtn} onPress={() => controller.navigateTo('dashboard')}>
          <Ionicons name="arrow-back" size={20} color="#2C3E50" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Atlas Anatomi Kedokteran</Text>
        <TouchableOpacity style={styles.navBtn} onPress={() => controller.triggerToast("Pencarian Atlas diaktifkan.")}>
          <Ionicons name="search" size={18} color="#2C3E50" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.organGridScroll}>
        <Text style={styles.organGridHeading}>Pilih Sistem Organ untuk Dipelajari</Text>
        <View style={styles.organGrid}>
          {majorSystems.map((sys) => {
            const completed = controller.flashcardProgress[sys.key] || 0;
            const pct = Math.round((completed / sys.total) * 100);
            
            return (
              <TouchableOpacity
                key={sys.key}
                style={[styles.organCard, {
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E2E8F0',
                  borderWidth: 1.5,
                  borderTopWidth: 4,
                  borderTopColor: sys.color
                }]}
                onPress={() => controller.openOrganDashboard(sys.key)}
              >
                <View style={[styles.organIconCircle, { backgroundColor: sys.bg }]}>
                  <Ionicons name={sys.icon} size={22} color={sys.color} />
                </View>
                <Text style={[styles.organCardLabel, { color: '#2C3E50' }]}>{sys.name}</Text>
                
                {/* Progress Bar inside each organ card */}
                <View style={styles.organCardProgressContainer}>
                  <View style={styles.organCardProgressBarBg}>
                    <View style={[styles.organCardProgressBarFill, { width: `${pct}%`, backgroundColor: sys.color }]} />
                  </View>
                  <Text style={styles.organCardProgressText}>{completed}/{sys.total} Istilah ({pct}%)</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
