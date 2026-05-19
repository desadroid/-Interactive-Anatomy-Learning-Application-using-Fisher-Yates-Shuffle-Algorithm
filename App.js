import React from 'react';
import { SafeAreaView, View, StatusBar, TouchableOpacity, Text } from 'react-native';
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
import PresenterModal from './src/views/PresenterModal';
import TutorialModal from './src/views/TutorialModal';

export default function App() {
  const controller = useAnatoMedia();

  const renderScreen = () => {
    switch (controller.activeScreen) {
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
        return <DashboardScreen controller={controller} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />
      
      {/* Centered Tablet Responsive Simulator Viewport */}
      <View style={styles.viewport}>
        {renderScreen()}
      </View>

      {/* Floating dynamic status toast message */}
      {controller.toastVisible && (
        <View style={styles.toastContainer}>
          <Ionicons name="alert-circle" size={18} color="#FF9F43" style={{ marginRight: 8 }} />
          <Text style={styles.toastMessageText}>{controller.toastMessage}</Text>
        </View>
      )}

      {/* Slide up Overlays */}
      <AboutModal controller={controller} />
      <PresenterModal controller={controller} />
      <TutorialModal controller={controller} />

      {/* FLOATING PRESENTER CONTROLLER TRIGGER */}
      <TouchableOpacity style={styles.floatingPresenterBtn} onPress={() => controller.setPresenterVisible(true)}>
        <Ionicons name="options" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
        <Text style={styles.floatingPresenterText}>Teleportasi</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
