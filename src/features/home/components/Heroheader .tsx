import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryCard from './Categorycard';
import heroImage from "../../../../assets/HomeScreen/home-header-bg.jpg";

const C = {
  primary: '#F5C518',
  primaryDark: '#C49A00',
  navy: '#1A1033',
  red: '#EF4444',
  white: '#FFFFFF',
};

const CATEGORIES = [
  {
    id: 0,
    label: 'All',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=90',
  },
  {
    id: 1,
    label: 'Pizza',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=90',
  },
  {
    id: 2,
    label: 'Burgers',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=90',
  },
  {
    id: 3,
    label: 'Sushi',
    image:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&q=90',
  },
  {
    id: 4,
    label: 'Mexican',
    image:
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&q=90',
  },
  {
    id: 5,
    label: 'Noodles',
    image:
      'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&q=90',
  },
  {
    id: 6,
    label: 'Salads',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=90',
  },
];

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  activeCat: number;
  onCatPress: (id: number) => void;
  onSeeAllCats: () => void;
  onMenuPress: () => void;
  cartCount: number;
}

export default function HeroHeader({
  search,
  onSearchChange,
  activeCat,
  onCatPress,
  onSeeAllCats,
  onMenuPress,
  cartCount,
}: Props) {
  const [showAllCats, setShowAllCats] = useState(false);
  const VISIBLE_CATS = showAllCats ? CATEGORIES : CATEGORIES.slice(0, 6);

  const handleSeeAll = () => {
    setShowAllCats(v => !v);
    onSeeAllCats();
  };

  return (
    <View style={S.headerBg}>
       
      <ImageBackground
        source={heroImage}
        blurRadius={1}
        resizeMode="cover"
      >
        {/* ── NAVBAR ── */}
        <View style={S.navbar}>
          <View style={S.navLeft}>
            <TouchableOpacity onPress={onMenuPress} style={S.hamburgerBtn}>
              <View style={S.hLine} />
              <View style={[S.hLine, { width: 18 }]} />
              <View style={[S.hLine, { width: 14 }]} />
            </TouchableOpacity>
            <View style={{ marginLeft: 10 }}>
              <View style={S.row}>
                <Ionicons name="location-sharp" size={12} color={C.primary} />
                <Text style={S.deliveringTo}>Delivering to</Text>
                <Text style={{ color: C.primary, fontSize: 10 }}>▾</Text>
              </View>
              <Text style={S.locationText}>Mayfair, London</Text>
            </View>
          </View>
          <View style={S.row}>
            <TouchableOpacity style={S.cartBtn}>
              <Text style={{ fontSize: 17 }}>🛒</Text>
              {cartCount > 0 && (
                <View style={S.cartBadge}>
                  <Text style={S.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
              }}
              style={S.avatarImg}
            />
          </View>
        </View>

        {/* ── GREETING ── */}
        <View style={S.headerContent}>
          <Text style={S.greeting}>Good afternoon, Oliver 👋</Text>
          <Text style={S.heroTitle}>
            Hungry? Discover{'\n'}
            <Text style={{ color: C.primary }}>2,400+ dishes</Text> near you.
          </Text>
          <View style={S.promoPill}>
            <Text style={S.promoText}>
              🎉{' '}
              <Text style={{ color: C.primary, fontWeight: '900' }}>
                WELCOME40
              </Text>{' '}
              — 40% off first order
            </Text>
          </View>
        </View>

        {/* ── SEARCH ── */}
        <View style={S.searchRow}>
          <View style={S.searchBox}>
            <Ionicons name="search" size={20} color="white" />
            <TextInput
              value={search}
              onChangeText={onSearchChange}
              placeholder="Search dishes or restaurants..."
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={S.searchInput}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => onSearchChange('')}>
                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                  ✕
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ── CATEGORIES ── */}
        <View style={{ paddingTop: 16, paddingBottom: 20 }}>
          <View
            style={[
              S.row,
              {
                paddingHorizontal: 14,
                marginBottom: 12,
                justifyContent: 'space-between',
              },
            ]}
          >
            <Text style={S.catSectionTitle}>Categories</Text>
            <TouchableOpacity onPress={handleSeeAll}>
              <Text style={S.seeAllCat}>
                {showAllCats ? 'See less ←' : 'See all →'}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 12,
              gap: 12,
              paddingBottom: 4,
            }}
          >
            {VISIBLE_CATS.map(cat => (
              <CategoryCard
                key={cat.id}
                {...cat}
                isActive={activeCat === cat.id}
                onPress={() => onCatPress(cat.id)}
              />
            ))}
            {!showAllCats && (
              <TouchableOpacity
                style={S.moreCatBtn}
                onPress={handleSeeAll}
                activeOpacity={0.85}
              >
                <View style={S.moreCatImgWrap}>
                  <Text style={{ fontSize: 22 }}>🍽️</Text>
                </View>
                <Text style={[S.catLabel, { color: C.primary }]}>More</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const S = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },

  // Background layers
  headerBg: { position: 'relative', overflow: 'hidden' },
  bgBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: C.navy,
  },
  bgGlowTopLeft: {
    position: 'absolute',
    top: -80,
    left: -50,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(245,197,24,0.13)',
  },
  bgGlowBottomRight: {
    position: 'absolute',
    bottom: -40,
    right: -30,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(245,197,24,0.09)',
  },
  bgGlowCenter: {
    position: 'absolute',
    top: '35%',
    left: '50%',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(245,197,24,0.05)',
  },

  // Navbar
  navbar: {
    paddingHorizontal: 14,
    paddingTop: 48,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navLeft: { flexDirection: 'row', alignItems: 'center' },
  hamburgerBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  hLine: { width: 22, height: 2.5, backgroundColor: C.white, borderRadius: 2 },
  deliveringTo: {
    fontSize: 10,
    color: C.primary,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginHorizontal: 3,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '900',
    color: C.white,
    marginTop: 1,
  },
  cartBtn: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 12,
    padding: 8,
    marginRight: 10,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: C.red,
    borderRadius: 9,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: C.white,
  },
  cartBadgeText: { color: C.white, fontSize: 9, fontWeight: '900' },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: C.primary,
  },

  // Greeting
  headerContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 18 },
  greeting: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
    marginBottom: 5,
  },
  heroTitle: {
    fontSize: 25,
    fontWeight: '900',
    color: C.white,
    lineHeight: 33,
    letterSpacing: -0.6,
    marginBottom: 14,
  },
  promoPill: {
    backgroundColor: 'rgba(245,197,24,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.35)',
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  promoText: { fontSize: 11, color: '#FFF9C4', fontWeight: '600' },

  // Search
  searchRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 4,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.61)',
  },
  searchInput: { flex: 1, fontSize: 13, color: C.white, fontWeight: '500' },

  // Categories
  catSectionTitle: { fontSize: 15, fontWeight: '900', color: C.white },
  seeAllCat: { fontSize: 12, color: C.primary, fontWeight: '700' },
  catLabel: { fontSize: 10, fontWeight: '800', textAlign: 'center' },
  moreCatBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 7,
    minWidth: 60,
  },
  moreCatImgWrap: {
    width: 60,
    height: 60,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(245,197,24,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
