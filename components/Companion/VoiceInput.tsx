import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
  isListening: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
}

export default function VoiceInput({ isListening, onPressIn, onPressOut }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.micButton, isListening && styles.micButtonActive]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={0.8}
      >
        <Text style={styles.micIcon}>🎙️</Text>
      </TouchableOpacity>
      <Text style={styles.hint}>
        {isListening ? '🔴 Listening…' : 'Hold to speak'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 6,
  },
  micButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  micButtonActive: {
    backgroundColor: Colors.danger + '20',
    borderColor: Colors.danger,
    shadowColor: Colors.danger,
    transform: [{ scale: 1.1 }],
  },
  micIcon: {
    fontSize: 26,
  },
  hint: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '500',
  },
});
