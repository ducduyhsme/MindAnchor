import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Thread } from './ThreadList';

interface Props {
  thread: Thread;
}

export default function PostCard({ thread }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{thread.title}</Text>
      <Text style={styles.preview}>{thread.preview}</Text>
      <Text style={styles.author}>🙈 {thread.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  preview: {
    fontSize: 13,
    color: Colors.textLight,
    lineHeight: 19,
  },
  author: {
    fontSize: 12,
    color: Colors.textLight,
  },
});
