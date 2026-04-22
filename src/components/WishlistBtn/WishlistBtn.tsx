import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const C = {
  red: '#EF4444',
  white: '#FFFFFF',
};

interface Props {
  isWishlisted: boolean;
  onToggle: () => void; // keep this clean — no event param
  size?: 'sm' | 'md' | 'lg';
  variant?: 'overlay' | 'plain';
  style?: ViewStyle;
}

const SIZE_MAP = {
  sm: { btn: 30, icon: 14 },
  md: { btn: 36, icon: 18 },
  lg: { btn: 44, icon: 22 },
};

export default function WishlistBtn({
  isWishlisted,
  onToggle,
  size = 'md',
  variant = 'overlay',
  style,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isWishlisted) {
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.35,
          useNativeDriver: true,
          speed: 40,
          bounciness: 14,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 30,
          bounciness: 6,
        }),
      ]).start();
    }
  }, [isWishlisted]);

  const { btn, icon } = SIZE_MAP[size];

  return (
    <TouchableOpacity
      onPress={e => {
        e.stopPropagation(); // ← handle it here, inside the component
        onToggle();
      }}
      activeOpacity={0.8}
      style={[
        S.base,
        variant === 'overlay' ? S.overlay : S.plain,
        isWishlisted && variant === 'overlay' && S.overlayActive,
        { width: btn, height: btn, borderRadius: btn / 2 },
        style,
      ]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Ionicons
          name={isWishlisted ? 'heart' : 'heart-outline'}
          size={icon}
          color={isWishlisted ? C.red : variant === 'overlay' ? C.white : C.red}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const S = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.38)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  overlayActive: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderColor: '#FCA5A5',
  },
  plain: {
    backgroundColor: 'transparent',
  },
});
