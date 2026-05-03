import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { C, MenuItem, HOTEL } from '../components/Uiatoms';
import HotelInfoCard from '../components/Hotelinfocard';  
import MenuItemCard from '../components/Menuitemcard';
import MenuFAB from '../components/Menufab';
import CartBar from '../components/Cartbar';
import FoodItemDrawer from './FooditemdrawerScreen';
import FullMenuDrawer from './FullmenudrawerScreen';

export default function HotelFoodMenuScreen({ route }: any) {
  console.log('HotelFoodMenuScreen rendered with route params:', route?.params);
  const { initialItem } = route?.params || {};
  const navigation = useNavigation();

  // ── State ──────────────────────────────────────────────────────────────────
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [drawerItem, setDrawerItem] = useState<MenuItem | null>(initialItem ?? null);
  const [itemDrawerVisible, setItemDrawerVisible] = useState(!!initialItem);
  const [menuDrawerVisible, setMenuDrawerVisible] = useState(false);

  // ── Derived ────────────────────────────────────────────────────────────────
  const cartCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
  const totalAmount = HOTEL.menuItems.reduce(
    (sum, item) => sum + (cartItems[item.name] || 0) * item.price,
    0,
  );

  // ── Handlers ───────────────────────────────────────────────────────────────
  const addToCart = (item: MenuItem, qty: number = 1) => {
    setCartItems(prev => ({ ...prev, [item.name]: (prev[item.name] || 0) + qty }));
  };

  const toggleWishlist = (item: MenuItem) => {
    setWishlist(prev =>
      prev.includes(item.name) ? prev.filter(n => n !== item.name) : [...prev, item.name],
    );
  };

  const openItemDrawer = (item: MenuItem) => {
    setDrawerItem(item);
    setItemDrawerVisible(true);
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bgLight }}>
      <StatusBar barStyle="light-content" backgroundColor={C.navy} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Back button — real Ionicon ── */}
        <TouchableOpacity style={styles.topBtnLeft} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={C.ink} />
        </TouchableOpacity>

        <HotelInfoCard hotel={HOTEL} />

        {/* ── Menu list ── */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
          <View style={[styles.row, { justifyContent: 'space-between', marginBottom: 14 }]}>
            <Text style={styles.sectionTitle}>Menu Highlights</Text>
            <TouchableOpacity
              style={styles.seeAllBtn}
              onPress={() => setMenuDrawerVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.seeAllText}>Full Menu</Text>
              <Ionicons name="chevron-forward" size={12} color={C.primaryDark} />
            </TouchableOpacity>
          </View>

          {HOTEL.menuItems.map((item, idx) => (
            <MenuItemCard
              key={idx}
              item={item}
              cartQty={cartItems[item.name] ?? 0}
              isWishlisted={wishlist.includes(item.name)}
              onPress={() => openItemDrawer(item)}
              onAddToCart={() => addToCart(item)}
              onWishlistToggle={() => toggleWishlist(item)}
            />
          ))}
        </View>

        <View style={{ height: 150 }} />
      </ScrollView>

      <MenuFAB
        itemCount={HOTEL.menuItems.length}
        bottom={cartCount > 0 ? 98 : 28}
        onPress={() => setMenuDrawerVisible(true)}
      />

      <CartBar
        cartCount={cartCount}
        totalAmount={totalAmount}
        onViewCart={() => {/* navigate to cart */}}
      />

      <FoodItemDrawer
        item={drawerItem}
        visible={itemDrawerVisible}
        onClose={() => setItemDrawerVisible(false)}
        onAddToCart={addToCart}
        onWishlist={toggleWishlist}
        isWishlisted={drawerItem ? wishlist.includes(drawerItem.name) : false}
      />

      <FullMenuDrawer
        visible={menuDrawerVisible}
        onClose={() => setMenuDrawerVisible(false)}
        onSelectItem={item => openItemDrawer(item)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topBtnLeft: {
    margin: 16,
    width: 40,
    height: 20,
   
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: C.ink },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 3,
  },
  seeAllText: { fontSize: 11, fontWeight: '700', color: C.primaryDark },
});