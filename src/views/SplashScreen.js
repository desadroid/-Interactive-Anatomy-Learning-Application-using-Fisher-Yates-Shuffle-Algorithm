import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ActivityIndicator, 
  Animated, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen({ controller }) {
  const [loadingText, setLoadingText] = useState('Memuat basis data anatomi...');
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation for logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false
    }).start();

    // Dynamic loading texts
    const textTimer1 = setTimeout(() => {
      setLoadingText('Menyiapkan visualisasi 3D...');
    }, 800);

    const textTimer2 = setTimeout(() => {
      setLoadingText('Menginisialisasi modul kuis...');
    }, 1600);

    // Auto transition to login screen
    const mainTimer = setTimeout(() => {
      controller.navigateTo('login-screen');
    }, 2600);

    return () => {
      clearTimeout(textTimer1);
      clearTimeout(textTimer2);
      clearTimeout(mainTimer);
    };
  }, []);

  // Interpolate progress width
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#1A202C', justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1A202C" />

      {/* Decorative background glow */}
      <View style={{
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#00A89608',
        top: '25%'
      }} />

      {/* Glowing medical logo */}
      <Animated.View style={{ 
        alignItems: 'center', 
        opacity: fadeAnim,
        transform: [{
          scale: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.9, 1]
          })
        }]
      }}>
        {/* Glowing circular border */}
        <View style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: '#00A89615',
          borderWidth: 2,
          borderColor: '#00A89630',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
          shadowColor: '#00A896',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 15,
          elevation: 5
        }}>
          <Ionicons name="medical" size={50} color="#00A896" />
        </View>

        <Text style={{ 
          fontSize: 28, 
          fontWeight: 'bold', 
          color: '#FFFFFF', 
          letterSpacing: 1.5,
          textAlign: 'center'
        }}>
          ANATOMEDIA
        </Text>
        <Text style={{ 
          fontSize: 12, 
          color: '#A0AEC0', 
          letterSpacing: 4, 
          marginTop: 6,
          textTransform: 'uppercase',
          fontWeight: '600'
        }}>
          Interactive Learning
        </Text>
      </Animated.View>

      {/* Loading area at the bottom */}
      <View style={{ 
        position: 'absolute', 
        bottom: 80, 
        width: '80%', 
        alignItems: 'center' 
      }}>
        {/* Loading text */}
        <Text style={{ 
          fontSize: 13, 
          color: '#E2E8F0', 
          marginBottom: 16, 
          fontWeight: '500',
          letterSpacing: 0.5
        }}>
          {loadingText}
        </Text>

        {/* Custom Progress Bar */}
        <View style={{ 
          width: '100%', 
          height: 6, 
          backgroundColor: '#2D3748', 
          borderRadius: 3, 
          overflow: 'hidden',
          marginBottom: 8
        }}>
          <Animated.View style={{ 
            height: '100%', 
            width: progressWidth, 
            backgroundColor: '#00A896',
            borderRadius: 3
          }} />
        </View>

        <Text style={{ fontSize: 10, color: '#718096', letterSpacing: 0.5 }}>
          v1.0.0
        </Text>
      </View>
    </View>
  );
}
