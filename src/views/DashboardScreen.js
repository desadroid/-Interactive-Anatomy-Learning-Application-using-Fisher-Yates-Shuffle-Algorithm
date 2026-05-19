import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';

export default function DashboardScreen({ controller }) {
  return (
    <ScrollView style={styles.screenScroll} contentContainerStyle={{ paddingBottom: 100 }}>
      
      {/* Curved Deep Blue Medical Header */}
      <View style={[styles.dashHeader, { paddingTop: STATUSBAR_PADDING + 16, paddingBottom: 40 }]}>
        <View style={styles.profileRow}>
          <View>
            <Text style={styles.helloText}>AKADEMI KEDOKTERAN INDONESIA</Text>
            <Text style={styles.nameText}>Calon Dokter Anatomi</Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer} onPress={() => controller.triggerToast("Peringkat: Mahasiswa Teladan Anatomi")}>
            <View style={styles.avatarMock}>
              <Ionicons name="school" size={24} color="#00A896" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Global Terminology Quick Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#718096" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Cari cepat 100 istilah medis gaster, femur..."
            placeholderTextColor="#718096"
            style={styles.searchInput}
            onFocus={() => {
              controller.openOrganDashboard('digestive');
              controller.setStudyTab('kamus');
              controller.triggerToast("Ketik untuk mencari istilah medis!");
            }}
          />
        </View>
      </View>

          {/* Dynamic 4-Card Main Menu Grid */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Menu Belajar &amp; Kuis</Text>
        <View style={styles.menuGrid}>
          
          {/* Card 1: Atlas selection */}
          <TouchableOpacity style={[styles.menuCard, styles.tealBorder]} onPress={() => controller.navigateTo('organ-selection')}>
            <View style={[styles.menuIconCircle, { backgroundColor: 'rgba(0, 168, 150, 0.1)' }]}>
              <Ionicons name="book" size={20} color="#00A896" />
            </View>
            <Text style={styles.menuCardTitle}>Atlas Anatomi</Text>
            <Text style={styles.menuCardDesc}>Pilih 6 sistem organ &amp; kartu flash</Text>
          </TouchableOpacity>

          {/* Card 2: 50 Questions customized simulator */}
          <TouchableOpacity style={[styles.menuCard, styles.orangeBorder]} onPress={() => controller.navigateTo('quiz-setup')}>
            <View style={[styles.menuIconCircle, { backgroundColor: 'rgba(255, 159, 67, 0.1)' }]}>
              <Ionicons name="trophy" size={20} color="#FF9F43" />
            </View>
            <Text style={styles.menuCardTitle}>Kuis Anatomi</Text>
            <Text style={styles.menuCardDesc}>Kuis 50 Soal &amp; 3 tingkat kesulitan</Text>
          </TouchableOpacity>

          {/* Card 3: Local Quiz history modal */}
          <TouchableOpacity style={[styles.menuCard, styles.blueBorder]} onPress={() => controller.navigateTo('scoreboard')}>
            <View style={[styles.menuIconCircle, { backgroundColor: 'rgba(52, 152, 219, 0.1)' }]}>
              <MaterialCommunityIcons name="history" size={20} color="#3498DB" />
            </View>
            <Text style={styles.menuCardTitle}>Papan Skor</Text>
            <Text style={styles.menuCardDesc}>Hasil evaluasi kuis terakhir Anda</Text>
          </TouchableOpacity>

          {/* Card 4: About system metadata */}
          <TouchableOpacity style={[styles.menuCard, styles.purpleBorder]} onPress={() => controller.setAboutModalVisible(true)}>
            <View style={[styles.menuIconCircle, { backgroundColor: 'rgba(155, 93, 229, 0.1)' }]}>
              <Ionicons name="information-circle" size={20} color="#9B5DE5" />
            </View>
            <Text style={styles.menuCardTitle}>Tentang Aplikasi</Text>
            <Text style={styles.menuCardDesc}>Kurikulum Kedokteran IDI 2026</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* Overall Local Stats */}
      <View style={styles.sectionContainer}>
        <View style={styles.cardBox}>
          <View style={styles.cardBoxHeader}>
            <Text style={styles.progressCardTitle}><Ionicons name="pulse" size={16} color="#00A896" /> Total Pemahaman Istilah</Text>
            <Text style={styles.progressCardBadge}>Database PDF</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '45%' }]} />
          </View>
          <View style={styles.progressStats}>
            <Text style={styles.progressStatsText}>Kamus: <Text style={{ color: '#2C3E50', fontWeight: 'bold' }}>45 / 100 Istilah Medis</Text></Text>
            <Text style={styles.progressStatsText}>Level Paham: <Text style={{ color: '#00A896', fontWeight: 'bold' }}>45%</Text></Text>
          </View>
        </View>
      </View>

      {/* Study chart */}
      <View style={styles.sectionContainer}>
        <View style={styles.cardBox}>
          <View style={styles.cardBoxHeader}>
            <Text style={styles.progressCardTitle}><Ionicons name="bar-chart" size={16} color="#00A896" /> Menit Belajar Minggu Ini</Text>
            <Text style={styles.progressCardBadge}>Total: 370m</Text>
          </View>
          <View style={styles.chartBarsRow}>
            {[
              { day: 'Sen', height: 45, act: false },
              { day: 'Sel', height: 60, act: false },
              { day: 'Rab', height: 30, act: false },
              { day: 'Kam', height: 75, act: true },
              { day: 'Jum', height: 50, act: false },
              { day: 'Sab', height: 20, act: false },
              { day: 'Min', height: 90, act: true }
            ].map((item, idx) => (
              <View key={idx} style={styles.chartBarCol}>
                <View style={[styles.chartBarFill, {
                  height: item.height,
                  backgroundColor: item.act ? '#00A896' : '#E2E8F0'
                }]} />
                <Text style={styles.chartBarDay}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

    </ScrollView>
  );
}
