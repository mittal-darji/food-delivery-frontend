import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileCard from '../components/ProfileCard';
import { resetProfile } from '../state/ProfileSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const COLORS = {
  primary: '#fac60b',
  primaryDark: '#c49900',
  ink: '#11072b',
  navy: '#170b35',
  muted: '#94A3B8',
  white: '#FFFFFF',
  border: '#EDF0F4',
  surface: '#F8F9FB',
  red: '#EF4444',
  redLight: '#FEE2E2',
};

const SETTINGS = [
  {
    section: 'Account',
    items: [
      {
        icon: 'notifications-outline',
        label: 'Notifications',
        color: '#3B82F6',
        route: 'Notifications',
      },
      {
        icon: 'location-outline',
        label: 'Saved Addresses',
        color: '#10B981',
        route: 'Addresses',
      },
      {
        icon: 'card-outline',
        label: 'Payment Methods',
        color: '#8B5CF6',
        route: 'Payments',
      },
    ],
  },
  {
    section: 'Support',
    items: [
      {
        icon: 'help-circle-outline',
        label: 'Help & FAQ',
        color: '#F5C518',
        route: 'Help',
      },
      {
        icon: 'message-reply-text',
        label: 'Send Feedback',
        color: '#10B981',
        route: 'Feedback',
      },
      {
        icon: 'shield-checkmark-outline',
        label: 'Privacy Policy',
        color: '#6366F1',
        route: 'Privacy',
      },
    ],
  },
];

function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useAppDispatch();

  // ── Read full profile from Redux (including avatar updated in EditProfile) ──
  const profile = useAppSelector((state: any) => state.profile);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          dispatch(resetProfile());
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Icon name="chevron-back" size={22} color={COLORS.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card — avatar is now passed from Redux state */}
        <ProfileCard
          name={profile.name}
          email={profile.email}
          phone={profile.phone}
          isPro={profile.isPro}
          stats={profile.stats}
          avatar={profile.avatar ?? null} // ← this is the key line
          onEditPress={() => navigation.navigate('EditProfile')}
        />

        {/* Settings Sections */}
        {SETTINGS.map(section => (
          <View key={section.section} style={styles.section}>
            <Text style={styles.sectionLabel}>
              {section.section.toUpperCase()}
            </Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, index) => (
                <React.Fragment key={item.label}>
                  <TouchableOpacity
                    style={styles.settingRow}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate(item.route)}
                  >
                    <View
                      style={[
                        styles.settingIconWrap,
                        { backgroundColor: item.color + '18' },
                      ]}
                    >
                      <Icon name={item.icon} size={18} color={item.color} />
                    </View>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Icon name="chevron-forward" size={16} color="#CBD5E1" />
                  </TouchableOpacity>
                  {index < section.items.length - 1 && (
                    <View style={styles.rowDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutBtn}
            activeOpacity={0.8}
            onPress={handleLogout}
          >
            <Icon name="log-out-outline" size={18} color={COLORS.red} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.ink,
    letterSpacing: -0.3,
  },
  scroll: {
    paddingBottom: 16,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionLabel: {
    fontSize: 9,
    color: COLORS.muted,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  sectionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  settingIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.ink,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 64,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    backgroundColor: COLORS.redLight,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.red,
  },
});

export default ProfileScreen;
