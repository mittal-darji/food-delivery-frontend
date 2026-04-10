import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RestaurantCard, {
  RestaurantCardData,
} from '../components/Restaurantcard';

const C = {
  muted: '#8C96A3',
};

interface Props {
  filtered: RestaurantCardData[];
  wishlist: Set<number>;
  onCardPress: (card: RestaurantCardData) => void;
  onWishlistToggle: (id: number) => void;
}

export default function RestaurantListScreen({
  filtered,
  wishlist,
  onCardPress,
  onWishlistToggle,
}: Props) {
  if (filtered.length === 0) {
    return (
      <View style={S.empty}>
        <Text style={{ fontSize: 48, marginBottom: 12 }}>🍽️</Text>
        <Text style={S.emptyTitle}>No results found</Text>
        <Text style={S.emptySub}>Try a different filter or search.</Text>
      </View>
    );
  }

  return (
    <View>
      {filtered.map(card => (
        <RestaurantCard
          key={card.id}
          card={card}
          onPress={() => onCardPress(card)}
          isWishlisted={wishlist.has(card.id)}
          onWishlistToggle={() => onWishlistToggle(card.id)}
        />
      ))}
    </View>
  );
}

const S = StyleSheet.create({
  empty: { alignItems: 'center', paddingVertical: 48 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: C.muted,
    marginBottom: 4,
  },
  emptySub: { fontSize: 12, color: '#CBD5E1', fontWeight: '500' },
});
