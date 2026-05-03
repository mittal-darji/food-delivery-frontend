import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { C } from './Uiatoms';

interface MenuFABProps {
  itemCount: number;
  bottom: number;
  onPress: () => void;
}

const MenuFAB = ({ itemCount, bottom, onPress }: MenuFABProps) => (
  <TouchableOpacity style={[styles.menuFab, { bottom }]} onPress={onPress} activeOpacity={0.85}>
    <Ionicons name="restaurant-outline" size={17} color={C.white} />
    <Text style={styles.fabLabel}>Menu</Text>
    <View style={styles.fabBadge}>
      <Text style={styles.fabBadgeText}>{itemCount}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuFab: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.navy,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 11,
    elevation: 12,
    shadowColor: C.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    gap: 7,
  },
  fabLabel: { fontSize: 12, fontWeight: '800', color: C.white },
  fabBadge: {
    backgroundColor: C.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  fabBadgeText: { fontSize: 10, fontWeight: '900', color: C.ink },
});

export default MenuFAB;