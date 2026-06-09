import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// MVC Modular Imports
import styles from './src/styles/styles';
import useAnatoMedia from './src/controllers/useAnatoMedia';

// View Imports
import * as SplashScreen from 'expo-splash-screen';
import DashboardScreen from './src/views/DashboardScreen';
import OrganSelectionScreen from './src/views/OrganSelectionScreen';
import OverviewScreen from './src/views/OverviewScreen';
import QuizSetupScreen from './src/views/QuizSetupScreen';
import QuizScreen from './src/views/QuizScreen';
import ScoreboardScreen from './src/views/ScoreboardScreen';
import AboutModal from './src/views/AboutModal';
import PresenterModal from './src/views/PresenterModal';
import TutorialModal from './src/views/TutorialModal';
import LoginScreen from './src/views/LoginScreen';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const controller = useAnatoMedia();

  // Animasi Transisi Halaman (Aman dari Bug Freeze Android)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const prepare = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    };

    prepare();
  }, []);


  useEffect(() => {
    // Reset nilai setiap kali layar berubah
    fadeAnim.setValue(0);
    slideAnim.setValue(15);

    // Jalankan animasi secara paralel tanpa Native Driver untuk mencegah hilangnya sentuhan
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false, // <-- KUNCI PERBAIKAN: Harus false agar tidak freeze
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      })
    ]).start();
  }, [controller.activeScreen]);

  const renderScreen = () => {
    switch (controller.activeScreen) {
      case 'login-screen': 
          return <LoginScreen controller={controller} />;
      case 'dashboard':
        return <DashboardScreen controller={controller} />;
      case 'organ-selection':
        return <OrganSelectionScreen controller={controller} />;
      case 'overview':
        return <OverviewScreen controller={controller} />;
      case 'quiz-setup':
        return <QuizSetupScreen controller={controller} />;
      case 'quiz':
        return <QuizScreen controller={controller} />;
      case 'scoreboard':
        return <ScoreboardScreen controller={controller} />;
      default:
        return <LoginScreen controller={controller} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />
      
      {/* Centered Tablet Responsive Simulator Viewport */}
      <View style={styles.viewport}>
        <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {renderScreen()}
        </Animated.View>
      </View>

      {/* FLOATING PRESENTER CONTROLLER TRIGGER */}
      {controller.currentUser && (
        <TouchableOpacity style={[styles.floatingPresenterBtn, {zIndex: 999, elevation:99}]} onPress={() => controller.setPresenterVisible(true)}>
          <Ionicons name="options" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={styles.floatingPresenterText}>Teleportasi</Text>
        </TouchableOpacity>
      )}

      {/* Floating dynamic status toast message */}
      {controller.toastVisible && (
        <View style={styles.toastContainer}>
          <Ionicons name="alert-circle" size={18} color="#FF9F43" style={{ marginRight: 8 }} />
          <Text style={styles.toastMessageText}>{controller.toastMessage}</Text>
        </View>
      )}

      {controller.activeScreen === 'dashboard' && (
        <TutorialModal controller={controller} />
      )}

      {/* Slide up Overlays */}
      <AboutModal controller={controller} />
      <PresenterModal controller={controller} />
    </SafeAreaView>
  );
}
