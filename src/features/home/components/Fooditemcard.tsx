import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

const C = {
  primary: '#F5C518',
  primaryLight: '#FEFDDF',
  primaryMid: '#FDEEA0',
  primaryDark: '#C49A00',
  ink: '#1A1033',
  muted: '#8C96A3',
  border: '#EDF0F4',
  bgLight: '#FEFDDF',
  white: '#FFFFFF',
};

export interface MenuItem {
  name: string;
  price: number;
  image: string;
  desc: string;
}

interface Props {
  item: MenuItem;
  isActive: boolean;
  onPress: () => void;
}

export default function FoodItemCard({ item, isActive, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[S.menuItemCard, isActive && S.menuItemCardActive]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.image }} style={S.menuItemImg} resizeMode="cover" />
      {isActive && <View style={S.menuItemActiveOverlay} />}
      <View style={S.menuItemBody}>
        <Text
          style={[S.menuItemName, isActive && { color: C.primaryDark }]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text style={S.menuItemDesc} numberOfLines={1}>
          {item.desc}
        </Text>
        <Text style={S.menuItemPrice}>£{item.price.toFixed(2)}</Text>
      </View>
      {isActive && (
        <View style={S.menuItemCheckDot}>
          <Text style={{ color: C.ink, fontSize: 8, fontWeight: '900' }}>
            ✓
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const S = StyleSheet.create({
  menuItemCard: {
    width: 130,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.border,
  },
  menuItemCardActive: { borderColor: C.primary },
  menuItemImg: { width: '100%', height: 80 },
  menuItemActiveOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  menuItemBody: { padding: 8 },
  menuItemName: { fontSize: 10, fontWeight: '800', color: C.ink, marginBottom: 2 },
  menuItemDesc: { fontSize: 9, color: C.muted, fontWeight: '500', marginBottom: 4 },
  menuItemPrice: { fontSize: 11, fontWeight: '900', color: C.primaryDark },
  menuItemCheckDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    backgroundColor: C.primary,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: C.white,
  },
});
