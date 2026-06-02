import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';

// IMPORT komponen tutorial agar bisa dirender langsung di dalam layar dashboard
import TutorialModal from './TutorialModal'; 

export default function DashboardScreen({ controller }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#F7FAFC' }}>
      <ScrollView style={styles.screenScroll} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header Medis Melengkung yang Diperbarui */}
        <View style={[styles.dashHeader, { paddingTop: STATUSBAR_PADDING + 20, paddingBottom: 44, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }]}>
          <View style={[styles.profileRow, { alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4 }]}>
            
            {/* Sisi Kiri: Informasi Pengguna */}
            <View style={{ flex: 1, marginRight: 16 }}>
              <Text style={[styles.helloText, { opacity: 0.85, letterSpacing: 0.8, fontSize: 11 }]}>
                AKADEMI KEDOKTERAN INDONESIA
              </Text>
              <Text style={[styles.nameText, { fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginTop: 2 }]}>
                {controller.currentUser?.name || "Calon Dokter Medis"}
              </Text>
            </View>
            
            {/* Sisi Kanan: Group Tombol Aksi Nyaman Dipandang */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              
              {/* Tombol Kepangkatan (Sertifikat/Prestasi) */}
              <TouchableOpacity 
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                }} 
                onPress={() => controller.triggerToast("Peringkat: Mahasiswa Teladan")}
              >
                <Ionicons name="school" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              {/* TOMBOL LOGOUT BARU: Elegan, Minimalis, & Berkelas Medis */}
              <TouchableOpacity 
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  backgroundColor: 'rgba(229, 62, 62, 0.2)', // Merah transparan tipis lembut
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1.2,
                  borderColor: 'rgba(245, 101, 101, 0.4)',
                }} 
                onPress={() => controller.handleLogout()}
              >
                <Ionicons name="log-out-outline" size={20} color="#FEB2B2" />
              </TouchableOpacity>

            </View>
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
            
            {/* Card 1: Materi Pembelajaran */}
            <TouchableOpacity style={[styles.menuCard, styles.tealBorder]} onPress={() => controller.navigateTo('organ-selection')}>
              <View style={[styles.menuIconCircle, { backgroundColor: 'rgba(0, 168, 150, 0.1)' }]}>
                <Ionicons name="book" size={20} color="#00A896" />
              </View>
              <Text style={styles.menuCardTitle}>Materi Pembelajaran</Text>
              <Text style={styles.menuCardDesc}>Pilih kategori materi &amp; pelajari kartu</Text>
            </TouchableOpacity>

            {/* Card 2: Kuis Interaktif */}
            <TouchableOpacity style={[styles.menuCard, styles.orangeBorder]} onPress={() => controller.navigateTo('quiz-setup')}>
              <View style={[styles.menuIconCircle, { backgroundColor: 'rgba(255, 159, 67, 0.1)' }]}>
                <Ionicons name="trophy" size={20} color="#FF9F43" />
              </View>
              <Text style={styles.menuCardTitle}>Kuis Interaktif</Text>
              <Text style={styles.menuCardDesc}>Evaluasi 50 Soal &amp; 3 tingkat kesulitan</Text>
            </TouchableOpacity>

            {/* Card 3: Riwayat Kuis */}
            <TouchableOpacity 
              style={[styles.menuCard, styles.blueBorder]} 
              onPress={() => {
                controller.setIsQuizResultMode(false);
                controller.navigateTo('scoreboard');
              }}
            >
              <View style={[styles.menuIconCircle, { backgroundColor: 'rgba(52, 152, 219, 0.1)' }]}>
                <MaterialCommunityIcons name="history" size={20} color="#3498DB" />
              </View>
              <Text style={styles.menuCardTitle}>Riwayat Kuis</Text>
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

        {/* Gamification Rank Widget */}
        <View style={styles.sectionContainer}>
          <View style={styles.cardBox}>
            <View style={styles.cardBoxHeader}>
              <Text style={styles.progressCardTitle}>
                <Ionicons name="medal" size={18} color="#F6AD55" style={{ marginRight: 6 }} /> 
                Kepangkatan Medis
              </Text>
              <View style={{ backgroundColor: '#FFF5F5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#FED7D7' }}>
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#E53E3E' }}>LEVEL 4</Text>
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingBottom: 6 }}>
              <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#FFFAF0', borderWidth: 2, borderColor: '#F6AD55', justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
                <Ionicons name="star" size={32} color="#F6AD55" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 4 }}>Dokter Spesialis Anatomi</Text>
                <Text style={{ fontSize: 12, color: '#718096', lineHeight: 18 }}>Anda telah menyelesaikan 15 kuis tingkat Sulit dengan predikat kelulusan Cum Laude (A+).</Text>
              </View>
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
    </View>
  );
}