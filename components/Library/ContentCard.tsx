import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { ReadingMaterial } from '../../constants/RelaxationContent';

interface Props {
  material: ReadingMaterial;
}

export default function ContentCard({ material }: Props) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.75}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{material.icon}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{material.category}</Text>
          </View>
          <Text style={styles.readTime}>{material.readTime}</Text>
        </View>
        <Text style={styles.title}>{material.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {material.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    alignItems: 'flex-start',
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
    backgroundColor: Colors.accent + '25',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: { fontSize: 22 },
  content: { flex: 1, gap: 4 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: Colors.accent + '30',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accent,
  },
  readTime: {
    fontSize: 11,
    color: Colors.textLight,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    color: Colors.textLight,
    lineHeight: 17,
  },
});
