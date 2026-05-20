import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const COLORS = {
  primary: '#fac60b',
  primaryDark: '#c49900',
  ink: '#11072b',
  muted: '#94A3B8',
  white: '#FFFFFF',
  border: '#EDF0F4',
  surface: '#F8F9FB',
};

// ── Initials helper ────────────────────────────────────────────────────────────
function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0]?.[0]?.toUpperCase() ?? '?';
}

// ── StatItem ──────────────────────────────────────────────────────────────────
interface StatItemProps {
  label: string;
  value: number;
  iconName: string;
  iconColor: string;
}

const StatItem = ({ label, value, iconName, iconColor }: StatItemProps) => (
  <View style={styles.statItem}>
    <View style={[styles.statIconWrap, { backgroundColor: iconColor + '18' }]}>
      <Icon name={iconName} size={18} color={iconColor} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ── ProfileCard ───────────────────────────────────────────────────────────────
interface ProfileCardProps {
  name: string;
  email: string;
  phone: string;
  isPro: boolean;
  avatar?: string | null;
  stats: { orders: number; wishlist: number; cart: number };
  onEditPress: () => void;
}

function ProfileCard({
  name,
  email,
  phone,
  isPro,
  avatar,
  stats,
  onEditPress,
}: ProfileCardProps) {
  const [photoVisible, setPhotoVisible] = useState(false);

  return (
    <View style={styles.card}>
      {/* ── Avatar ── */}
      <View style={styles.avatarWrap}>
        <TouchableOpacity
          activeOpacity={avatar ? 0.8 : 1}
          onPress={() => avatar && setPhotoVisible(true)}
          disabled={!avatar}
        >
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
            </View>
          )}
        </TouchableOpacity>

        {isPro && (
          <View style={styles.proBadge}>
            <Text style={styles.proBadgeText}>PRO</Text>
          </View>
        )}
      </View>

      {/* Name & contact */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <View style={styles.phoneRow}>
        <Icon name="call-outline" size={13} color={COLORS.muted} />
        <Text style={styles.phone}>{phone}</Text>
      </View>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.editBtn}
        activeOpacity={0.8}
        onPress={onEditPress}
      >
        <Icon name="pencil-outline" size={15} color={COLORS.ink} />
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Stats */}
      <View style={styles.statsRow}>
        <StatItem
          label="Orders"
          value={stats.orders}
          iconName="receipt-outline"
          iconColor="#3B82F6"
        />
        <View style={styles.statDivider} />
        <StatItem
          label="Wishlist"
          value={stats.wishlist}
          iconName="heart-outline"
          iconColor="#EC4899"
        />
        <View style={styles.statDivider} />
        <StatItem
          label="Cart"
          value={stats.cart}
          iconName="cart-outline"
          iconColor="#8B5CF6"
        />
      </View>

      {/* ── Full-screen photo modal ── */}
      <Modal
        visible={photoVisible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setPhotoVisible(false)}
      >
        <StatusBar
          backgroundColor="rgba(0,0,0,0.95)"
          barStyle="light-content"
        />

        {/* Dark backdrop — tap anywhere to close */}
        <TouchableWithoutFeedback onPress={() => setPhotoVisible(false)}>
          <View style={styles.modalBackdrop}>
            {/* Close button */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setPhotoVisible(false)}
              activeOpacity={0.8}
            >
              <Icon name="close" size={22} color={COLORS.white} />
            </TouchableOpacity>

            {/* Full-size image — stop propagation so tapping image doesn't close */}
            <TouchableWithoutFeedback>
              <View style={styles.modalImageWrap}>
                <Image
                  source={{ uri: avatar! }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Avatar
  avatarWrap: {
    position: 'relative',
    marginBottom: 14,
  },
  avatarImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(245,197,24,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  avatarInitials: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  proBadge: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  proBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.ink,
    letterSpacing: 1,
  },

  // Text
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.4,
  },
  email: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: '500',
    marginTop: 3,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  phone: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '500',
  },

  // Edit button
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 9,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.ink,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.ink,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.muted,
    fontWeight: '600',
  },

  // ── Modal ──
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    position: 'absolute',
    top: 52,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalImageWrap: {
    width: SCREEN_W,
    height: SCREEN_W, // square crop for portrait photos
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    width: SCREEN_W,
    height: SCREEN_W,
  },
});

export default ProfileCard;
