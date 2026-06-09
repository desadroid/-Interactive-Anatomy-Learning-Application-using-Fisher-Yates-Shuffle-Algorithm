import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/styles';

export default function LoginScreen({ controller }) {
  const isLogin = controller.authMode === 'login';

  // Cek apakah pesan toast berisi tanda sukses/keluar/selamat
  const lowerMessage = controller.toastMessage?.toLowerCase() || '';
  const isSuccess =
    lowerMessage.includes('berhasil') ||
    lowerMessage.includes('selamat') ||
    lowerMessage.includes('welcome') ||
    lowerMessage.includes('sukses');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, backgroundColor: '#F7FAFC' }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Biru Gelap Melengkung */}
        <View style={[styles.dashHeader, { paddingTop: 60, paddingBottom: 40, borderBottomLeftRadius: 32, borderBottomRightRadius: 32, alignItems: 'center' }]}>
          <Ionicons name="medical" size={48} color="#00A896" style={{ marginBottom: 16 }} />
          <Text style={[styles.menuCardTitle, { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', textAlign: 'center' }]}>
            AnatoMedia Portal
          </Text>
          <Text style={{ color: '#E2E8F0', fontSize: 12, marginTop: 4, letterSpacing: 0.5, textAlign: 'center', textTransform: 'uppercase' }}>
            {isLogin ? 'Silakan Masuk Ke Simulator Anatomi Anda' : 'Daftar Akun Simulator Baru'}
          </Text>
        </View>

        {/* Form Kontainer */}
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 32 }}>
          <Text style={[styles.sectionTitle, { marginBottom: 4, fontSize: 18 }]}>
            {isLogin ? 'Autentikasi' : 'Pendaftaran Akun'}
          </Text>
          <Text style={{ color: '#718096', fontSize: 13, marginBottom: 24 }}>
            {isLogin ? 'Gunakan data dari users.json atau buat akun baru' : 'Lengkapi data di bawah untuk membuat profil medis baru'}
          </Text>

          {/* Input: Nama Lengkap (Hanya muncul saat Register) */}
          {!isLogin && (
            <View style={[styles.searchBar, { marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF', height: 54, paddingHorizontal: 16 }]}>
              <Ionicons name="person-outline" size={18} color="#718096" style={{ marginRight: 10 }} />
              <TextInput
                placeholder="Nama Lengkap Anda"
                placeholderTextColor="#A0AEC0"
                style={[styles.searchInput, { color: '#2D3748', fontSize: 15 }]}
                value={controller.formName}
                onChangeText={controller.setFormName}
              />
            </View>
          )}

          {/* Input: Username */}
          <View style={[styles.searchBar, { marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF', height: 54, paddingHorizontal: 16 }]}>
            <Ionicons name="at-outline" size={18} color="#718096" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#A0AEC0"
              autoCapitalize="none"
              style={[styles.searchInput, { color: '#2D3748', fontSize: 15 }]}
              value={controller.formUsername}
              onChangeText={controller.setFormUsername}
            />
          </View>

          {/* Input: Password */}
          <View style={[styles.searchBar, { marginBottom: 24, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF', height: 54, paddingHorizontal: 16 }]}>
            <Ionicons name="lock-closed-outline" size={18} color="#718096" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#A0AEC0"
              secureTextEntry
              autoCapitalize="none"
              style={[styles.searchInput, { color: '#2D3748', fontSize: 15 }]}
              value={controller.formPassword}
              onChangeText={controller.setFormPassword}
            />
          </View>

          {/* Tombol Aksi Utama */}
          <TouchableOpacity 
            style={{
              backgroundColor: '#00A896',
              height: 54,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              shadowColor: '#00A896',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 5,
              elevation: 3,
              marginBottom: 20
            }} 
            onPress={isLogin ? controller.handleLogin : controller.handleRegister}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginRight: 8 }}>
              {isLogin ? 'Masuk Aplikasi' : 'Daftar Sekarang'}
            </Text>
            <Ionicons name={isLogin ? "log-in-outline" : "person-add-outline"} size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Tombol Switch Mode (Login / Register) */}
          <TouchableOpacity 
            style={{ padding: 8, alignItems: 'center' }} 
            onPress={() => {
              controller.setAuthMode(isLogin ? 'register' : 'login');
              controller.setFormName('');
              controller.setFormUsername('');
              controller.setFormPassword('');
            }}
          >
            <Text style={{ color: '#718096', fontSize: 14 }}>
              {isLogin ? 'Belum terdaftar? ' : 'Sudah punya akun? '}
              <Text style={{ color: '#00A896', fontWeight: 'bold' }}>
                {isLogin ? 'Buat Akun' : 'Silakan Masuk'}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* POP-UP NOTIFIKASI TOAST DINAMIS YANG SUDAH DIPERBAIKI STRUKTURNYA */}
      {controller.toastVisible && (
        <View style={{
          position: 'absolute',
          bottom: 40,
          left: 20,
          right: 20,
          backgroundColor: isSuccess ? '#E6FFFA' : '#FFF5F5',
          borderRadius: 16,
          paddingVertical: 14,
          paddingHorizontal: 18,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1.5,
          borderColor: isSuccess ? '#B2F5EA' : '#FEB7D7',
          shadowColor: isSuccess ? '#00A896' : '#E53E3E',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 10,
          elevation: 8,
          zIndex: 99999,
        }}>
          {/* Lingkaran Ikon */}
          <View style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: isSuccess ? '#CCFBDE' : '#FED7D7',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 14
          }}>
            <Ionicons 
              name={isSuccess ? "checkmark-circle" : "alert-circle"} 
              size={22} 
              color={isSuccess ? "#00A896" : "#E53E3E"} 
            />
          </View>
          
          {/* Konten Teks */}
          <View style={{ flex: 1 }}>
            <Text style={{ 
              fontSize: 11, 
              fontWeight: 'bold', 
              color: isSuccess ? "#00A896" : "#E53E3E", 
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 2
            }}>
              {isSuccess ? 'Notifikasi Sistem' : 'Gagal Mengakses Portal'}
            </Text>
            <Text style={{ 
              fontSize: 14, 
              color: isSuccess ? "#1A202C" : "#9B2C2C", 
              fontWeight: '600',
              lineHeight: 18
            }}>
              {controller.toastMessage}
            </Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}