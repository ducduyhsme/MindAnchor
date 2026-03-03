import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import Colors from '../../constants/Colors';
import VoiceInput from '../../components/Companion/VoiceInput';
import ChatBubble, { ChatMessage } from '../../components/Companion/ChatBubble';
import SafetyAlert from '../../components/Companion/SafetyAlert';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { useSafetyProtocol } from '../../hooks/useSafetyProtocol';
import { sendMessageToGemini, GeminiMessage } from '../../services/geminiService';

const INITIAL_MESSAGE = "Hi, I'm Anchor 🌿 — your mental wellness companion. I'm here to listen without judgment. How are you feeling today?";

export default function CompanionScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      text: INITIAL_MESSAGE,
      timestamp: new Date(),
    },
  ]);
  const [textInput, setTextInput] = useState('');
  const [isSpeakingAI, setIsSpeakingAI] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const chatHistoryRef = useRef<GeminiMessage[]>([]);

  const { isListening, startListening, stopListening } = useVoiceInput();
  const { safetyState, checkText, dismiss } = useSafetyProtocol();

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;
      const trimmed = text.trim();
      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        text: trimmed,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setTextInput('');
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

      if (checkText(trimmed)) return;

      setIsLoading(true);
      try {
        const aiText = await sendMessageToGemini(chatHistoryRef.current, trimmed);
        chatHistoryRef.current = [
          ...chatHistoryRef.current,
          { role: 'user', parts: [{ text: trimmed }] },
          { role: 'model', parts: [{ text: aiText }] },
        ];
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: aiText,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        Speech.speak(aiText, {
          language: 'en',
          rate: 0.9,
          onStart: () => setIsSpeakingAI(true),
          onDone: () => setIsSpeakingAI(false),
          onError: () => setIsSpeakingAI(false),
        });
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
      } catch (error) {
        console.error('[Gemini] Failed to get AI response:', error);
        const errorMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: "I'm having trouble connecting right now. Please check your internet connection and try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [checkText, isLoading]
  );

  const handleVoicePressIn = useCallback(() => startListening(), [startListening]);
  const handleVoicePressOut = useCallback(() => stopListening((transcript) => { if (transcript) sendMessage(transcript); }), [stopListening, sendMessage]);
  const handleStopSpeech = useCallback(() => { Speech.stop(); setIsSpeakingAI(false); }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <SafetyAlert visible={safetyState.triggered} onDismiss={dismiss} />
      <View style={styles.header}>
        <Text style={styles.title}>AI Companion 🌿</Text>
        <Text style={styles.subtitle}>Anchor — your wellness guide</Text>
        {isSpeakingAI && (
          <TouchableOpacity style={styles.stopSpeechBtn} onPress={handleStopSpeech}>
            <Text style={styles.stopSpeechText}>🔇 Stop speaking</Text>
          </TouchableOpacity>
        )}
      </View>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={80}>
        <ScrollView ref={scrollRef} style={styles.messages} contentContainerStyle={styles.messagesContent} showsVerticalScrollIndicator={false} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
          {messages.map((msg) => <ChatBubble key={msg.id} message={msg} />)}
          {isLoading && (
            <View style={styles.loadingRow}>
              <Text style={styles.loadingAvatar}>🌿</Text>
              <View style={styles.loadingBubble}>
                <ActivityIndicator size="small" color={Colors.primary} />
              </View>
            </View>
          )}
          <View style={{ height: 16 }} />
        </ScrollView>
        <View style={styles.inputArea}>
          <VoiceInput isListening={isListening} onPressIn={handleVoicePressIn} onPressOut={handleVoicePressOut} />
          <View style={styles.textRow}>
            <TextInput style={styles.textInput} value={textInput} onChangeText={setTextInput} placeholder="Or type a message…" placeholderTextColor={Colors.textLight} multiline maxLength={500} returnKeyType="send" onSubmitEditing={() => sendMessage(textInput)} editable={!isLoading} />
            <TouchableOpacity style={[styles.sendButton, (!textInput.trim() || isLoading) && styles.sendButtonDisabled]} onPress={() => sendMessage(textInput)} disabled={!textInput.trim() || isLoading} activeOpacity={0.8}>
              <Text style={styles.sendIcon}>➤</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: Colors.border, backgroundColor: Colors.background },
  title: { fontSize: 20, fontWeight: '700', color: Colors.text },
  subtitle: { fontSize: 12, color: Colors.textLight, marginTop: 1 },
  stopSpeechBtn: { marginTop: 6, alignSelf: 'flex-start', backgroundColor: Colors.accent + '30', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  stopSpeechText: { fontSize: 12, color: Colors.accent, fontWeight: '600' },
  messages: { flex: 1 },
  messagesContent: { padding: 16 },
  inputArea: { padding: 16, gap: 12, backgroundColor: Colors.background, borderTopWidth: 1, borderTopColor: Colors.border },
  textRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  textInput: { flex: 1, backgroundColor: Colors.card, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: Colors.text, maxHeight: 90, borderWidth: 1, borderColor: Colors.border, lineHeight: 20 },
  sendButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.primary, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
  sendButtonDisabled: { backgroundColor: Colors.border, shadowOpacity: 0, elevation: 0 },
  sendIcon: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  loadingRow: { flexDirection: 'row', marginVertical: 4, alignItems: 'flex-end', gap: 6 },
  loadingAvatar: { fontSize: 20, marginBottom: 4 },
  loadingBubble: { backgroundColor: Colors.card, borderRadius: 18, borderBottomLeftRadius: 4, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
});
