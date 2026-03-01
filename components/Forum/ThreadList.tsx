import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';

export interface Thread {
  id: string;
  category: string;
  title: string;
  author: string;
  replies: number;
  timestamp: string;
  preview: string;
}

interface Props {
  threads: Thread[];
  onPressThread: (thread: Thread) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Anxiety: '#7EB8F7',
  Depression: '#B8A9E0',
  'Sleep Issues': '#82C9A0',
  'General Venting': '#F7C47E',
  Gratitude: '#F7A47E',
};

// Stable "like count" derived from thread ID
const getLikeCount = (id: string): number => {
  let n = 0;
  for (let i = 0; i < id.length; i++) n += id.charCodeAt(i);
  return (n % 40) + 3;
};

export default function ThreadList({ threads, onPressThread }: Props) {
  if (threads.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No posts in this category yet.</Text>
        <Text style={styles.emptyHint}>Be the first to share your experience.</Text>
      </View>
    );
  }

  return (
    <View style={styles.list}>
      {threads.map((thread) => (
        <TouchableOpacity
          key={thread.id}
          style={styles.card}
          onPress={() => onPressThread(thread)}
          activeOpacity={0.75}
        >
          <View style={styles.topRow}>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: (CATEGORY_COLORS[thread.category] ?? Colors.primary) + '30' },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: CATEGORY_COLORS[thread.category] ?? Colors.primary },
                ]}
              >
                {thread.category}
              </Text>
            </View>
            <Text style={styles.timestamp}>{thread.timestamp}</Text>
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {thread.title}
          </Text>
          <Text style={styles.preview} numberOfLines={2}>
            {thread.preview}
          </Text>
          <View style={styles.footer}>
            <Text style={styles.author}>🙈 {thread.author}</Text>
            <View style={styles.stats}>
              <Text style={styles.stat}>💬 {thread.replies}</Text>
              <Text style={styles.stat}>❤️ {getLikeCount(thread.id)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: 10 },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: 11,
    color: Colors.textLight,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 20,
  },
  preview: {
    fontSize: 13,
    color: Colors.textLight,
    lineHeight: 19,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  author: {
    fontSize: 12,
    color: Colors.textLight,
  },
  stats: {
    flexDirection: 'row',
    gap: 10,
  },
  stat: {
    fontSize: 12,
    color: Colors.textLight,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textLight,
  },
  emptyHint: {
    fontSize: 13,
    color: Colors.textLight,
    opacity: 0.7,
  },
});
