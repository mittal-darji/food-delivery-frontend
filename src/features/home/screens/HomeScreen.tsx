import React, { useState, useMemo, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ── Components ────────────────────────────────────────────────────────────────
import HeroHeader from '../components/Heroheader ';
import FilterSortBar from '../components/Filtersortbar';
import FeaturedCard from '../components/Featuredcard';
import AllCategoriesModal from '../components/Allcategoriesmodal';
import LeftDrawer from '../components/Leftdrawer';
import BottomNavBar from '../components/Bottomnavbar';
import HomeFooter from '../components/Homefooter';

// ── Screens ───────────────────────────────────────────────────────────────────
import RestaurantListScreen from './Restaurantlistscreen';
// import HotelFoodMenuScreen from '../../HotelFoodMenu/screens/HotelFoodMenuScreen';
import { RestaurantCardData } from '../components/Restaurantcard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const C = {
  primary: '#F5C518',
  primaryLight: '#FEFDDF',
  primaryMid: '#FDEEA0',
  primaryDark: '#C49A00',
  gold: '#FFC81E',
  green: '#10B981',
  greenLight: '#D1FAE5',
  red: '#EF4444',
  redLight: '#FEE2E2',
  navy: '#1A1033',
  ink: '#1A1033',
  slate: '#4A5568',
  muted: '#8C96A3',
  border: '#EDF0F4',
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  bgLight: '#FEFDDF',
};

const FOOD_CARDS: RestaurantCardData[] = [
  {
    id: 1,
    restaurant: 'Cheese & Chips Co.',
    rating: 4.8,
    reviews: 1240,
    distance: '1.2 km',
    deliveryTime: '18–25 min',
    isVeg: false,
    category: 2,
    priceRange: 'mid',
    restaurantImage:
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&q=80',
    tag: 'Bestseller',
    tagColor: '#1A1033',
    featured: true,
    startingPrice: 11.99,
    offer: '20% OFF',
    menuItems: [
      {
        name: 'Classic Smash Burger',
        price: 12.99,
        image:
          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=90',
        desc: 'Double patty, cheddar, lettuce',
      },
      {
        name: 'Double Cheese Burger',
        price: 14.99,
        image:
          'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=90',
        desc: 'Extra cheese, caramelised onion',
      },
      {
        name: 'BBQ Bacon Stack',
        price: 15.49,
        image:
          'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=500&q=90',
        desc: 'Smoky bacon, BBQ sauce',
      },
      {
        name: 'Mushroom Swiss Burger',
        price: 13.49,
        image:
          'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500&q=90',
        desc: 'Sautéed mushrooms, swiss',
      },
      {
        name: 'Crispy Chicken Burger',
        price: 11.99,
        image:
          'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=500&q=90',
        desc: 'Crispy buttermilk chicken',
      },
    ],
  },
  {
    id: 2,
    restaurant: 'Bella Napoli',
    rating: 4.9,
    reviews: 2110,
    distance: '2.1 km',
    deliveryTime: '25–35 min',
    isVeg: true,
    category: 1,
    priceRange: 'mid',
    restaurantImage:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&q=80',
    tag: 'Top Rated',
    tagColor: '#C49A00',
    featured: true,
    startingPrice: 13.99,
    offer: 'Free Drink',
    menuItems: [
      {
        name: 'Margherita Stonebake',
        price: 13.99,
        image:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=90',
        desc: 'San Marzano tomato, buffalo mozzarella',
      },
      {
        name: 'Truffle Mushroom Pizza',
        price: 16.99,
        image:
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=90',
        desc: 'Truffle oil, wild mushrooms',
      },
      {
        name: 'Four Cheese Pizza',
        price: 15.49,
        image:
          'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500&q=90',
        desc: 'Mozzarella, gorgonzola, parmesan, brie',
      },
      {
        name: 'Pepperoni Feast',
        price: 14.99,
        image:
          'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=90',
        desc: 'Double pepperoni, chilli flakes',
      },
    ],
  },
  {
    id: 3,
    restaurant: 'Tokyo Ramen House',
    rating: 4.7,
    reviews: 876,
    distance: '1.8 km',
    deliveryTime: '28–38 min',
    isVeg: false,
    category: 5,
    priceRange: 'mid',
    restaurantImage:
      'https://images.unsplash.com/photo-1618418440467-26b62c384f22?w=100&q=80',
    tag: 'New',
    tagColor: '#1A1033',
    featured: false,
    startingPrice: 12.99,
    offer: '15% OFF',
    menuItems: [
      {
        name: 'Tonkotsu Ramen',
        price: 14.5,
        image:
          'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=90',
        desc: 'Rich pork bone broth, chashu',
      },
      {
        name: 'Spicy Miso Ramen',
        price: 13.99,
        image:
          'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=500&q=90',
        desc: 'Red miso, bamboo shoots, egg',
      },
      {
        name: 'Shoyu Chicken Ramen',
        price: 13.49,
        image:
          'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=500&q=90',
        desc: 'Soy broth, tender chicken',
      },
      {
        name: 'Vegan Tantanmen',
        price: 12.99,
        image:
          'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500&q=90',
        desc: 'Sesame broth, tofu, bok choy',
      },
    ],
  },
  {
    id: 4,
    restaurant: 'Green Leaf Kitchen',
    rating: 4.6,
    reviews: 543,
    distance: '0.8 km',
    deliveryTime: '15–20 min',
    isVeg: true,
    category: 6,
    priceRange: 'low',
    restaurantImage:
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=100&q=80',
    tag: 'Veg Fave',
    tagColor: '#10B981',
    featured: true,
    startingPrice: 8.99,
    offer: 'Buy 2 Get 1',
    menuItems: [
      {
        name: 'Buddha Bowl',
        price: 10.49,
        image:
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=90',
        desc: 'Quinoa, roasted veg, tahini',
      },
      {
        name: 'Avocado Quinoa Bowl',
        price: 11.49,
        image:
          'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&q=90',
        desc: 'Avocado, edamame, miso dressing',
      },
      {
        name: 'Greek Goddess Salad',
        price: 9.99,
        image:
          'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=90',
        desc: 'Feta, kalamata olives, cucumber',
      },
      {
        name: 'Roasted Veggie Wrap',
        price: 8.99,
        image:
          'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&q=90',
        desc: 'Seasonal veg, hummus, spinach',
      },
    ],
  },
  {
    id: 5,
    restaurant: 'Sweet Tooth',
    rating: 4.8,
    reviews: 422,
    distance: '0.5 km',
    deliveryTime: '12–18 min',
    isVeg: true,
    category: 7,
    priceRange: 'low',
    restaurantImage:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&q=80',
    tag: 'Under 20 min',
    tagColor: '#EC4899',
    featured: false,
    startingPrice: 6.49,
    offer: 'Free Delivery',
    menuItems: [
      {
        name: 'Nutella Waffle Stack',
        price: 8.99,
        image:
          'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=90',
        desc: 'Crispy waffle, Nutella, banana',
      },
      {
        name: 'Strawberry Crêpe',
        price: 7.99,
        image:
          'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=500&q=90',
        desc: 'Fresh strawberries, cream',
      },
      {
        name: 'Belgian Chocolate Brownie',
        price: 6.49,
        image:
          'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&q=90',
        desc: 'Dark chocolate, fudge centre',
      },
      {
        name: 'Tiramisu Cup',
        price: 7.49,
        image:
          'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=90',
        desc: 'Espresso soaked, mascarpone',
      },
    ],
  },
];

function HomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
  
  const [activeCat, setActiveCat] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('default');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const [selectedCard, setSelectedCard] = useState<RestaurantCardData | null>(
    null,
  );
  const [cartCount] = useState(3);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [catModalVisible, setCatModalVisible] = useState(false);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = FOOD_CARDS.filter(c => {
      if (activeCat !== 0 && c.category !== activeCat) return false;
      if (
        search &&
        !c.restaurant.toLowerCase().includes(search.toLowerCase()) &&
        !c.menuItems.some(m =>
          m.name.toLowerCase().includes(search.toLowerCase()),
        )
      )
        return false;
      if (activeFilter === 'offers' && !c.offer) return false;
      if (activeFilter === 'veg' && !c.isVeg) return false;
      if (activeFilter === 'fast' && parseInt(c.deliveryTime) >= 20)
        return false;
      if (activeFilter === 'nearby' && parseFloat(c.distance) > 1.5)
        return false;
      return true;
    });
    if (activeSort === 'time')
      result = [...result].sort(
        (a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime),
      );
    if (activeSort === 'price')
      result = [...result].sort((a, b) => a.startingPrice - b.startingPrice);
    if (activeSort === 'rating')
      result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [activeCat, search, activeFilter, activeSort]);

  const featured = useMemo(() => FOOD_CARDS.filter(c => c.featured), []);

  if (selectedCard) {
    // return (
      // <HotelFoodMenuScreen
      //   initialItem={{
      //     ...selectedCard.menuItems[0],
      //     isVeg: selectedCard.isVeg,
      //     category: String(selectedCard.category),
      //     offer: selectedCard.offer,
      //   }}
      //   onBack={() => setSelectedCard(null)}
      // />
      navigation.navigate("HotelFoodMenu", {
  initialItem: {
    ...selectedCard.menuItems[0],
    isVeg: selectedCard.isVeg,
    category: String(selectedCard.category),
    offer: selectedCard.offer,
  }
})
   
  // );
 }

  return (
    <SafeAreaView style={S.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <LeftDrawer visible={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <AllCategoriesModal
        visible={catModalVisible}
        onClose={() => setCatModalVisible(false)}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
      />

      <ScrollView style={S.scroll} showsVerticalScrollIndicator={false}>
        {/* 1 ── HERO HEADER */}
        <HeroHeader
          search={search}
          onSearchChange={setSearch}
          activeCat={activeCat}
          onCatPress={setActiveCat}
          onSeeAllCats={() => setCatModalVisible(true)}
          onMenuPress={() => setDrawerOpen(true)}
          cartCount={cartCount}
        />

        {/* 2 ── FILTER + SORT */}
        <FilterSortBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
        />

        {/* 3 ── RESULTS COUNT */}
        <View style={S.resultsRow}>
          <Text style={S.resultsText}>
            <Text style={{ color: C.primaryDark, fontWeight: '800' }}>
              {filtered.length}
            </Text>{' '}
            restaurants found
          </Text>
          {wishlist.size > 0 && (
            <View style={S.wishlistChip}>
              <Ionicons name="heart" size={11} color={C.red} />
              <Text style={S.wishlistChipText}>{wishlist.size} saved</Text>
            </View>
          )}
        </View>

        {/* 4 ── FEATURED */}
        <View style={S.section}>
          <View
            style={[
              S.row,
              { justifyContent: 'space-between', marginBottom: 14 },
            ]}
          >
            <View style={S.row}>
              <View style={S.sectionDot} />
              <Text style={S.sectionTitle}>🔥 Featured</Text>
            </View>
            <TouchableOpacity>
              <Text style={S.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 14 }}
          >
            {featured.map(card => (
              <FeaturedCard
                key={card.id}
                card={card}
                onPress={() => setSelectedCard(card)}
              />
            ))}
          </ScrollView>
        </View>

        {/* 5 ── RESTAURANTS LIST */}
        <View style={[S.section, { paddingTop: 2 }]}>
          <View style={[S.row, { marginBottom: 14 }]}>
            <View style={S.sectionDot} />
            <Text style={S.sectionTitle}>🍴 Restaurants</Text>
          </View>
          <RestaurantListScreen
            filtered={filtered}
            wishlist={wishlist}
            onCardPress={card => setSelectedCard(card)}
            onWishlistToggle={toggleWishlist}
          />
        </View>

        {/* 6 ── FOOTER */}
        <HomeFooter />

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* 7 ── BOTTOM NAV BAR */}
      <BottomNavBar />
    </SafeAreaView>
  );
}

const S = StyleSheet.create({
  safeArea: { flex: 1 },
  scroll: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center' },

  resultsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 4,
  },
  resultsText: { fontSize: 12, color: C.muted, fontWeight: '600' },
  wishlistChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: C.redLight,
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  wishlistChipText: { fontSize: 11, fontWeight: '700', color: C.red },

  section: { paddingHorizontal: 14, paddingTop: 20, paddingBottom: 10 },
  sectionDot: {
    width: 6,
    height: 18,
    backgroundColor: C.primary,
    borderRadius: 3,
    marginRight: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: '900', color: C.ink },
  seeAll: { fontSize: 11, color: C.primaryDark, fontWeight: '700' },
});

export default HomeScreen;