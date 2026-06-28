import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles, { STATUSBAR_PADDING } from '../styles/styles';

export default function ProfileScreen({ controller }) {
  const nameRef = useRef(controller.currentUser?.name || '');
  const usernameRef = useRef(controller.currentUser?.username || '');
  const passwordRef = useRef(controller.currentUser?.password || '');
  const [isSaving, setIsSaving] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await controller.handleUpdateProfile(nameRef.current, usernameRef.current, passwordRef.current);
    setIsSaving(false);
    if (success) {
      controller.navigateTo('dashboard');
    }
  };

  const currentInitials = nameRef.current ? nameRef.current.charAt(0).toUpperCase() : 'U';

  return (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={[styles.navHeader, { paddingTop: STATUSBAR_PADDING + 10, paddingBottom: 15, borderBottomWidth: 0, backgroundColor: '#2C3E50', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }]}>
        <TouchableOpacity style={[styles.navBtn, { backgroundColor: 'rgba(255,255,255,0.15)' }]} onPress={() => controller.navigateTo('dashboard')}>
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={[styles.navTitle, { color: '#FFFFFF' }]}>Profil Pengguna</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView 
        style={styles.screenScroll} 
        contentContainerStyle={{ padding: 20, paddingBottom: 60 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        
        {/* Avatar Section */}
        <View style={{ alignItems: 'center', marginVertical: 24 }}>
          <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#00A896', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: 'rgba(0, 168, 150, 0.2)' }}>
            <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#FFFFFF' }}>
              {currentInitials}
            </Text>
            <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FF9F43', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFFFFF' }}>
               <Ionicons name="pencil" size={14} color="#FFFFFF" />
            </View>
          </View>
          <Text style={{ marginTop: 16, fontSize: 20, fontWeight: 'bold', color: '#2C3E50' }}>Edit Profil</Text>
        </View>

        {/* Form Section */}
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 }}>
          
          <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8, marginLeft: 4 }}>Nama Lengkap</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 14, marginBottom: 20, height: 50 }}>
            <Ionicons name="person-outline" size={18} color="#718096" style={{ marginRight: 10 }} />
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#2D3748' }}
              defaultValue={controller.currentUser?.name || ''}
              onChangeText={(text) => nameRef.current = text}
              placeholder="Masukkan nama lengkap"
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8, marginLeft: 4 }}>Username</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 14, marginBottom: 20, height: 50 }}>
            <Ionicons name="at-circle-outline" size={18} color="#718096" style={{ marginRight: 10 }} />
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#2D3748' }}
              defaultValue={controller.currentUser?.username || ''}
              onChangeText={(text) => usernameRef.current = text}
              placeholder="Masukkan username"
              placeholderTextColor="#A0AEC0"
              autoCapitalize="none"
            />
          </View>

          <Text style={{ fontSize: 13, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8, marginLeft: 4 }}>Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 14, marginBottom: 30, height: 50 }}>
            <Ionicons name="lock-closed-outline" size={18} color="#718096" style={{ marginRight: 10 }} />
            <TextInput
              style={{ flex: 1, fontSize: 14, color: '#2D3748' }}
              defaultValue={controller.currentUser?.password || ''}
              onChangeText={(text) => passwordRef.current = text}
              placeholder="Masukkan kata sandi baru"
              placeholderTextColor="#A0AEC0"
              secureTextEntry={securePassword}
            />
            <TouchableOpacity onPress={() => setSecurePassword(!securePassword)} style={{ padding: 4 }}>
              <Ionicons name={securePassword ? "eye-off-outline" : "eye-outline"} size={20} color="#718096" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={{ backgroundColor: '#00A896', borderRadius: 14, height: 54, justifyContent: 'center', alignItems: 'center', shadowColor: '#00A896', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
            onPress={handleSave}
            disabled={isSaving}
          >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#FFFFFF' }}>
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}
