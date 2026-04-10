import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';

const C = {
  primary: '#F5C518',
};

interface Props {
  id: number;
  label: string;
  image: string;
  isActive: boolean;
  onPress: () => void;
}

export default function CategoryCard({
  label,
  image,
  isActive,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={S.catBtn} onPress={onPress} activeOpacity={0.85}>
      <View
        style={[
          S.catImgWrap,
          isActive && { borderColor: C.primary, borderWidth: 1.5 },
        ]}
      >
        <Image source={{ uri: image }} style={S.catImg} resizeMode="cover" />
        {isActive && <View style={S.catActiveOverlay} />}
      </View>
      <Text
        style={[
          S.catLabel,
          { color: isActive ? C.primary : 'rgba(255,255,255,0.75)' },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const S = StyleSheet.create({
  catBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 7,
    minWidth: 60,
  },
  catImgWrap: {
    width: 60,
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  catImg: { width: '100%', height: '100%' },
  catActiveOverlay: { position: 'absolute', inset: 0 },
  catLabel: { fontSize: 10, fontWeight: '800', textAlign: 'center' },
});
