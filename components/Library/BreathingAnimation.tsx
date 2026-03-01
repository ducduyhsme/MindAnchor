import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Colors from '../../constants/Colors';

const PHASES = [
  { label: 'Inhale', duration: 4000, scale: 1.3 },
  { label: 'Hold', duration: 4000, scale: 1.3 },
  { label: 'Exhale', duration: 4000, scale: 1.0 },
  { label: 'Rest', duration: 4000, scale: 1.0 },
];

export default function BreathingAnimation() {
  const [active, setActive] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [countdown, setCountdown] = useState(4);
  const scaleAnim = useRef(new Animated.Value(1.0)).current;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseRef = useRef(0);
  const countRef = useRef(4);

  useEffect(() => {
    if (!active) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      scaleAnim.setValue(1.0);
      setPhaseIdx(0);
      setCountdown(4);
      phaseRef.current = 0;
      countRef.current = 4;
      return;
    }

    const runPhase = (idx: number) => {
      const phase = PHASES[idx];
      setPhaseIdx(idx);
      countRef.current = 4;
      setCountdown(4);
      Animated.timing(scaleAnim, {
        toValue: phase.scale,
        duration: phase.duration,
        useNativeDriver: true,
      }).start();
    };

    runPhase(0);

    intervalRef.current = setInterval(() => {
      countRef.current -= 1;
      setCountdown(countRef.current);
      if (countRef.current <= 0) {
        phaseRef.current = (phaseRef.current + 1) % PHASES.length;
        runPhase(phaseRef.current);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const currentPhase = PHASES[phaseIdx];

  return (
    <View style={styles.container}>
      <View style={styles.circleWrapper}>
        <Animated.View
          style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.countdown}>{active ? countdown : '4'}</Text>
        </Animated.View>
        <Text style={styles.phaseLabel}>{active ? currentPhase.label : 'Ready'}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, active && styles.buttonStop]}
        onPress={() => setActive(!active)}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          {active ? '⏹ Stop Breathing Exercise' : '▶ Start Box Breathing'}
        </Text>
      </TouchableOpacity>

      {!active && (
        <View style={styles.phaseRow}>
          {PHASES.map((p, i) => (
            <View key={i} style={styles.phaseChip}>
              <Text style={styles.phaseChipText}>{p.label}</Text>
              <Text style={styles.phaseChipCount}>4s</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 20,
    paddingVertical: 16,
  },
  circleWrapper: {
    alignItems: 'center',
    gap: 12,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.primary + '25',
    borderWidth: 3,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  countdown: {
    fontSize: 42,
    fontWeight: '300',
    color: Colors.primary,
  },
  phaseLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 14,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonStop: {
    backgroundColor: Colors.danger,
    shadowColor: Colors.danger,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  phaseRow: {
    flexDirection: 'row',
    gap: 8,
  },
  phaseChip: {
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  phaseChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.text,
  },
  phaseChipCount: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
});
