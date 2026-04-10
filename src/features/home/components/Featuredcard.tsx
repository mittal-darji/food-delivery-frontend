import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import { RestaurantCardData } from './RestaurantCard';

const C = {
  primary: '#F5C518',
  primaryDark: '#C49A00',
  ink: '#1A1033',
  slate: '#4A5568',
  muted: '#8C96A3',
  white: '#FFFFFF',
};

interface Props {
  card: RestaurantCardData;
  onPress: () => void;
}

export default function FeaturedCard({ card, onPress }: Props) {
  return (
    <TouchableOpacity style={S.featCard} activeOpacity={0.88} onPress={onPress}>
      <Image
        source={{ uri: card.menuItems[0].image }}
        style={S.featImg}
        resizeMode="cover"
      />
      <View style={S.featOverlay} />
      <View style={[S.featTag, { backgroundColor: card.tagColor }]}>
        <Text style={S.featTagText}>{card.tag}</Text>
      </View>
      <View style={S.featOffer}>
        <Text style={S.featOfferText}>{card.offer}</Text>
      </View>
      <View style={S.featBody}>
        <Text style={S.featRestaurant}>{card.restaurant}</Text>
        <Text style={S.featFood}>{card.menuItems[0].name}</Text>
        <View style={S.featMeta}>
          <Text style={S.featRating}>⭐ {card.rating}</Text>
          <Text style={S.featPrice}>from £{card.startingPrice.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const S = StyleSheet.create({
  featCard: {
    width: 200,
    backgroundColor: C.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  featImg: { width: '100%', height: 130 },
  featOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  featTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  featTagText: { color: C.white, fontSize: 9, fontWeight: '800' },
  featOffer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: C.primary,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  featOfferText: { fontSize: 9, fontWeight: '900', color: C.ink },
  featBody: { padding: 12 },
  featRestaurant: {
    fontSize: 9,
    color: C.muted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  featFood: {
    fontSize: 13,
    fontWeight: '900',
    color: C.ink,
    marginTop: 2,
    marginBottom: 2,
  },
  featMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  featRating: { fontSize: 11, fontWeight: '700', color: C.slate },
  featPrice: { fontSize: 12, fontWeight: '900', color: C.primaryDark },
});
