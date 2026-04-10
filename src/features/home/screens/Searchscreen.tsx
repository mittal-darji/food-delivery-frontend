import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const C = {
  primary: '#F5C518',
  ink: '#1A1033',
  muted: '#8C96A3',
  border: '#EDF0F4',
  bgLight: '#FEFDDF',
  white: '#FFFFFF',
};

const FOOD_CARDS = [
  {
    id: 1,
    restaurant: 'Cheese & Chips Co.',
    rating: 4.8,
    distance: '1.2 km',
    deliveryTime: '18–25 min',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=90',
    menuItems: [
      { name: 'Classic Smash Burger' },
      { name: 'Double Cheese Burger' },
    ],
  },
  {
    id: 2,
    restaurant: 'Bella Napoli',
    rating: 4.9,
    distance: '2.1 km',
    deliveryTime: '25–35 min',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=90',
    menuItems: [
      { name: 'Margherita Stonebake' },
      { name: 'Truffle Mushroom Pizza' },
    ],
  },
  {
    id: 3,
    restaurant: 'Tokyo Ramen House',
    rating: 4.7,
    distance: '1.8 km',
    deliveryTime: '28–38 min',
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=90',
    menuItems: [{ name: 'Tonkotsu Ramen' }, { name: 'Spicy Miso Ramen' }],
  },
  {
    id: 4,
    restaurant: 'Green Leaf Kitchen',
    rating: 4.6,
    distance: '0.8 km',
    deliveryTime: '15–20 min',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=90',
    menuItems: [{ name: 'Buddha Bowl' }, { name: 'Avocado Quinoa Bowl' }],
  },
  {
    id: 5,
    restaurant: 'Sweet Tooth',
    rating: 4.8,
    distance: '0.5 km',
    deliveryTime: '12–18 min',
    image:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=90',
    menuItems: [{ name: 'Nutella Waffle Stack' }, { name: 'Tiramisu Cup' }],
  },
];

interface Props {
  onBack: () => void;
}

export default function SearchScreen({ onBack }: Props) {
  const [query, setQuery] = useState('');

  const results =
    query.length > 1
      ? FOOD_CARDS.filter(
          c =>
            c.restaurant.toLowerCase().includes(query.toLowerCase()) ||
            c.menuItems.some(m =>
              m.name.toLowerCase().includes(query.toLowerCase()),
            ),
        )
      : [];

  return (
    <SafeAreaView style={S.safe}>
      <View style={S.header}>
        <TouchableOpacity onPress={onBack} style={S.backBtn}>
          <Text style={{ fontSize: 18, color: C.ink }}>←</Text>
        </TouchableOpacity>
        <View style={S.searchBox}>
          <Ionicons name="search" size={18} color={C.muted} />
          <TextInput
            autoFocus
            value={query}
            onChangeText={setQuery}
            placeholder="Search dishes or restaurants..."
            placeholderTextColor={C.muted}
            style={S.input}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={{ color: C.muted, fontSize: 13 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 14 }}>
        {query.length === 0 && (
          <Text style={S.hint}>
            Start typing to search dishes or restaurants…
          </Text>
        )}
        {results.map(card => (
          <View key={card.id} style={S.resultCard}>
            <Image
              source={{ uri: card.image }}
              style={S.resultImg}
              resizeMode="cover"
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={S.resultName}>{card.restaurant}</Text>
              <Text style={S.resultMeta}>
                ⭐ {card.rating} · {card.distance} · {card.deliveryTime}
              </Text>
            </View>
          </View>
        ))}
        {query.length > 1 && results.length === 0 && (
          <Text style={S.hint}>No results for "{query}"</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    backgroundColor: C.bgLight,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bgLight,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: C.border,
    gap: 8,
  },
  input: { flex: 1, fontSize: 14, color: C.ink, fontWeight: '500' },
  hint: {
    fontSize: 13,
    color: C.muted,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 40,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: C.border,
  },
  resultImg: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: C.border,
  },
  resultName: {
    fontSize: 14,
    fontWeight: '800',
    color: C.ink,
    marginBottom: 4,
  },
  resultMeta: { fontSize: 11, color: C.muted, fontWeight: '500' },
});
