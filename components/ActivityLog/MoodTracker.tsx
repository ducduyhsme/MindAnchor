import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { MoodLevel } from '../../hooks/useMoodTracker';

const MOODS: { emoji: string; label: string }[] = [
  { emoji: '😢', label: 'Rough' },
  { emoji: '😟', label: 'Low' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😊', label: 'Great' },
];

interface Props {
  selectedMood: MoodLevel | null;
  onSelectMood: (mood: MoodLevel) => void;
}

export default function MoodTracker({ selectedMood, onSelectMood }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>How are you feeling?</Text>
      <View style={styles.moodRow}>
        {MOODS.map((m, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.moodButton,
              selectedMood === i && {
                backgroundColor: Colors.moodColors[i] + '30',
                borderColor: Colors.moodColors[i],
              },
            ]}
            onPress={() => onSelectMood(i as MoodLevel)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{m.emoji}</Text>
            <Text
              style={[
                styles.label,
                selectedMood === i && { color: Colors.moodColors[i], fontWeight: '700' },
              ]}
            >
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    marginHorizontal: 2,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 10,
    color: Colors.textLight,
    fontWeight: '500',
  },
});
