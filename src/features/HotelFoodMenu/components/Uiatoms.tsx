import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// ─── Color Palette ────────────────────────────────────────────────────────────
export const C = {
  primary: '#F5C518',
  primaryLight: '#FFFBEA',
  primaryMid: '#FDEEA0',
  primaryDark: '#B8860B',
  green: '#16A34A',
  greenBg: '#DCFCE7',
  greenText: '#15803D',
  red: '#DC2626',
  redBg: '#FEE2E2',
  redText: '#B91C1C',
  navy: '#0F172A',
  ink: '#1E293B',
  slate: '#475569',
  muted: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  white: '#FFFFFF',
  bgLight: '#FAFAF7',
  overlay: 'rgba(15,23,42,0.6)',
  cardShadow: '#64748B',
};

// ─── Types ────────────────────────────────────────────────────────────────────
export interface MenuItem {
  name: string;
  desc: string;
  price: number;
  image: string;
  isVeg: boolean;
  category: string;
  tags?: string[];
  offer: string;
  prepTime?: string;
}

export interface HotelData {
  name: string;
  image: string;
  logo: string;
  rating: number;
  reviews: number;
  distance: string;
  deliveryTime: string;
  location: string;
  cuisine: string;
  offer: string;
  tag: string;
  tagColor: string;
  isVeg: boolean;
  startingPrice: number;
  menuItems: MenuItem[];
}

// ─── Static Hotel Data ────────────────────────────────────────────────────────
export const HOTEL: HotelData = {
  name: 'Shree Vada Pav House',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&fit=crop',
  logo: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&q=80&fit=crop',
  rating: 4.7,
  reviews: 2340,
  distance: '1.2 km',
  deliveryTime: '20–30 min',
  location: 'Manek Chowk, Ahmedabad',
  cuisine: 'Street Food · Maharashtrian · Snacks',
  offer: '50% OFF up to ₹100',
  tag: 'BESTSELLER',
  tagColor: '#EF4444',
  isVeg: true,
  startingPrice: 20,
  menuItems: [
    {
      name: 'Vada Pav',
      desc: 'Crispy golden vada in soft pav with green & dry garlic chutney',
      price: 25,
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80&fit=crop',
      isVeg: true,
      category: 'Vada Pav',
      prepTime: '5 min',
      offer: '₹5 off',
      tags: ['Bestseller', 'Spicy'],
    },
    {
      name: 'Pav Bhaji',
      desc: 'Buttery spiced mixed vegetable bhaji with toasted buttered pav',
      price: 60,
      image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80&fit=crop',
      isVeg: true,
      category: 'Bhaji Pav',
      prepTime: '10 min',
      offer: '₹5 off',
      tags: ['Popular'],
    },
    {
      name: 'Masala Dosa',
      desc: 'Crispy rice crepe stuffed with spiced potato filling, served with sambar & coconut chutney',
      price: 90,
      image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80&fit=crop',
      isVeg: true,
      category: 'Dosa',
      prepTime: '12 min',
      offer: '₹5 off',
      tags: ['Must Try'],
    },
    {
      name: 'Samosa (2 pcs)',
      desc: 'Crunchy fried pastry filled with spiced potato & peas, served with mint chutney',
      price: 30,
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80&fit=crop',
      isVeg: true,
      category: 'Snacks',
      offer: '₹5 off',
      prepTime: '7 min',
      tags: ['Crispy'],
    },
    {
      name: 'Plain Dosa',
      desc: 'Thin crispy fermented rice crepe served with coconut chutney & sambar',
      price: 70,
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&q=80&fit=crop',
      isVeg: true,
      offer: '₹5 off',
      category: 'Dosa',
      prepTime: '10 min',
      tags: [],
    },
    {
      name: 'Kanda Bhaji',
      desc: 'Crispy golden onion fritters fried to perfection, served with spicy chutney',
      price: 45,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&q=80&fit=crop',
      isVeg: true,
      offer: '₹5 off',
      category: 'Snacks',
      prepTime: '8 min',
      tags: ['Monsoon Special'],
    },
    {
      name: 'Misal Pav',
      desc: 'Spicy sprouted moth bean curry topped with crunchy farsan, served with soft pav',
      price: 80,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80&fit=crop',
      isVeg: true,
      offer: '₹5 off',
      category: 'Bhaji Pav',
      prepTime: '15 min',
      tags: ['Spicy', 'Popular'],
    },
    {
      name: 'Upma',
      desc: 'Savory semolina porridge tempered with mustard seeds, curry leaves & fresh vegetables',
      price: 50,
      image: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&q=80&fit=crop',
      isVeg: true,
      offer: '₹5 off',
      category: 'Breakfast',
      prepTime: '10 min',
      tags: ['Light'],
    },
    {
      name: 'Masala Chai',
      desc: 'Strong ginger-cardamom milk tea brewed the authentic tapri way',
      price: 15,
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80&fit=crop',
      isVeg: true,
      offer: '₹2 off',
      category: 'Drinks',
      prepTime: '3 min',
      tags: [],
    },
    {
      name: 'Sweet Lassi',
      desc: 'Thick chilled sweet yogurt lassi topped with fresh malai cream',
      price: 40,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80&fit=crop',
      isVeg: true,
      offer: '₹5 off',
      category: 'Drinks',
      prepTime: '5 min',
      tags: ['Chilled'],
    },
  ],
};

// ─── Helper ───────────────────────────────────────────────────────────────────
export const groupByCategory = (items: MenuItem[]) => {
  const map: { [cat: string]: MenuItem[] } = {};
  items.forEach(item => {
    if (!map[item.category]) map[item.category] = [];
    map[item.category].push(item);
  });
  return map;
};

// ─── VegLabel ─────────────────────────────────────────────────────────────────
export const VegLabel = ({ isVeg }: { isVeg: boolean }) => (
  <View
    style={{
      backgroundColor: isVeg ? C.greenBg : C.redBg,
      borderRadius: 5,
      paddingHorizontal: 7,
      paddingVertical: 3,
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    }}
  >
    <View
      style={{
        width: 7,
        height: 7,
        borderRadius: 3.5,
        backgroundColor: isVeg ? C.greenText : C.redText,
      }}
    />
    <Text
      style={{
        fontSize: 9,
        fontWeight: '800',
        color: isVeg ? C.greenText : C.redText,
        letterSpacing: 0.5,
      }}
    >
      {isVeg ? 'VEG' : 'NON VEG'}
    </Text>
  </View>
);

// ─── Stars (real Ionicons) ────────────────────────────────────────────────────
export const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <View style={{ flexDirection: 'row', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Ionicons
          key={i}
          name={
            i <= full
              ? 'star'
              : hasHalf && i === full + 1
              ? 'star-half'
              : 'star-outline'
          }
          size={12}
          color={i <= full || (hasHalf && i === full + 1) ? C.primary : C.border}
        />
      ))}
    </View>
  );
};

// ─── TagPill ──────────────────────────────────────────────────────────────────
export const TagPill = ({ label, color }: { label: string; color?: string }) => (
  <View
    style={{
      backgroundColor: color ? color + '18' : C.primaryLight,
      borderRadius: 5,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginRight: 4,
      borderWidth: 0.5,
      borderColor: color ? color + '40' : C.primaryMid,
    }}
  >
    <Text style={{ fontSize: 9, fontWeight: '700', color: color ?? C.primaryDark }}>
      {label}
    </Text>
  </View>
);

// ─── InfoChip (real vector icons) ────────────────────────────────────────────
type IconLib = 'Ionicons' | 'MaterialIcons' | 'MaterialCommunityIcons';

export const InfoChip = ({
  iconName,
  iconLib = 'Ionicons',
  label,
  accent,
}: {
  iconName: string;
  iconLib?: IconLib;
  label: string;
  accent?: boolean;
}) => {
  const color = accent ? C.primaryDark : C.slate;

  const Icon = () => {
    if (iconLib === 'MaterialIcons')
      return <MaterialIcons name={iconName} size={13} color={color} />;
    if (iconLib === 'MaterialCommunityIcons')
      return <MaterialCommunityIcons name={iconName} size={13} color={color} />;
    return <Ionicons name={iconName} size={13} color={color} />;
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: accent ? C.primaryLight : C.borderLight,
        borderRadius: 8,
        paddingHorizontal: 9,
        paddingVertical: 6,
        gap: 5,
      }}
    >
      <Icon />
      <Text style={{ fontSize: 11, fontWeight: '700', color }}>{label}</Text>
    </View>
  );
};

// ─── Shared Styles ────────────────────────────────────────────────────────────
export const sharedStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  offerBadge: {
    position: 'absolute',
    top: '5%',
    left: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.primary,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
    gap: 4,
  },
  offerText: { fontSize: 9, fontWeight: '900', color: C.ink },
});