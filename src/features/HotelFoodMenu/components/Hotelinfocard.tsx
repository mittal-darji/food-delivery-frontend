import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { C, HotelData, Stars, VegLabel, sharedStyles } from './Uiatoms';

interface HotelInfoCardProps {
  hotel: HotelData;
}

const HotelInfoCard = ({ hotel }: HotelInfoCardProps) => (
  <View style={styles.infoCard}>
    {/* ── Header row ── */}
    <View style={[sharedStyles.row, { marginBottom: 12 }]}>
      <Image source={{ uri: hotel.logo }} style={styles.logo} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.hotelName}>{hotel.name}</Text>
        <Text style={styles.cuisine}>{hotel.cuisine}</Text>
        <View style={[sharedStyles.row, { gap: 6, marginTop: 5 }]}>
          <Stars rating={hotel.rating} />
          <Text style={styles.ratingText}>{hotel.rating}</Text>
          <Text style={styles.reviewText}>({hotel.reviews})</Text>
        </View>
      </View>
      <VegLabel isVeg={hotel.isVeg} />
    </View>

    {/* ── Location row ── */}
    <View style={[sharedStyles.row, { gap: 8, marginBottom: 14, padding: 10, backgroundColor: C.borderLight, borderRadius: 10 }]}>
      <Ionicons name="location-sharp" size={15} color={C.red} />
      <Text style={styles.locationText} numberOfLines={1}>
        {hotel.location}
      </Text>
    </View>

    {/* ── Stats row ── */}
    <View style={styles.statsRow}>
      {[
        {
          icon: <Ionicons name="star" size={15} color={C.primaryDark} />,
          val: String(hotel.rating),
          label: 'Rating',
        },
        {
          icon: <MaterialIcons name="rate-review" size={15} color={C.primaryDark} />,
          val: String(hotel.reviews),
          label: 'Reviews',
        },
        {
          icon: <MaterialIcons name="delivery-dining" size={15} color={C.primaryDark} />,
          val: hotel.deliveryTime,
          label: 'Delivery',
        },
        {
          icon: <Ionicons name="navigate-circle" size={15} color={C.primaryDark} />,
          val: hotel.distance,
          label: 'Distance',
        },
        {
          icon: <Ionicons name="pricetag" size={14} color={C.primaryDark} />,
          val: `₹${hotel.startingPrice}`,
          label: 'From',
        },
      ].map((s, i) => (
        <View key={s.label} style={[styles.statItem, i < 4 && styles.statBorder]}>
          {s.icon}
          <Text style={styles.statVal}>{s.val}</Text>
          <Text style={styles.statLabel}>{s.label}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  infoCard: { marginTop: 0, margin: 14, padding: 10, elevation: 5 },
  logo: { width: 60, height: 60, borderRadius: 14, backgroundColor: C.border },
  hotelName: { fontSize: 20, fontWeight: '800', color: C.ink },
  cuisine: { fontSize: 13, color: C.muted, fontWeight: '500', marginTop: 2 },
  ratingText: { fontSize: 14, fontWeight: '700', color: C.ink },
  reviewText: { fontSize: 13, color: C.muted },
  locationText: { fontSize: 13, fontWeight: '600', color: C.slate, flex: 1 },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: C.primaryLight,
    borderRadius: 14,
    overflow: 'hidden',
  },
  statItem: { flex: 1, alignItems: 'center', paddingVertical: 10, gap: 2 },
  statBorder: { borderRightWidth: 1, borderRightColor: C.primaryMid },
  statVal: { fontSize: 11, fontWeight: '800', color: C.ink },
  statLabel: { fontSize: 10, color: C.muted, fontWeight: '600' },
});

export default HotelInfoCard;