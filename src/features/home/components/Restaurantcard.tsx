import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import VegBadge from './Vegbadge';
import FoodItemCard from './Fooditemcard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const C = {
  primary: '#F5C518',
  primaryDark: '#C49A00',
  ink: '#1A1033',
  slate: '#4A5568',
  muted: '#8C96A3',
  border: '#EDF0F4',
  bgLight: '#F7F8FA',
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  red: '#EF4444',
};

export interface MenuItemType {
  name: string;
  price: number;
  image: string;
  desc: string;
}

export interface RestaurantCardData {
  id: number;
  restaurant: string;
  rating: number;
  reviews: number;
  distance: string;
  deliveryTime: string;
  isVeg: boolean;
  category: number;
  priceRange: string;
  restaurantImage: string;
  tag: string;
  tagColor: string;
  featured: boolean;
  startingPrice: number;
  offer: string;
  menuItems: MenuItemType[];
}

interface Props {
  card: RestaurantCardData;
  onPress: () => void;
  isWishlisted: boolean;
  onWishlistToggle: () => void;
}

export default function RestaurantCard({
  card,
  onPress,
  isWishlisted,
  onWishlistToggle,
}: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const handleScroll = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 24));
    if (idx >= 0 && idx < card.menuItems.length) setActiveIdx(idx);
  };

  const currentItem = card.menuItems[activeIdx];

  return (
    <TouchableOpacity style={S.foodCard} activeOpacity={0.96} onPress={onPress}>
      {/* ── IMAGE SLIDER ── */}
      <View style={S.cardImgArea}>
        <FlatList
          ref={flatRef}
          data={card.menuItems}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.image }}
              style={S.cardSlideImg}
              resizeMode="cover"
            />
          )}
        />

        {/* Food name + Offer stacked top-left */}
        <View style={S.foodNameBadge} pointerEvents="none">
          <Text style={S.foodNameText} numberOfLines={1}>
            {currentItem.name}
          </Text>
          <View style={S.offerBadge}>
            <Ionicons
              name="pricetag"
              size={9}
              color={C.ink}
              style={{ marginRight: 3 }}
            />
            <Text style={S.offerText}>{card.offer}</Text>
          </View>

          <View style={S.vegSection}>
            <View style={S.topMetaRow}>
              <VegBadge isVeg={card.isVeg} />
            </View>
          </View>
        </View>

        {/* Wishlist button */}
        <TouchableOpacity
          style={[S.wishlistBtn, isWishlisted && S.wishlistBtnActive]}
          onPress={e => {
            e.stopPropagation();
            onWishlistToggle();
          }}
          activeOpacity={0.85}
        >
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={18}
            color={isWishlisted ? C.red : C.white}
          />
        </TouchableOpacity>

        {/* Dot indicators */}
        <View style={S.dotRow}>
          {card.menuItems.map((_, i) => (
            <View
              key={i}
              style={[
                S.dot,
                {
                  width: i === activeIdx ? 20 : 5,
                  backgroundColor:
                    i === activeIdx ? C.primary : 'rgba(255,255,255,0.5)',
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* ── CARD BODY ── */}
      <View style={S.cardBody}>
        {/* Delivery time & Veg badge */}
        <View>
          {/* Restaurant row: thumbnail left, info right */}
          <View style={S.restaurantRow}>
            <Image
              source={{ uri: card.restaurantImage }}
              style={S.restaurantThumb}
            />

            <View style={S.restaurantInfo}>
              {/* Restaurant name */}
              <Text style={S.restaurantName} numberOfLines={1}>
                {card.restaurant}
              </Text>

              {/* Rating & Distance */}
              <View style={S.metaRow}>
                <FontAwesome name="star" size={11} color="#F5C518" />
                <Text style={S.metaValue}>{card.rating}</Text>
                <Text style={S.metaMuted}>({card.reviews})</Text>
                <View style={S.metaDot} />
                <MaterialIcons name="location-pin" size={13} color={C.muted} />
                <Text style={S.metaValue}>{card.distance}</Text>
              </View>

              {/* Price */}
              <View style={S.priceRow}>
                <View style={S.deliveryPill}>
                  <Ionicons
                    name="bicycle-outline"
                    size={13}
                    color={C.slate}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={S.deliveryPillText}>{card.deliveryTime}</Text>
                </View>
                <View style={S.priceInfo}>
                  <Ionicons name="cash-outline" size={12} color={C.muted} />
                  <Text style={S.priceLabel}>Item price</Text>
                  <Text style={S.priceValue}>
                    £{currentItem.price.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Mini menu scroll */}
        <Text style={S.menuScrollLabel}>Menu Items</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingRight: 4, paddingBottom: 4 }}
          style={{ marginBottom: 4 }}
        >
          {card.menuItems.map((item, idx) => (
            <FoodItemCard
              key={idx}
              item={item}
              isActive={activeIdx === idx}
              onPress={() => {
                setActiveIdx(idx);
                flatRef.current?.scrollToIndex({ index: idx, animated: true });
              }}
            />
          ))}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}

const S = StyleSheet.create({
  // ── Card shell ──────────────────────────────────────────
  foodCard: {
    backgroundColor: C.cardBg,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.09,
    shadowRadius: 16,
  },

  // ── Image area ──────────────────────────────────────────
  cardImgArea: { height: 210, position: 'relative' },
  cardSlideImg: { width: SCREEN_WIDTH - 28, height: 210 },

  foodNameBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 14,
    paddingTop: 13,
    paddingBottom: 10,
  },
  foodNameText: {
    fontSize: 17,
    fontWeight: '900',
    color: C.white,
    letterSpacing: -0.4,
    textShadowColor: 'rgba(0,0,0,0.65)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    marginBottom: 6,
  },
  offerBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.primary,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  offerText: { fontSize: 9, fontWeight: '900', color: C.ink },

  wishlistBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.38)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  wishlistBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderColor: '#FCA5A5',
  },

  dotRow: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  dot: { height: 5, borderRadius: 3 },

  // ── Card body ───────────────────────────────────────────
  cardBody: { padding: 14, paddingBottom: 16 },

  vegSection: { position: 'absolute', right: '2%', top: '370%' },

  topMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },

  deliveryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bgLight,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: C.border,
  },
  deliveryPillText: { color: C.slate, fontSize: 11, fontWeight: '700' },

  // ── Restaurant row ──────────────────────────────────────

  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 14,
  },
  restaurantThumb: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: C.border,
    marginTop: 2,
  },
  restaurantInfo: {
    flex: 1,
    gap: 5,
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: '900',
    color: C.ink,
    letterSpacing: -0.2,
  },

  // Rating & distance inline
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '700',
    color: C.slate,
  },
  metaMuted: {
    fontSize: 12,
    fontWeight: '500',
    color: C.muted,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: C.muted,
    marginHorizontal: 2,
  },

  // Price row
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    justifyContent: 'space-between',
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: C.muted,
  },
  priceValue: {
    fontSize: 15,
    fontWeight: '900',
    color: C.primaryDark,
  },

  // ── Menu scroll ─────────────────────────────────────────
  menuScrollLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: C.muted,
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
});
