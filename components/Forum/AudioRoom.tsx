import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

interface Participant {
  id: string;
  name: string;
  isSpeaking: boolean;
}

interface Props {
  roomName: string;
  topic: string;
  participants: Participant[];
}

export default function AudioRoom({ roomName, topic, participants }: Props) {
  const [joined, setJoined] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.roomName}>{roomName}</Text>
          <Text style={styles.topic}>{topic}</Text>
        </View>
        <TouchableOpacity
          style={[styles.joinButton, joined && styles.joinButtonActive]}
          onPress={() => setJoined(!joined)}
          activeOpacity={0.8}
        >
          <Text style={styles.joinButtonText}>{joined ? '🔇 Leave' : '🎙️ Join'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.participants}>
        {participants.map((p) => (
          <View key={p.id} style={[styles.participant, p.isSpeaking && styles.participantSpeaking]}>
            <Text style={styles.participantName}>{p.name.charAt(0)}</Text>
            {p.isSpeaking && <View style={styles.speakingDot} />}
          </View>
        ))}
        {joined && (
          <View style={[styles.participant, styles.participantSelf]}>
            <Text style={styles.participantName}>Me</Text>
          </View>
        )}
      </View>
      <Text style={styles.count}>{participants.length + (joined ? 1 : 0)} in room</Text>
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
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  roomName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  topic: {
    fontSize: 12,
    color: Colors.textLight,
    maxWidth: 200,
  },
  joinButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  joinButtonActive: {
    backgroundColor: Colors.danger,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  participants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participant: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '30',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  participantSpeaking: {
    backgroundColor: Colors.secondary + '40',
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  participantSelf: {
    backgroundColor: Colors.accent + '30',
    borderWidth: 2,
    borderColor: Colors.accent,
  },
  participantName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  speakingDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.card,
  },
  count: {
    fontSize: 11,
    color: Colors.textLight,
    textAlign: 'right',
  },
});
