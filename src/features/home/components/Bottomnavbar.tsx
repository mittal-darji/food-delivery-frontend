import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const COLORS = {
  active: '#C49A00',
  inactive: '#8C96A3',
  dot: '#F5C518',
  border: '#EDF0F4',
  background: 'rgba(255,255,255,0.98)',
};

const NAV_ITEMS = [
  { label: 'Home', icon: 'home' },
  { label: 'Explore', icon: 'search' },
  { label: 'Orders', icon: 'receipt' },
  { label: 'Saved', icon: 'heart' },
  { label: 'Profile', icon: 'person' },
];

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <View style={bottomNavBarStyles.container}>
      {NAV_ITEMS.map(item => {
        const isActive = activeTab === item.label;
        const color = isActive ? COLORS.active : COLORS.inactive;
        const iconName = isActive ? item.icon : `${item.icon}-outline`;

        return (
          <TouchableOpacity
            key={item.label}
            style={bottomNavBarStyles.item}
            onPress={() => setActiveTab(item.label)}
            activeOpacity={0.7}
          >
            <Icon name={iconName} size={isActive ? 24 : 22} color={color} />
            <Text style={[bottomNavBarStyles.label, { color }]}>
              {item.label}
            </Text>
            {isActive && <View style={bottomNavBarStyles.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const bottomNavBarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 22,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
  },
  item: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.dot,
    borderRadius: 3,
  },
});
