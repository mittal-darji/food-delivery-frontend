import { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  PanResponder,
  StatusBar,
  SafeAreaView,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SIDEBAR_WIDTH = Math.min(SCREEN_WIDTH * 0.72, 280);

const CATEGORIES = [
  { id: 0, label: "All", imageUri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=80&q=80" },
  { id: 1, label: "Pizza", imageUri: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&q=80" },
  { id: 2, label: "Burgers", imageUri: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&q=80" },
  { id: 3, label: "Sushi", imageUri: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=80&q=80" },
  { id: 4, label: "Mexican", imageUri: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=80&q=80" },
  { id: 5, label: "Noodles", imageUri: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=80&q=80" },
  { id: 6, label: "Salads", imageUri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=80&q=80" },
  { id: 7, label: "Desserts", imageUri: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=80&q=80" },
  { id: 8, label: "Drinks", imageUri: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=80&q=80" },
];

const FOOD_CARDS = [
  {
    id: 1,
    restaurant: "The Burger Joint",
    foodName: "Classic Smash Burger",
    price: 12.99,
    rating: 4.8,
    reviews: 342,
    distance: "1.2 km",
    deliveryTime: "18–25 min",
    isVeg: false,
    category: 2,
    priceRange: "mid",
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&q=80",
      "https://images.unsplash.com/photo-1607197109808-88bfc4cc9e83?w=400&q=80",
    ],
    tag: "Bestseller",
    tagColor: "#F97316",
    featured: true,
  },
  {
    id: 2,
    restaurant: "Green Leaf Kitchen",
    foodName: "Buddha Bowl",
    price: 10.49,
    rating: 4.6,
    reviews: 189,
    distance: "0.8 km",
    deliveryTime: "15–20 min",
    isVeg: true,
    category: 6,
    priceRange: "low",
    images: [
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80",
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&q=80",
    ],
    tag: "Veg Fave",
    tagColor: "#22C55E",
    featured: true,
  },
  {
    id: 3,
    restaurant: "Bella Napoli",
    foodName: "Margherita Stonebake",
    price: 13.99,
    rating: 4.9,
    reviews: 511,
    distance: "2.1 km",
    deliveryTime: "25–35 min",
    isVeg: true,
    category: 1,
    priceRange: "mid",
    images: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
    ],
    tag: "Top Rated",
    tagColor: "#EAB308",
    featured: true,
  },
  {
    id: 4,
    restaurant: "Tokyo Ramen House",
    foodName: "Tonkotsu Ramen",
    price: 14.5,
    rating: 4.7,
    reviews: 278,
    distance: "1.8 km",
    deliveryTime: "28–38 min",
    isVeg: false,
    category: 5,
    priceRange: "mid",
    images: [
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80",
      "https://images.unsplash.com/photo-1552611052-33e04de081de?w=400&q=80",
      "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400&q=80",
    ],
    tag: "New",
    tagColor: "#8B5CF6",
    featured: false,
  },
  {
    id: 5,
    restaurant: "Spice Route",
    foodName: "Butter Chicken",
    price: 11.99,
    rating: 4.5,
    reviews: 423,
    distance: "3.0 km",
    deliveryTime: "35–45 min",
    isVeg: false,
    category: 3,
    priceRange: "mid",
    images: [
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",
      "https://images.unsplash.com/photo-1545247181-516773cae754?w=400&q=80",
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
    ],
    tag: "Spicy 🌶",
    tagColor: "#EF4444",
    featured: false,
  },
  {
    id: 6,
    restaurant: "Sweet Tooth",
    foodName: "Nutella Waffle Stack",
    price: 8.99,
    rating: 4.8,
    reviews: 196,
    distance: "0.5 km",
    deliveryTime: "12–18 min",
    isVeg: true,
    category: 7,
    priceRange: "low",
    images: [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80",
      "https://images.unsplash.com/photo-1559622214-f8a9850965bb?w=400&q=80",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80",
    ],
    tag: "Under 20 min",
    tagColor: "#EC4899",
    featured: false,
  },
];

const MENU_ITEMS = [
  { icon: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png", label: "Profile", color: "#F97316" },
  { icon: "https://cdn-icons-png.flaticon.com/512/833/833472.png", label: "Collection", color: "#EC4899" },
  { icon: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png", label: "Cart", color: "#8B5CF6" },
  { icon: "https://cdn-icons-png.flaticon.com/512/1450/1450071.png", label: "Orders", color: "#3B82F6" },
  { icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png", label: "Feedback", color: "#22C55E" },
  { icon: "https://cdn-icons-png.flaticon.com/512/597/597177.png", label: "Contact Us", color: "#EAB308" },
];

// ─── FOOD DETAIL PAGE ────────────────────────────────────────────────────────
function FoodDetailPage({
  card,
  onBack,
}: {
  card: (typeof FOOD_CARDS)[0];
  onBack: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={detailStyles.heroImgWrap}>
          <Image
            source={{ uri: card.images[imgIdx] }}
            style={detailStyles.heroImg}
            resizeMode="cover"
          />
          {/* Overlay buttons */}
          <TouchableOpacity style={detailStyles.backBtn} onPress={onBack}>
            <Text style={detailStyles.backBtnText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={detailStyles.likeBtn}
            onPress={() => setLiked((l) => !l)}
          >
            <Image
              source={{
                uri: liked
                  ? "https://cdn-icons-png.flaticon.com/512/833/833472.png"
                  : "https://cdn-icons-png.flaticon.com/512/2589/2589175.png",
              }}
              style={{ width: 20, height: 20, tintColor: liked ? "#EF4444" : "#334155" }}
            />
          </TouchableOpacity>
          {/* Dots */}
          <View style={detailStyles.dotsRow}>
            {card.images.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setImgIdx(i)}>
                <View
                  style={[
                    detailStyles.dot,
                    {
                      width: i === imgIdx ? 22 : 7,
                      backgroundColor:
                        i === imgIdx ? "#F97316" : "rgba(255,255,255,0.55)",
                    },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
          {/* Tag */}
          <View style={[detailStyles.tagBadge, { backgroundColor: card.tagColor }]}>
            <Text style={detailStyles.tagText}>{card.tag}</Text>
          </View>
        </View>

        {/* Thumbnail strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={detailStyles.thumbStrip}
        >
          {card.images.map((uri, i) => (
            <TouchableOpacity key={i} onPress={() => setImgIdx(i)}>
              <Image
                source={{ uri }}
                style={[
                  detailStyles.thumb,
                  i === imgIdx && detailStyles.thumbActive,
                ]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Info */}
        <View style={detailStyles.infoSection}>
          <View style={detailStyles.row}>
            <Text style={detailStyles.restaurantLabel}>{card.restaurant}</Text>
            <VegBadge isVeg={card.isVeg} />
          </View>
          <Text style={detailStyles.foodName}>{card.foodName}</Text>

          {/* Stats row */}
          <View style={detailStyles.statsRow}>
            {[
              { icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", val: `${card.rating}`, sub: `${card.reviews} reviews`, tint: "#F59E0B" },
              { icon: "https://cdn-icons-png.flaticon.com/512/535/535137.png", val: card.distance, sub: "distance", tint: "#3B82F6" },
              { icon: "https://cdn-icons-png.flaticon.com/512/2088/2088617.png", val: card.deliveryTime, sub: "delivery", tint: "#22C55E" },
            ].map((s, i) => (
              <View key={i} style={detailStyles.statItem}>
                <Image source={{ uri: s.icon }} style={[detailStyles.statIcon, { tintColor: s.tint }]} />
                <Text style={detailStyles.statVal}>{s.val}</Text>
                <Text style={detailStyles.statSub}>{s.sub}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text style={detailStyles.sectionTitle}>About this dish</Text>
          <Text style={detailStyles.descText}>
            A beautifully crafted dish from {card.restaurant}, made with the freshest
            ingredients. Loved by {card.reviews}+ customers and rated {card.rating}/5.
            Delivered hot and fresh to your door in {card.deliveryTime}.
          </Text>

          {/* Price + Quantity */}
          <View style={detailStyles.priceQtyRow}>
            <View>
              <Text style={detailStyles.priceSub}>Price</Text>
              <Text style={detailStyles.priceVal}>£{(card.price * quantity).toFixed(2)}</Text>
            </View>
            <View style={detailStyles.qtyControl}>
              <TouchableOpacity
                style={detailStyles.qtyBtn}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Text style={detailStyles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={detailStyles.qtyVal}>{quantity}</Text>
              <TouchableOpacity
                style={[detailStyles.qtyBtn, { backgroundColor: "#F97316" }]}
                onPress={() => setQuantity((q) => q + 1)}
              >
                <Text style={[detailStyles.qtyBtnText, { color: "white" }]}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to cart */}
          <TouchableOpacity style={detailStyles.addCartBtn} activeOpacity={0.85}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png" }}
              style={{ width: 20, height: 20, tintColor: "white", marginRight: 8 }}
            />
            <Text style={detailStyles.addCartText}>Add to Cart · £{(card.price * quantity).toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── LEFT DRAWER ────────────────────────────────────────────────────────────
function LeftDrawer({
  visible,
  onClose,
  activeCat,
  setActiveCat,
}: {
  visible: boolean;
  onClose: () => void;
  activeCat: number;
  setActiveCat: (id: number) => void;
}) {
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;

  if (visible) {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  } else {
    Animated.timing(slideAnim, {
      toValue: -SIDEBAR_WIDTH,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <View style={styles.drawerOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.drawerBackdrop} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.drawerPanel, { transform: [{ translateX: slideAnim }] }]}
        >
          {/* Drawer Header */}
          <View style={styles.drawerHeader}>
            <View style={styles.drawerBrandRow}>
              <View style={styles.drawerBrandIcon}>
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/3448/3448609.png" }}
                  style={{ width: 24, height: 24, tintColor: "white" }}
                />
              </View>
              <View>
                <Text style={styles.drawerBrandName}>ForkDash</Text>
                <Text style={styles.drawerBrandSub}>Delivered with love 🧡</Text>
              </View>
            </View>

            <View style={styles.drawerUserCard}>
              <View style={styles.drawerAvatar}>
                <Image
                  source={{ uri: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png" }}
                  style={{ width: 26, height: 26, tintColor: "white" }}
                />
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.drawerUserName}>Oliver Smith</Text>
                <Text style={styles.drawerUserEmail}>oliver@email.com</Text>
              </View>
              <View style={styles.drawerProBadge}>
                <Text style={styles.drawerProText}>PRO</Text>
              </View>
            </View>
          </View>

          {/* Navigation Menu Items */}
          <View style={styles.drawerMenuSection}>
            <Text style={styles.drawerSectionLabel}>MENU</Text>
            {MENU_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.drawerMenuItem}
                activeOpacity={0.7}
                onPress={onClose}
              >
                <View style={[styles.drawerMenuIcon, { backgroundColor: item.color + "18" }]}>
                  <Image
                    source={{ uri: item.icon }}
                    style={{ width: 20, height: 20, tintColor: item.color }}
                  />
                </View>
                <Text style={styles.drawerMenuLabel}>{item.label}</Text>
                <Text style={{ color: "#CBD5E1", fontSize: 14 }}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Drawer Footer */}
          <View style={styles.drawerFooter}>
            <TouchableOpacity style={styles.drawerLogout} onPress={onClose}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/1378/1378016.png" }}
                style={{ width: 18, height: 18, tintColor: "#EF4444" }}
              />
              <Text style={styles.drawerLogoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ─── VEG BADGE ──────────────────────────────────────────────────────────────
function VegBadge({ isVeg }: { isVeg: boolean }) {
  return (
    <View
      style={[
        styles.vegBadge,
        {
          backgroundColor: isVeg ? "#F0FDF4" : "#FFF1F2",
          borderColor: isVeg ? "#86EFAC" : "#FECACA",
        },
      ]}
    >
      <View style={[styles.vegDot, { backgroundColor: isVeg ? "#22C55E" : "#EF4444" }]} />
      <Text style={[styles.vegText, { color: isVeg ? "#15803D" : "#B91C1C" }]}>
        {isVeg ? "VEG" : "NON-VEG"}
      </Text>
    </View>
  );
}

// ─── DROPDOWN FILTER ─────────────────────────────────────────────────────────
function DropdownFilter({
  activeFilter,
  setActiveFilter,
  sortBy,
  setSortBy,
}: {
  activeFilter: string;
  setActiveFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const next = !open;
    setOpen(next);
    Animated.spring(anim, {
      toValue: next ? 1 : 0,
      useNativeDriver: false,
      damping: 18,
      stiffness: 180,
    }).start();
  };

  const filterOptions = [
    { id: "all", label: "All Items", icon: "https://cdn-icons-png.flaticon.com/512/3448/3448609.png" },
    { id: "veg", label: "Vegetarian", icon: "https://cdn-icons-png.flaticon.com/512/2153/2153786.png" },
    { id: "nonveg", label: "Non-Vegetarian", icon: "https://cdn-icons-png.flaticon.com/512/3143/3143643.png" },
    { id: "nearby", label: "Nearby (< 1.5 km)", icon: "https://cdn-icons-png.flaticon.com/512/535/535137.png" },
    { id: "low", label: "Budget Friendly", icon: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png" },
  ];

  const sortOptions = [
    { id: "rating", label: "Rating (High to Low)", icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png" },
    { id: "time", label: "Fastest Delivery", icon: "https://cdn-icons-png.flaticon.com/512/2088/2088617.png" },
    { id: "price", label: "Price (Low to High)", icon: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png" },
    { id: "distance", label: "Distance", icon: "https://cdn-icons-png.flaticon.com/512/535/535137.png" },
    { id: "reviews", label: "Most Reviewed", icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png" },
  ];

  const activeFilterLabel = filterOptions.find((f) => f.id === activeFilter)?.label || "All Items";
  const activeSortLabel = sortOptions.find((s) => s.id === sortBy)?.label || "Rating";

  const maxHeight = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 380] });
  const opacity = anim.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 0.6, 1] });

  return (
    <View style={dropStyles.wrap}>
      {/* Trigger Button */}
      <TouchableOpacity style={dropStyles.triggerRow} onPress={toggle} activeOpacity={0.85}>
        <View style={dropStyles.triggerLeft}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png" }}
            style={[dropStyles.triggerIcon, { tintColor: "#F97316" }]}
          />
          <View>
            <Text style={dropStyles.triggerLabel}>Filters & Sort</Text>
            <Text style={dropStyles.triggerSub}>
              {activeFilterLabel} · {activeSortLabel}
            </Text>
          </View>
        </View>
        <Animated.Text
          style={[
            dropStyles.chevron,
            {
              transform: [
                {
                  rotate: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "180deg"],
                  }),
                },
              ],
            },
          ]}
        >
          ▾
        </Animated.Text>
      </TouchableOpacity>

      {/* Dropdown Panel */}
      <Animated.View style={[dropStyles.panel, { maxHeight, opacity }]}>
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          {/* Filter Section */}
          <Text style={dropStyles.sectionHead}>FILTER BY</Text>
          {filterOptions.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[
                dropStyles.option,
                activeFilter === f.id && dropStyles.optionActive,
              ]}
              onPress={() => {
                setActiveFilter(f.id);
                toggle();
              }}
              activeOpacity={0.75}
            >
              <View
                style={[
                  dropStyles.optionIconWrap,
                  { backgroundColor: activeFilter === f.id ? "#FFF7ED" : "#F1F5F9" },
                ]}
              >
                <Image
                  source={{ uri: f.icon }}
                  style={[
                    dropStyles.optionIcon,
                    { tintColor: activeFilter === f.id ? "#F97316" : "#64748B" },
                  ]}
                />
              </View>
              <Text
                style={[
                  dropStyles.optionLabel,
                  { color: activeFilter === f.id ? "#F97316" : "#334155" },
                ]}
              >
                {f.label}
              </Text>
              {activeFilter === f.id && (
                <View style={dropStyles.checkDot}>
                  <Text style={{ fontSize: 10, color: "white" }}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}

          {/* Sort Section */}
          <Text style={[dropStyles.sectionHead, { marginTop: 14 }]}>SORT BY</Text>
          {sortOptions.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={[
                dropStyles.option,
                sortBy === s.id && dropStyles.optionActive,
              ]}
              onPress={() => {
                setSortBy(s.id);
                toggle();
              }}
              activeOpacity={0.75}
            >
              <View
                style={[
                  dropStyles.optionIconWrap,
                  { backgroundColor: sortBy === s.id ? "#FFF7ED" : "#F1F5F9" },
                ]}
              >
                <Image
                  source={{ uri: s.icon }}
                  style={[
                    dropStyles.optionIcon,
                    { tintColor: sortBy === s.id ? "#F97316" : "#64748B" },
                  ]}
                />
              </View>
              <Text
                style={[
                  dropStyles.optionLabel,
                  { color: sortBy === s.id ? "#F97316" : "#334155" },
                ]}
              >
                {s.label}
              </Text>
              {sortBy === s.id && (
                <View style={dropStyles.checkDot}>
                  <Text style={{ fontSize: 10, color: "white" }}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          <View style={{ height: 10 }} />
        </ScrollView>
      </Animated.View>
    </View>
  );
}

// ─── FOOD CARD ───────────────────────────────────────────────────────────────
function FoodCard({
  card,
  onPress,
}: {
  card: (typeof FOOD_CARDS)[0];
  onPress: () => void;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [liked, setLiked] = useState(false);
  const startX = useRef<number | null>(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      startX.current = evt.nativeEvent.pageX;
    },
    onPanResponderRelease: (evt) => {
      if (startX.current === null) return;
      const dx = evt.nativeEvent.pageX - startX.current;
      if (Math.abs(dx) > 30) {
        if (dx < 0) setImgIdx((i) => Math.min(i + 1, card.images.length - 1));
        else setImgIdx((i) => Math.max(i - 1, 0));
      } else {
        onPress();
      }
      startX.current = null;
    },
  });

  return (
    <View style={styles.foodCard}>
      {/* Image Area */}
      <View style={styles.cardImageArea} {...panResponder.panHandlers}>
        <Image
          source={{ uri: card.images[imgIdx] }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
        {/* Gradient overlay */}
        <View style={styles.imgGradient} />

        <View style={[styles.tagBadge, { backgroundColor: card.tagColor }]}>
          <Text style={styles.tagText}>{card.tag}</Text>
        </View>

        <TouchableOpacity
          onPress={() => setLiked((l) => !l)}
          style={styles.likeBtn}
        >
          <Image
            source={{
              uri: liked
                ? "https://cdn-icons-png.flaticon.com/512/833/833472.png"
                : "https://cdn-icons-png.flaticon.com/512/2589/2589175.png",
            }}
            style={{
              width: 19,
              height: 19,
              tintColor: liked ? "#EF4444" : "#475569",
            }}
          />
        </TouchableOpacity>

        {imgIdx > 0 && (
          <TouchableOpacity
            onPress={() => setImgIdx((i) => Math.max(i - 1, 0))}
            style={[styles.arrowBtn, { left: 10 }]}
          >
            <Text style={styles.arrowText}>‹</Text>
          </TouchableOpacity>
        )}

        {imgIdx < card.images.length - 1 && (
          <TouchableOpacity
            onPress={() => setImgIdx((i) => Math.min(i + 1, card.images.length - 1))}
            style={[styles.arrowBtn, { right: 10 }]}
          >
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        )}

        <View style={styles.dotsRow}>
          {card.images.map((_: string, i: number) => (
            <TouchableOpacity key={i} onPress={() => setImgIdx(i)}>
              <View
                style={[
                  styles.dot,
                  {
                    width: i === imgIdx ? 20 : 6,
                    backgroundColor:
                      i === imgIdx ? card.tagColor : "rgba(255,255,255,0.6)",
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Tap to view hint */}
        <View style={styles.tapHint}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/1828/1828765.png" }}
            style={{ width: 10, height: 10, tintColor: "rgba(255,255,255,0.75)", marginRight: 4 }}
          />
          <Text style={styles.tapHintText}>Tap to view</Text>
        </View>
      </View>

      {/* Card Body — tap anywhere to navigate */}
      <TouchableOpacity style={styles.cardBody} onPress={onPress} activeOpacity={0.92}>
        <View style={styles.row}>
          <Text style={styles.restaurantLabel}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/869/869636.png" }}
              style={{ width: 10, height: 10, tintColor: "#94A3B8" }}
            />{" "}
            {card.restaurant}
          </Text>
          <VegBadge isVeg={card.isVeg} />
        </View>

        <View style={[styles.row, { marginBottom: 12, marginTop: 4 }]}>
          <Text style={styles.foodName}>{card.foodName}</Text>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>£{card.price.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            {
              icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
              val: `${card.rating}`,
              sub: `${card.reviews} reviews`,
              tint: "#F59E0B",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/535/535137.png",
              val: card.distance,
              sub: "distance",
              tint: "#3B82F6",
            },
            {
              icon: "https://cdn-icons-png.flaticon.com/512/2088/2088617.png",
              val: card.deliveryTime,
              sub: "delivery",
              tint: "#22C55E",
            },
          ].map((s, i) => (
            <View key={i} style={styles.statItem}>
              <View style={styles.statValueRow}>
                <Image
                  source={{ uri: s.icon }}
                  style={{ width: 13, height: 13, tintColor: s.tint, marginRight: 3 }}
                />
                <Text style={[styles.statValue, { fontSize: i === 2 ? 11 : 13 }]}>{s.val}</Text>
              </View>
              <Text style={styles.statLabel}>{s.sub}</Text>
              {i < 2 && <View style={styles.statDivider} />}
            </View>
          ))}
        </View>

      </TouchableOpacity>
    </View>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [cartCount] = useState(3);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState<(typeof FOOD_CARDS)[0] | null>(null);

  const filtered = FOOD_CARDS.filter((c) => {
    if (activeCat !== 0 && c.category !== activeCat) return false;
    if (activeFilter === "veg" && !c.isVeg) return false;
    if (activeFilter === "nonveg" && c.isVeg) return false;
    if (activeFilter === "nearby" && parseFloat(c.distance) > 1.5) return false;
    if (activeFilter === "low" && c.priceRange !== "low") return false;
    if (
      search &&
      !c.foodName.toLowerCase().includes(search.toLowerCase()) &&
      !c.restaurant.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "time") return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "distance") return parseFloat(a.distance) - parseFloat(b.distance);
    if (sortBy === "reviews") return b.reviews - a.reviews;
    return 0;
  });

  const featured = FOOD_CARDS.filter((c) => c.featured);
  const activeCatData = CATEGORIES.find((c) => c.id === activeCat);

  // Show detail page
  if (selectedCard) {
    return (
      <FoodDetailPage card={selectedCard} onBack={() => setSelectedCard(null)} />
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <LeftDrawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
      />

      {/* ── NAVBAR ── */}
      <View style={styles.navbar}>
        <View style={styles.navLeft}>
          <TouchableOpacity
            onPress={() => setDrawerOpen(true)}
            style={styles.hamburgerBtn}
            activeOpacity={0.75}
          >
            <View style={styles.hamburgerLine} />
            <View style={[styles.hamburgerLine, { width: 18 }]} />
            <View style={[styles.hamburgerLine, { width: 14 }]} />
          </TouchableOpacity>

          <View style={{ marginLeft: 10 }}>
            <View style={styles.row}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/535/535137.png" }}
                style={{ width: 12, height: 12, tintColor: "#F97316", marginRight: 4 }}
              />
              <Text style={styles.deliveringLabel}>Delivering to</Text>
              <Text style={{ fontSize: 10, color: "#F97316" }}>▾</Text>
            </View>
            <Text style={styles.locationText}>Mayfair, London</Text>
          </View>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.cartBtn}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png" }}
              style={{ width: 22, height: 22, tintColor: "#F97316" }}
            />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png" }}
              style={{ width: 19, height: 19, tintColor: "white" }}
            />
          </View>
        </View>
      </View>

      {/* ── FULL WIDTH SCROLL ── */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* ── HERO ── */}
        <View style={styles.hero}>
          <View style={styles.heroBgCircle1} pointerEvents="none" />
          <View style={styles.heroBgCircle2} pointerEvents="none" />
          <Text style={styles.heroGreeting}>Good afternoon, Oliver 👋</Text>
          <Text style={styles.heroTitle}>
            Hungry? Discover{"\n"}
            <Text style={{ color: "#F97316" }}>2,400+ dishes</Text> near you.
          </Text>
          <Text style={styles.heroSub}>
            Fast delivery · Great restaurants · Best prices
          </Text>
          <View style={styles.promoPill}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/2910/2910791.png" }}
              style={{ width: 14, height: 14, tintColor: "#F97316" }}
            />
            <Text style={styles.promoText}>
              Use{" "}
              <Text style={{ color: "#F97316", fontWeight: "900" }}>WELCOME40</Text>
              {" "}— 40% off first order
            </Text>
          </View>
          {/* Hero food image */}
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=120&q=80" }}
            style={styles.heroFoodImg}
          />
        </View>

        {/* ── SEARCH BAR ── */}
        <View style={styles.searchBar}>
          <View style={styles.searchInput}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/622/622669.png" }}
              style={{ width: 16, height: 16, tintColor: "#94A3B8", marginRight: 8 }}
            />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search dishes or restaurants..."
              placeholderTextColor="#94A3B8"
              style={styles.searchTextInput}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Text style={{ color: "#94A3B8", fontSize: 14 }}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterIconBtn}>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png" }}
              style={{ width: 18, height: 18, tintColor: "white" }}
            />
          </TouchableOpacity>
        </View>

        {/* ── ACTIVE CATEGORY LABEL ── */}
        {activeCat !== 0 && (
          <View style={styles.activeCatBar}>
            <Image
              source={{ uri: activeCatData?.imageUri }}
              style={{ width: 22, height: 22, borderRadius: 11 }}
            />
            <Text style={styles.activeCatText}>
              Showing: {activeCatData?.label}
            </Text>
            <TouchableOpacity
              onPress={() => setActiveCat(0)}
              style={styles.clearCatBtn}
            >
              <Text style={styles.clearCatText}>✕ Clear</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ── HORIZONTAL CATEGORIES ── */}
        <View style={{ paddingTop: 18 }}>
          <View style={[styles.row, styles.sectionHeader]}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Text style={styles.seeAll}>See all →</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12, gap: 10 }}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCat(cat.id)}
                style={[
                  styles.catBtn,
                  activeCat === cat.id && styles.catBtnActive,
                ]}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: cat.imageUri }}
                  style={[
                    styles.catBtnImg,
                    activeCat === cat.id && { borderColor: "white", borderWidth: 2 },
                  ]}
                />
                <Text
                  style={[
                    styles.catLabel,
                    { color: activeCat === cat.id ? "white" : "#64748B" },
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── DROPDOWN FILTER ── */}
        <View style={{ paddingHorizontal: 12, paddingTop: 14 }}>
          <DropdownFilter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </View>

        {/* ── FEATURED ── */}
        <View style={{ paddingTop: 18 }}>
          <View style={[styles.row, styles.sectionHeader]}>
            <Text style={styles.sectionTitle}>🔥 Featured</Text>
            <Text style={styles.seeAll}>See all →</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12, gap: 12 }}
          >
            {featured.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={styles.featuredCard}
                activeOpacity={0.85}
                onPress={() => setSelectedCard(card)}
              >
                <Image
                  source={{ uri: card.images[0] }}
                  style={styles.featuredImg}
                  resizeMode="cover"
                />
                <View style={[styles.featuredTag, { backgroundColor: card.tagColor }]}>
                  <Text style={styles.featuredTagText}>{card.tag}</Text>
                </View>
                <View style={{ padding: 10 }}>
                  <Text style={styles.featuredRestaurant}>{card.restaurant}</Text>
                  <Text style={styles.featuredFoodName}>{card.foodName}</Text>
                  <View style={[styles.row, { justifyContent: "space-between" }]}>
                    <View style={styles.row}>
                      <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png" }}
                        style={{ width: 11, height: 11, tintColor: "#F59E0B", marginRight: 2 }}
                      />
                      <Text style={styles.featuredRating}>{card.rating}</Text>
                    </View>
                    <Text style={styles.featuredPrice}>£{card.price.toFixed(2)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── ALL DISHES ── */}
        <View style={{ padding: 12, paddingBottom: 0 }}>
          <View style={[styles.row, { marginBottom: 14 }]}>
            <Text style={styles.sectionTitle}>
              🍴 All Dishes{" "}
              <Text style={styles.foundBadge}> {filtered.length} found</Text>
            </Text>
          </View>
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/3448/3448609.png" }}
                style={{ width: 52, height: 52, tintColor: "#CBD5E1", marginBottom: 12 }}
              />
              <Text style={styles.emptyTitle}>No dishes found.</Text>
              <Text style={styles.emptySub}>Try a different filter or search.</Text>
            </View>
          ) : (
            filtered.map((card) => (
              <FoodCard
                key={card.id}
                card={card}
                onPress={() => setSelectedCard(card)}
              />
            ))
          )}
        </View>

        {/* ── FOOTER ── */}
        <View style={styles.footer}>
          <View style={[styles.row, { marginBottom: 14 }]}>
            <View style={styles.footerBrand}>
              <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/3448/3448609.png" }}
                style={{ width: 22, height: 22, tintColor: "white" }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.footerBrandName}>ForkDash</Text>
              <Text style={styles.footerTagline}>
                Delivered with love 🧡 London, UK
              </Text>
            </View>
          </View>
          <View style={styles.footerLinks}>
            {[
              "About Us",
              "Careers",
              "Partner with Us",
              "Help Centre",
              "Privacy Policy",
              "Terms of Service",
            ].map((link) => (
              <Text key={link} style={styles.footerLink}>
                {link}
              </Text>
            ))}
          </View>
          <View style={[styles.row, { gap: 10, marginBottom: 16 }]}>
            {["🍎 App Store", "🤖 Google Play"].map((b) => (
              <TouchableOpacity key={b} style={styles.appBadge}>
                <Text style={styles.appBadgeText}>{b}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={[
              styles.row,
              {
                borderTopWidth: 1,
                borderTopColor: "#1E293B",
                paddingTop: 14,
              },
            ]}
          >
            <Text style={styles.copyright}>© 2026 ForkDash Ltd</Text>
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* ── BOTTOM NAV ── */}
      <View style={styles.bottomNav}>
        {[
          {
            icon: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
            label: "Home",
            active: true,
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/622/622669.png",
            label: "Explore",
            active: false,
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/1450/1450071.png",
            label: "Orders",
            active: false,
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
            label: "Saved",
            active: false,
          },
          {
            icon: "https://cdn-icons-png.flaticon.com/512/1077/1077063.png",
            label: "Profile",
            active: false,
          },
        ].map((item) => (
          <TouchableOpacity key={item.label} style={styles.navItem}>
            <Image
              source={{ uri: item.icon }}
              style={{
                width: 22,
                height: 22,
                tintColor: item.active ? "#F97316" : "#CBD5E1",
              }}
            />
            <Text
              style={[
                styles.navLabel,
                { color: item.active ? "#F97316" : "#CBD5E1" },
              ]}
            >
              {item.label}
            </Text>
            {item.active && <View style={styles.navDot} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ─── DETAIL PAGE STYLES ───────────────────────────────────────────────────────
const detailStyles = StyleSheet.create({
  heroImgWrap: {
    height: 300,
    position: "relative",
    backgroundColor: "#1E293B",
  },
  heroImg: {
    width: "100%",
    height: "100%",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
  },
  backBtnText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 24,
  },
  likeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  dotsRow: {
    position: "absolute",
    bottom: 14,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  tagBadge: {
    position: "absolute",
    bottom: 14,
    left: 14,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    color: "white",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  thumbStrip: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  thumbActive: {
    borderColor: "#F97316",
  },
  infoSection: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 32,
    elevation: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantLabel: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    flex: 1,
  },
  foodName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.5,
    marginTop: 4,
    marginBottom: 18,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 22,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  statIcon: {
    width: 22,
    height: 22,
    marginBottom: 4,
  },
  statVal: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0F172A",
  },
  statSub: {
    fontSize: 9,
    color: "#94A3B8",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  descText: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
    fontWeight: "500",
    marginBottom: 24,
  },
  priceQtyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  priceSub: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "600",
  },
  priceVal: {
    fontSize: 24,
    fontWeight: "900",
    color: "#F97316",
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 22,
  },
  qtyVal: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0F172A",
    minWidth: 28,
    textAlign: "center",
  },
  addCartBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F97316",
    borderRadius: 16,
    paddingVertical: 16,
    elevation: 6,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  addCartText: {
    color: "white",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});

// ─── DROPDOWN STYLES ─────────────────────────────────────────────────────────
const dropStyles = StyleSheet.create({
  wrap: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  triggerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  triggerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  triggerIcon: {
    width: 20,
    height: 20,
  },
  triggerLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  triggerSub: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "600",
    marginTop: 1,
  },
  chevron: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "700",
  },
  panel: {
    overflow: "hidden",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  sectionHead: {
    fontSize: 9,
    color: "#94A3B8",
    fontWeight: "800",
    letterSpacing: 1.5,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 6,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 9,
    gap: 10,
  },
  optionActive: {
    backgroundColor: "#FFFBF7",
  },
  optionIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  optionIcon: {
    width: 18,
    height: 18,
  },
  optionLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
  },
  checkDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },
});

// ─── MAIN STYLES ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // ── Drawer ──
  drawerOverlay: {
    flex: 1,
    flexDirection: "row",
  },
  drawerBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  drawerPanel: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: "#FFFFFF",
    elevation: 24,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    flexDirection: "column",
  },
  drawerHeader: {
    backgroundColor: "#0F172A",
    padding: 20,
    paddingTop: 50,
  },
  drawerBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 12,
  },
  drawerBrandIcon: {
    width: 42,
    height: 42,
    backgroundColor: "#F97316",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerBrandName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  drawerBrandSub: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "600",
  },
  drawerUserCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  drawerAvatar: {
    width: 44,
    height: 44,
    backgroundColor: "#F97316",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerUserName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  drawerUserEmail: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "500",
    marginTop: 1,
  },
  drawerProBadge: {
    backgroundColor: "#F97316",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: "auto",
  },
  drawerProText: {
    fontSize: 9,
    fontWeight: "900",
    color: "white",
    letterSpacing: 1,
  },
  drawerMenuSection: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 8,
    flex: 1,
  },
  drawerSectionLabel: {
    fontSize: 9,
    color: "#94A3B8",
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  drawerMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    marginBottom: 2,
  },
  drawerMenuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerMenuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  drawerFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  drawerLogout: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FFF1F2",
    borderRadius: 12,
  },
  drawerLogoutText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#EF4444",
  },

  // ── Navbar ──
  navbar: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  navLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  hamburgerBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
  },
  hamburgerLine: {
    width: 22,
    height: 2.5,
    backgroundColor: "#0F172A",
    borderRadius: 2,
  },
  deliveringLabel: {
    fontSize: 10,
    color: "#F97316",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginRight: 2,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0F172A",
    marginTop: 1,
  },
  cartBtn: {
    backgroundColor: "#FFF7ED",
    borderRadius: 12,
    padding: 9,
    marginRight: 10,
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#EF4444",
    borderRadius: 9,
    width: 17,
    height: 17,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  cartBadgeText: { color: "white", fontSize: 9, fontWeight: "900" },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F97316",
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Active Category Bar ──
  activeCatBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFF7ED",
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  activeCatText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#EA580C",
  },
  clearCatBtn: {
    backgroundColor: "#F97316",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  clearCatText: {
    fontSize: 10,
    fontWeight: "800",
    color: "white",
  },

  // ── Hero ──
  hero: {
    backgroundColor: "#0F172A",
    padding: 20,
    paddingBottom: 30,
    overflow: "hidden",
    position: "relative",
  },
  heroBgCircle1: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(249,115,22,0.10)",
  },
  heroBgCircle2: {
    position: "absolute",
    bottom: -60,
    left: -20,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(251,191,36,0.05)",
  },
  heroGreeting: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "600",
    marginBottom: 5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 30,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  heroSub: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "500",
    marginBottom: 16,
  },
  promoPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(249,115,22,0.13)",
    borderWidth: 1,
    borderColor: "rgba(249,115,22,0.28)",
    borderRadius: 30,
    paddingHorizontal: 13,
    paddingVertical: 7,
    alignSelf: "flex-start",
  },
  promoText: {
    fontSize: 11,
    color: "#FDBA74",
    fontWeight: "600",
  },
  heroFoodImg: {
    position: "absolute",
    right: 10,
    top: 14,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "rgba(249,115,22,0.4)",
  },

  // ── Search ──
  searchBar: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  searchInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchTextInput: {
    flex: 1,
    fontSize: 13,
    color: "#1E293B",
    fontWeight: "500",
  },
  filterIconBtn: {
    backgroundColor: "#F97316",
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#F97316",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },

  // ── Sections ──
  sectionHeader: {
    paddingHorizontal: 12,
    marginBottom: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#0F172A",
  },
  seeAll: {
    fontSize: 11,
    color: "#F97316",
    fontWeight: "700",
  },

  // ── Horizontal Categories ──
  catBtn: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 11,
    minWidth: 70,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  catBtnActive: {
    backgroundColor: "#F97316",
    elevation: 6,
    shadowColor: "#F97316",
    shadowOpacity: 0.45,
  },
  catBtnImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  catLabel: {
    fontSize: 9,
    fontWeight: "800",
  },

  // ── Featured ──
  featuredCard: {
    minWidth: 165,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
  },
  featuredImg: {
    width: "100%",
    height: 110,
  },
  featuredTag: {
    position: "absolute",
    top: 88,
    left: 8,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  featuredTagText: {
    color: "white",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  featuredRestaurant: {
    fontSize: 8,
    color: "#94A3B8",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 1,
  },
  featuredFoodName: {
    fontSize: 12,
    fontWeight: "900",
    color: "#0F172A",
    marginBottom: 6,
  },
  featuredRating: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F172A",
    marginLeft: 2,
  },
  featuredPrice: {
    fontSize: 13,
    fontWeight: "900",
    color: "#F97316",
  },

  // ── Food Card ──
  foodCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 14,
  },
  cardImageArea: {
    height: 200,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#E2E8F0",
  },
  imgGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  tagBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    color: "white",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  likeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  arrowBtn: {
    position: "absolute",
    top: "50%",
    marginTop: -15,
    backgroundColor: "rgba(255,255,255,0.88)",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    fontSize: 18,
    color: "#0F172A",
    fontWeight: "700",
    lineHeight: 22,
  },
  dotsRow: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  tapHint: {
    position: "absolute",
    bottom: 10,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  tapHintText: {
    fontSize: 9,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "700",
  },

  // Card Body
  cardBody: {
    padding: 12,
    paddingBottom: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantLabel: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -0.3,
    flex: 1,
    paddingRight: 6,
  },
  priceBox: {
    backgroundColor: "#FFF7ED",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  priceText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#F97316",
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
    position: "relative",
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statValue: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0F172A",
  },
  statLabel: {
    fontSize: 9,
    color: "#94A3B8",
    fontWeight: "600",
  },
  statDivider: {
    position: "absolute",
    right: 0,
    top: "10%",
    bottom: "10%",
    width: 1,
    backgroundColor: "#E2E8F0",
  },

  // View Restaurant CTA
  viewRestBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F172A",
    borderRadius: 14,
    paddingVertical: 12,
    elevation: 2,
  },
  viewRestText: {
    color: "white",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  // Veg badge
  vegBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1.5,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  vegDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  vegText: {
    fontSize: 9,
    fontWeight: "800",
  },

  // Empty
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    color: "#94A3B8",
    fontWeight: "700",
    fontSize: 14,
  },
  emptySub: {
    color: "#CBD5E1",
    fontSize: 12,
    marginTop: 4,
  },

  // Found badge
  foundBadge: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "600",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },

  // Footer
  footer: {
    backgroundColor: "#0F172A",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderTopWidth: 4,
    borderTopColor: "#F97316",
  },
  footerBrand: {
    width: 40,
    height: 40,
    backgroundColor: "#F97316",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  footerBrandName: {
    fontSize: 18,
    fontWeight: "900",
    color: "white",
    letterSpacing: -0.3,
  },
  footerTagline: {
    fontSize: 10,
    color: "#475569",
    fontWeight: "600",
  },
  footerLinks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  footerLink: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    width: "45%",
    marginBottom: 3,
  },
  appBadge: {
    flex: 1,
    backgroundColor: "#1E293B",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: "center",
  },
  appBadgeText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "700",
  },
  copyright: {
    fontSize: 9,
    color: "#334155",
    fontWeight: "600",
  },

  // Bottom Nav
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.97)",
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  navItem: {
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  navLabel: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  navDot: {
    width: 4,
    height: 4,
    backgroundColor: "#F97316",
    borderRadius: 2,
  },
});