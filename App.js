import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// MVC Modular Imports
import styles from './src/styles/styles';
import useAnatoMedia from './src/controllers/useAnatoMedia';

// View Imports
import DashboardScreen from './src/views/DashboardScreen';
import OrganSelectionScreen from './src/views/OrganSelectionScreen';
import OverviewScreen from './src/views/OverviewScreen';
import QuizSetupScreen from './src/views/QuizSetupScreen';
import QuizScreen from './src/views/QuizScreen';
import ScoreboardScreen from './src/views/ScoreboardScreen';
import AboutModal from './src/views/AboutModal';
import TutorialModal from './src/views/TutorialModal';
import LoginScreen from './src/views/LoginScreen';
import ProfileScreen from './src/views/ProfileScreen';
import SplashScreen from './src/views/SplashScreen';


export default function App() {
  const controller = useAnatoMedia();

  // Animasi Transisi Halaman (Aman dari Bug Freeze Android)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (controller.activeScreen === 'splash') {
      fadeAnim.setValue(1);
      slideAnim.setValue(0);
      return;
    }

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
      case 'splash':
        return <SplashScreen controller={controller} />;
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
      case 'profile-screen':
        return <ProfileScreen controller={controller} />;
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
    </SafeAreaView>
  );
}
