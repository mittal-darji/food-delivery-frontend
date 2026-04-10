import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from 'react-native';
import Svg, { Line, Polyline, Circle, Path, Polygon } from 'react-native-svg';

const C = {
  primary: '#F5C518',
  primaryLight: '#FEFDDF',
  primaryMid: '#FEF9DC',
  primaryDark: '#C49A00',
  slate: '#4A5568',
  muted: '#AAAAAA',
  border: '#EAEAE6',
  white: '#FFFFFF',
  black: '#222222',
};

// ── SVG Icons ────────────────────────────────────────────────
const IconFilter = ({ color = '#555' }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Line x1="4" y1="6" x2="20" y2="6" />
    <Line x1="7" y1="12" x2="17" y2="12" />
    <Line x1="10" y1="18" x2="14" y2="18" />
  </Svg>
);

const IconTag = ({ color = '#555' }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <Circle cx="7" cy="7" r="1.2" fill={color} stroke="none" />
  </Svg>
);

const IconLeaf = ({ color = '#555' }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M2 22c5-5 8-10 8-14a8 8 0 0 1 16 0" />
    <Path d="M12 8c0 4-2 9-10 14" />
  </Svg>
);

const IconClock = ({ color = '#555' }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Circle cx="12" cy="12" r="10" />
    <Polyline points="12 6 12 12 16 14" />
  </Svg>
);

const IconPin = ({ color = '#555' }) => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="10" r="3" />
  </Svg>
);

const IconStar = ({ color = '#555' }) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Svg>
);

const IconTrend = ({ color = '#555' }) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <Polyline points="17 6 23 6 23 12" />
  </Svg>
);

const IconDollar = ({ color = '#555' }) => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Line x1="12" y1="1" x2="12" y2="23" />
    <Path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </Svg>
);

const IconCheck = () => (
  <Svg
    width={9}
    height={9}
    viewBox="0 0 12 12"
    fill="none"
    stroke="#333"
    strokeWidth={2.5}
    strokeLinecap="round"
  >
    <Polyline points="2,6 5,9 10,3" />
  </Svg>
);

const IconChevron = ({ color = '#9a7800' }) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.5}
    strokeLinecap="round"
  >
    <Polyline points="6 9 12 15 18 9" />
  </Svg>
);

// ── Data ─────────────────────────────────────────────────────
const FILTER_OPTIONS = [
  { id: 'all', label: 'All restaurants', Icon: IconFilter },
  { id: 'offers', label: 'Has offers', Icon: IconTag },
  { id: 'veg', label: 'Veg only', Icon: IconLeaf },
  { id: 'fast', label: 'Under 20 min', Icon: IconClock },
  { id: 'nearby', label: 'Nearby', Icon: IconPin },
];

const SORT_OPTIONS = [
  { id: 'default', label: 'Recommended', Icon: IconStar },
  { id: 'rating', label: 'Top rated', Icon: IconTrend },
  { id: 'time', label: 'Fastest', Icon: IconClock },
  { id: 'price', label: 'Price', Icon: IconDollar },
];

// ── Component ────────────────────────────────────────────────
interface Props {
  activeFilter: string;
  setActiveFilter: (v: string) => void;
  activeSort: string;
  setActiveSort: (v: string) => void;
}

export default function FilterSortBar({
  activeFilter,
  setActiveFilter,
  activeSort,
  setActiveSort,
}: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [layout, setLayout] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const filterBtnRef = useRef<View>(null);
  const chevronAnim = useRef(new Animated.Value(0)).current;

  const activeF = FILTER_OPTIONS.find(f => f.id === activeFilter)!;

  useEffect(() => {
    Animated.timing(chevronAnim, {
      toValue: dropdownOpen ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [dropdownOpen]);

  const chevronRotate = chevronAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const openDropdown = () => {
    filterBtnRef.current?.measureInWindow((x, y, w, h) => {
      setLayout({ x, y, w, h });
      setDropdownOpen(true);
    });
  };

  return (
    <View style={S.container}>
      {/* ── Filter ── */}
      <Text style={S.sectionLabel}>FILTER</Text>
      <View
        ref={filterBtnRef}
        collapsable={false}
        style={{ alignSelf: 'flex-start', marginBottom: 18 }}
      >
        <TouchableOpacity
          style={S.filterBtn}
          onPress={openDropdown}
          activeOpacity={0.85}
        >
          <activeF.Icon color="#333" />
          <Text style={S.filterBtnLabel}>{activeF.label}</Text>
          {activeFilter !== 'all' && (
            <View style={S.badge}>
              <Text style={S.badgeText}>1</Text>
            </View>
          )}
          <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
            <IconChevron />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* ── Sort ── */}
      <Text style={S.sectionLabel}>SORT BY</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={S.chips}
      >
        {SORT_OPTIONS.map(opt => {
          const isActive = activeSort === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              style={[S.chip, isActive && S.chipActive]}
              onPress={() => setActiveSort(opt.id)}
              activeOpacity={0.8}
            >
              <opt.Icon color={isActive ? C.black : C.slate} />
              <Text style={[S.chipLabel, isActive && S.chipLabelActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Dropdown Modal ── */}
      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDropdownOpen(false)}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>

        <View
          style={[
            S.dropdown,
            {
              top: layout.y + layout.h + 8,
              left: layout.x,
              minWidth: Math.max(layout.w, 230),
            },
          ]}
        >
          {FILTER_OPTIONS.map((opt, idx) => {
            const isActive = activeFilter === opt.id;
            const isLast = idx === FILTER_OPTIONS.length - 1;
            return (
              <View key={opt.id}>
                <TouchableOpacity
                  style={[S.dropdownItem, isActive && S.dropdownItemActive]}
                  onPress={() => {
                    setActiveFilter(opt.id);
                    setDropdownOpen(false);
                  }}
                  activeOpacity={0.75}
                >
                  <opt.Icon color={isActive ? C.primaryDark : '#666'} />
                  <Text
                    style={[S.dropdownLabel, isActive && S.dropdownLabelActive]}
                  >
                    {opt.label}
                  </Text>
                  {isActive && (
                    <View style={S.checkCircle}>
                      <IconCheck />
                    </View>
                  )}
                </TouchableOpacity>
                {!isLast && <View style={S.divider} />}
              </View>
            );
          })}
        </View>
      </Modal>
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────
const S = StyleSheet.create({
  container: {
    backgroundColor: C.white,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: C.muted,
    letterSpacing: 1,
    marginBottom: 10,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: C.primary,
    borderRadius: 40,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  filterBtnLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#222',
  },
  badge: {
    backgroundColor: C.primaryDark,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
  },
  badgeText: {
    color: C.white,
    fontSize: 10,
    fontWeight: '800',
  },
  chips: {
    gap: 7,
    paddingRight: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 30,
    paddingHorizontal: 13,
    paddingVertical: 8,
    backgroundColor: C.white,
  },
  chipActive: {
    backgroundColor: C.primary,
    borderColor: C.primaryDark,
  },
  chipLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: C.slate,
  },
  chipLabelActive: {
    color: "black",
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: C.white,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: C.border,
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    zIndex: 9999,
    overflow: 'hidden',
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 10,
  },
  dropdownItemActive: {
    backgroundColor: C.primaryMid,
  },
  dropdownLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: C.slate,
  },
  dropdownLabelActive: {
    color: C.primaryDark,
  },
  divider: {
    height: 0.5,
    backgroundColor: C.border,
    marginHorizontal: 4,
  },
  checkCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: C.primary,
    borderWidth: 1.5,
    borderColor: C.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
