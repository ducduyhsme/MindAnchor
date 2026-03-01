import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { AudioTrack } from '../../constants/RelaxationContent';

interface Props {
  track: AudioTrack;
}

export default function AudioPlayer({ track }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{track.icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {track.description}
        </Text>
        <Text style={styles.duration}>⏱ {track.duration}</Text>
      </View>
      <TouchableOpacity
        style={[styles.playButton, isPlaying && styles.playButtonActive]}
        onPress={() => setIsPlaying(!isPlaying)}
        activeOpacity={0.8}
      >
        <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: { fontSize: 22 },
  info: { flex: 1 },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: Colors.textLight,
    lineHeight: 17,
    marginBottom: 4,
  },
  duration: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '500',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  playButtonActive: {
    backgroundColor: Colors.secondary,
    shadowColor: Colors.secondary,
  },
  playIcon: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
