import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const C = {
  green: '#10B981',
  greenLight: '#D1FAE5',
  red: '#EF4444',
  redLight: '#FEE2E2',
};

interface Props {
  isVeg: boolean;
}

export default function VegBadge({ isVeg }: Props) {
  return (
    <View
      style={[
        S.vegBadge,
        {
          backgroundColor: isVeg ? C.greenLight : C.redLight,
          borderColor: isVeg ? '#6EE7B7' : '#FCA5A5',
        },
      ]}
    >
      <View style={[S.vegDot, { backgroundColor: isVeg ? C.green : C.red }]} />
      <Text style={[S.vegText, { color: isVeg ? '#065F46' : '#991B1B' }]}>
        {isVeg ? 'VEG' : 'NON-VEG'}
      </Text>
    </View>
  );
}

const S = StyleSheet.create({
  vegBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  vegDot: { width: 7, height: 7, borderRadius: 4 },
  vegText: { fontSize: 9, fontWeight: '800' },
});
