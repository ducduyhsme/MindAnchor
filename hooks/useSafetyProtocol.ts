import { useState, useCallback } from 'react';
import { containsCrisisKeyword, CRISIS_RESOURCES } from '../constants/CrisisKeywords';

export interface SafetyState {
  triggered: boolean;
  message: string;
}

export function useSafetyProtocol() {
  const [safetyState, setSafetyState] = useState<SafetyState>({
    triggered: false,
    message: '',
  });

  const checkText = useCallback((text: string): boolean => {
    if (containsCrisisKeyword(text)) {
      setSafetyState({
        triggered: true,
        message: text,
      });
      return true;
    }
    return false;
  }, []);

  const dismiss = useCallback(() => {
    setSafetyState({ triggered: false, message: '' });
  }, []);

  return { safetyState, checkText, dismiss, resources: CRISIS_RESOURCES };
}
