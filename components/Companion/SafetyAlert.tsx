import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal } from 'react-native';
import Colors from '../../constants/Colors';
import { CRISIS_RESOURCES } from '../../constants/CrisisKeywords';

interface Props {
  visible: boolean;
  onDismiss: () => void;
}

export default function SafetyAlert({ visible, onDismiss }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.icon}>💙</Text>
          <Text style={styles.title}>We're Here For You</Text>
          <Text style={styles.body}>
            It sounds like you might be going through a really difficult time. You are not alone,
            and help is available right now.
          </Text>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors.danger }]}
            onPress={() => Linking.openURL(`tel:${CRISIS_RESOURCES.hotline}`)}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>📞 Call {CRISIS_RESOURCES.hotline}</Text>
            <Text style={styles.actionButtonSub}>{CRISIS_RESOURCES.hotlineName}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: Colors.accent }]}
            onPress={() => Linking.openURL(`sms:741741`)}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>💬 {CRISIS_RESOURCES.text}</Text>
            <Text style={styles.actionButtonSub}>{CRISIS_RESOURCES.textName}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dismissButton} onPress={onDismiss} activeOpacity={0.7}>
            <Text style={styles.dismissText}>I'm safe, continue talking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
  icon: { fontSize: 48, marginBottom: 8 },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  actionButton: {
    width: '100%',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  actionButtonSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginTop: 2,
  },
  dismissButton: {
    marginTop: 6,
    paddingVertical: 10,
  },
  dismissText: {
    color: Colors.textLight,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
});
