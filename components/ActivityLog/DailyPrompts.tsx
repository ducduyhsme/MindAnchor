import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { getDailyPrompt } from '../../constants/Prompts';

interface Props {
  response: string;
  onChangeResponse: (text: string) => void;
  onSave: () => void;
}

export default function DailyPrompts({ response, onChangeResponse, onSave }: Props) {
  const prompt = getDailyPrompt();

  return (
    <View style={styles.card}>
      <Text style={styles.promptLabel}>Today's Prompt</Text>
      <Text style={styles.prompt}>{prompt}</Text>
      <TextInput
        style={styles.input}
        value={response}
        onChangeText={onChangeResponse}
        placeholder="Write your thoughts here…"
        placeholderTextColor={Colors.textLight}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        maxLength={1000}
      />
      <TouchableOpacity style={styles.saveButton} onPress={onSave} activeOpacity={0.8}>
        <Text style={styles.saveButtonText}>Save Entry ✓</Text>
      </TouchableOpacity>
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
  promptLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  prompt: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 14,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: Colors.text,
    minHeight: 100,
    borderWidth: 1,
    borderColor: Colors.border,
    lineHeight: 20,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
