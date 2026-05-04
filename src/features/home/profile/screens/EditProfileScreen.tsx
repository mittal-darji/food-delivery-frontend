import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Animated,
  Alert,
  Image,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MapPinIcon } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../store';
import { updateProfile } from '../state/ProfileSlice';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';

// ─── Design Tokens ────────────────────────────────────────────────────────────
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
  inputBg: '#F1F5F9',
  labelColor: '#64748B',
  dividerLine: '#CBD5E1',
};

// ─── Icon map (outside component — never re-created) ──────────────────────────
const ICON_MAP: Record<string, string> = {
  user: 'person-outline',
  email: 'mail-outline',
  phone: 'call-outline',
};

// ─── InputField (declared at module level — NOT inside another component) ─────
interface InputFieldProps {
  label: string;
  placeholder: string;
  icon: string;
  value: string;
  onChangeText: (v: string) => void;
  keyboardType?: any;
  autoCapitalize?: any;
}

const InputField = React.memo(function InputField({
  label,
  placeholder,
  icon,
  value,
  onChangeText,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={profile_inputGroup}>
      <Text style={profile_inputLabel}>{label}</Text>
      <View
        style={[
          profile_inputContainer,
          focused ? profile_inputContainerFocused : null,
        ]}
      >
        <Icon
          name={ICON_MAP[icon] ?? icon}
          size={16}
          color={focused ? COLORS.primary : COLORS.muted}
          style={{ marginRight: 10 }}
        />
        <TextInput
          style={profile_input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.muted}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
    </View>
  );
});

// ─── SectionDivider (module level) ───────────────────────────────────────────
const SectionDivider = React.memo(function SectionDivider({
  label,
}: {
  label: string;
}) {
  return (
    <View style={profile_dividerRow}>
      <View style={profile_dividerLine} />
      <Text style={profile_dividerLabel}>{label}</Text>
      <View style={profile_dividerLine} />
    </View>
  );
});

// ─── Helper: get initials (pure function, outside component) ──────────────────
function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0]?.[0]?.toUpperCase() ?? '?';
}

// ─── Camera Permission Helper ─────────────────────────────────────────────────
async function requestCameraPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera to take a photo.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch {
      return false;
    }
  }
  // iOS — react-native-image-picker handles permission automatically
  return true;
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
function EditProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: any) => state.profile);

  // ── State (all hooks at top level, unconditionally) ───────────────────────
  const [fullName, setFullName] = useState<string>(profile.name ?? '');
  const [email, setEmail] = useState<string>(profile.email ?? '');
  const [phone, setPhone] = useState<string>(profile.phone ?? '');
  const [locationState, setLocationState] = useState<string>(
    profile.state ?? '',
  );
  const [city, setCity] = useState<string>(profile.city ?? '');
  const [avatar, setAvatar] = useState<string | null>(profile.avatar ?? null);
  const [uploadingPhoto, setUploadingPhoto] = useState<boolean>(false);

  const saveAnim = useRef(new Animated.Value(0)).current;

  // ── Detect changes ────────────────────────────────────────────────────────
  const hasChanges =
    fullName !== (profile.name ?? '') ||
    email !== (profile.email ?? '') ||
    phone !== (profile.phone ?? '') ||
    locationState !== (profile.state ?? '') ||
    city !== (profile.city ?? '') ||
    avatar !== (profile.avatar ?? null);

  // ── Animate save button ───────────────────────────────────────────────────
  useEffect(() => {
    Animated.spring(saveAnim, {
      toValue: hasChanges ? 1 : 0,
      useNativeDriver: true,
      tension: 160,
      friction: 12,
    }).start();
  }, [hasChanges]);

  // ── Photo picker ──────────────────────────────────────────────────────────
  const handlePhotoPress = () => {
    const buttons: any[] = [
      { text: 'Take Photo', onPress: openCamera },
      { text: 'Choose from Gallery', onPress: openGallery },
    ];
    if (avatar) {
      buttons.push({
        text: 'Remove Photo',
        style: 'destructive',
        onPress: () => setAvatar(null),
      });
    }
    buttons.push({ text: 'Cancel', style: 'cancel' });
    Alert.alert('Profile Photo', 'Choose an option', buttons);
  };

  const openGallery = () => {
    setUploadingPhoto(true);
    launchImageLibrary(
      { mediaType: 'photo' as MediaType, quality: 0.8, selectionLimit: 1 },
      (response: ImagePickerResponse) => {
        setUploadingPhoto(false);
        if (response.didCancel || response.errorCode) {
          return;
        }
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setAvatar(uri);
        }
      },
    );
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Camera Permission Denied',
        'Please enable camera access in your device Settings to take a photo.',
        [{ text: 'OK' }],
      );
      return;
    }
    setUploadingPhoto(true);
    launchCamera(
      { mediaType: 'photo' as MediaType, quality: 0.8, saveToPhotos: false },
      (response: ImagePickerResponse) => {
        setUploadingPhoto(false);
        if (response.didCancel || response.errorCode) {
          return;
        }
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setAvatar(uri);
        }
      },
    );
  };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert('Validation', 'Full name cannot be empty.');
      return;
    }
    dispatch(
      updateProfile({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        state: locationState.trim(),
        city: city.trim(),
        avatar,
      }),
    );
    navigation.goBack();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={profile_safe}>
      {/* Header — Save button removed */}
      <View style={profile_header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={profile_backBtn}
        >
          <Icon name="chevron-back" size={22} color={COLORS.ink} />
        </TouchableOpacity>

        <Text style={profile_headerTitle}>Edit Profile</Text>

        {/* Spacer to keep title centered */}
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={profile_scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar Section */}
        <View style={profile_avatarSection}>
          <TouchableOpacity
            style={profile_avatarWrapper}
            onPress={handlePhotoPress}
            activeOpacity={0.85}
          >
            {avatar ? (
              <Image source={{ uri: avatar }} style={profile_avatarImage} />
            ) : (
              <View style={profile_avatarFallback}>
                <Text style={profile_avatarInitials}>
                  {getInitials(fullName || 'U')}
                </Text>
              </View>
            )}

            {uploadingPhoto && (
              <View style={profile_avatarOverlay}>
                <ActivityIndicator size="small" color={COLORS.white} />
              </View>
            )}

            <View style={profile_cameraBadge}>
              <Icon name="camera" size={13} color={COLORS.ink} />
            </View>
          </TouchableOpacity>

          <Text style={profile_avatarHintText}>Tap photo to change</Text>

          {/* Quick pill buttons */}
          <View style={profile_photoPills}>
            <TouchableOpacity
              style={profile_photoPill}
              onPress={openGallery}
              activeOpacity={0.75}
            >
              <Icon
                name="images-outline"
                size={13}
                color={COLORS.primaryDark}
              />
              <Text style={profile_photoPillText}>Gallery</Text>
            </TouchableOpacity>

            {/* Camera pill — requests permission then opens camera directly */}
            <TouchableOpacity
              style={profile_photoPill}
              onPress={openCamera}
              activeOpacity={0.75}
            >
              <Icon
                name="camera-outline"
                size={13}
                color={COLORS.primaryDark}
              />
              <Text style={profile_photoPillText}>Camera</Text>
            </TouchableOpacity>

            {avatar !== null && (
              <TouchableOpacity
                style={[profile_photoPill, profile_photoPillRemove]}
                onPress={() => setAvatar(null)}
                activeOpacity={0.75}
              >
                <Icon name="trash-outline" size={13} color={COLORS.red} />
                <Text style={[profile_photoPillText, { color: COLORS.red }]}>
                  Remove
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={profile_formCard}>
          <InputField
            label="Full Name"
            placeholder="Your full name"
            icon="user"
            value={fullName}
            onChangeText={setFullName}
          />
          <InputField
            label="Email Address"
            placeholder="you@example.com"
            icon="email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <InputField
            label="Phone Number"
            placeholder="Phone number"
            icon="phone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <SectionDivider label="Location" />

          <View style={profile_rowFields}>
            {/* State */}
            <View style={profile_halfField}>
              <Text style={profile_inputLabel}>State</Text>
              <View style={profile_inputContainerHalf}>
                <MapPinIcon
                  size={16}
                  color={COLORS.muted}
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  style={profile_input}
                  placeholder="State"
                  placeholderTextColor={COLORS.muted}
                  value={locationState}
                  onChangeText={setLocationState}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* City */}
            <View style={profile_halfField}>
              <Text style={profile_inputLabel}>City</Text>
              <View style={profile_inputContainerHalf}>
                <MapPinIcon
                  size={16}
                  color={COLORS.muted}
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  style={profile_input}
                  placeholder="City"
                  placeholderTextColor={COLORS.muted}
                  value={city}
                  onChangeText={setCity}
                  autoCapitalize="words"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Save Button */}
        {hasChanges && (
          <Animated.View
            style={[
              profile_bottomBtnWrap,
              {
                opacity: saveAnim,
                transform: [
                  {
                    translateY: saveAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={profile_saveBtn}
              activeOpacity={0.85}
              onPress={handleSave}
            >
              <Icon
                name="checkmark-circle-outline"
                size={18}
                color={COLORS.ink}
                style={{ marginRight: 8 }}
              />
              <Text style={profile_saveBtnText}>Save Changes</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles (all prefixed profile_) ──────────────────────────────────────────
const profile_safe: any = {
  flex: 1,
  backgroundColor: COLORS.surface,
};

const profile_header: any = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingVertical: 14,
  backgroundColor: COLORS.white,
  borderBottomWidth: 1,
  borderBottomColor: COLORS.border,
};

const profile_backBtn: any = {
  width: 36,
  height: 36,
  borderRadius: 10,
  backgroundColor: COLORS.surface,
  alignItems: 'center',
  justifyContent: 'center',
};

const profile_headerTitle: any = {
  fontSize: 17,
  fontWeight: '800',
  color: COLORS.ink,
  letterSpacing: -0.3,
};

const profile_saveHeaderBtn: any = {
  paddingHorizontal: 16,
  paddingVertical: 7,
  backgroundColor: COLORS.primary,
  borderRadius: 10,
};

const profile_saveHeaderBtnText: any = {
  fontSize: 13,
  fontWeight: '800',
  color: COLORS.ink,
};

const profile_scroll: any = {
  paddingBottom: 16,
};

// Avatar
const profile_avatarSection: any = {
  alignItems: 'center',
  paddingTop: 28,
  paddingBottom: 24,
  gap: 10,
};

const profile_avatarWrapper: any = {
  width: 96,
  height: 96,
  borderRadius: 48,
  position: 'relative',
};

const profile_avatarImage: any = {
  width: 96,
  height: 96,
  borderRadius: 48,
  borderWidth: 3,
  borderColor: COLORS.primary,
};

const profile_avatarFallback: any = {
  width: 96,
  height: 96,
  borderRadius: 48,
  backgroundColor: COLORS.primary + '22',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 3,
  borderColor: COLORS.primary + '55',
};

const profile_avatarInitials: any = {
  fontSize: 32,
  fontWeight: '800',
  color: COLORS.primaryDark,
};

const profile_avatarOverlay: any = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: 48,
  backgroundColor: 'rgba(0,0,0,0.45)',
  alignItems: 'center',
  justifyContent: 'center',
};

const profile_cameraBadge: any = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 28,
  height: 28,
  borderRadius: 14,
  backgroundColor: COLORS.primary,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2.5,
  borderColor: COLORS.white,
};

const profile_avatarHintText: any = {
  fontSize: 12,
  color: COLORS.muted,
  fontWeight: '500',
};

const profile_photoPills: any = {
  flexDirection: 'row',
  gap: 8,
  marginTop: 2,
};

const profile_photoPill: any = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
  paddingHorizontal: 12,
  paddingVertical: 6,
  backgroundColor: COLORS.primary + '18',
  borderRadius: 20,
  borderWidth: 1,
  borderColor: COLORS.primary + '44',
};

const profile_photoPillRemove: any = {
  backgroundColor: COLORS.redLight,
  borderColor: '#FECACA',
};

const profile_photoPillText: any = {
  fontSize: 12,
  fontWeight: '700',
  color: COLORS.primaryDark,
};

// Form
const profile_formCard: any = {
  marginHorizontal: 16,
  backgroundColor: COLORS.white,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: COLORS.border,
  padding: 20,
  gap: 16,
};

const profile_inputGroup: any = {
  gap: 6,
};

const profile_inputLabel: any = {
  fontSize: 12,
  fontWeight: '700',
  color: COLORS.labelColor,
  letterSpacing: 0.3,
};

const profile_inputContainer: any = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: COLORS.inputBg,
  borderRadius: 12,
  paddingHorizontal: 14,
  paddingVertical: 11,
  borderWidth: 1.5,
  borderColor: 'transparent',
};

const profile_inputContainerFocused: any = {
  borderColor: COLORS.primary,
  backgroundColor: COLORS.white,
};

const profile_inputContainerHalf: any = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: COLORS.inputBg,
  borderRadius: 12,
  paddingHorizontal: 12,
  paddingVertical: 11,
  borderWidth: 1.5,
  borderColor: 'transparent',
};

const profile_input: any = {
  flex: 1,
  fontSize: 14,
  fontWeight: '600',
  color: COLORS.ink,
};

const profile_rowFields: any = {
  flexDirection: 'row',
  gap: 12,
};

const profile_halfField: any = {
  flex: 1,
  gap: 6,
};

const profile_dividerRow: any = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  marginVertical: 4,
};

const profile_dividerLine: any = {
  flex: 1,
  height: 1,
  backgroundColor: COLORS.border,
};

const profile_dividerLabel: any = {
  fontSize: 10,
  fontWeight: '800',
  color: COLORS.muted,
  letterSpacing: 1.2,
};

const profile_bottomBtnWrap: any = {
  marginHorizontal: 16,
  marginTop: 20,
};

const profile_saveBtn: any = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: COLORS.primary,
  borderRadius: 14,
  paddingVertical: 15,
  shadowColor: COLORS.primary,
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.35,
  shadowRadius: 12,
  elevation: 6,
};

const profile_saveBtnText: any = {
  fontSize: 15,
  fontWeight: '800',
  color: COLORS.ink,
  letterSpacing: -0.2,
};

export default EditProfileScreen;

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   TextInput,
//   Animated,
//   Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { MapPinIcon } from 'lucide-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// import { useAppDispatch, useAppSelector } from '../store';
// import { updateProfile } from '../state/ProfileSlice';
// import CameraPickerSection from '../Camerapickersection';

// // ─── Design Tokens ────────────────────────────────────────────────────────────
// const COLORS = {
//   primary: '#fac60b',
//   primaryDark: '#c49900',
//   ink: '#11072b',
//   navy: '#170b35',
//   muted: '#94A3B8',
//   white: '#FFFFFF',
//   border: '#EDF0F4',
//   surface: '#F8F9FB',
//   red: '#EF4444',
//   redLight: '#FEE2E2',
//   inputBg: '#F1F5F9',
//   labelColor: '#64748B',
//   dividerLine: '#CBD5E1',
// };

// // ─── Icon map (outside component — never re-created) ──────────────────────────
// const ICON_MAP: Record<string, string> = {
//   user: 'person-outline',
//   email: 'mail-outline',
//   phone: 'call-outline',
// };

// // ─── InputField (declared at module level — NOT inside another component) ─────
// interface InputFieldProps {
//   label: string;
//   placeholder: string;
//   icon: string;
//   value: string;
//   onChangeText: (v: string) => void;
//   keyboardType?: any;
//   autoCapitalize?: any;
// }

// const InputField = React.memo(function InputField({
//   label,
//   placeholder,
//   icon,
//   value,
//   onChangeText,
//   keyboardType = 'default',
//   autoCapitalize = 'sentences',
// }: InputFieldProps) {
//   const [focused, setFocused] = useState(false);

//   return (
//     <View style={profile_inputGroup}>
//       <Text style={profile_inputLabel}>{label}</Text>
//       <View
//         style={[
//           profile_inputContainer,
//           focused ? profile_inputContainerFocused : null,
//         ]}
//       >
//         <Icon
//           name={ICON_MAP[icon] ?? icon}
//           size={16}
//           color={focused ? COLORS.primary : COLORS.muted}
//           style={{ marginRight: 10 }}
//         />
//         <TextInput
//           style={profile_input}
//           placeholder={placeholder}
//           placeholderTextColor={COLORS.muted}
//           value={value}
//           onChangeText={onChangeText}
//           keyboardType={keyboardType}
//           autoCapitalize={autoCapitalize}
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//         />
//       </View>
//     </View>
//   );
// });

// // ─── SectionDivider (module level) ───────────────────────────────────────────
// const SectionDivider = React.memo(function SectionDivider({
//   label,
// }: {
//   label: string;
// }) {
//   return (
//     <View style={profile_dividerRow}>
//       <View style={profile_dividerLine} />
//       <Text style={profile_dividerLabel}>{label}</Text>
//       <View style={profile_dividerLine} />
//     </View>
//   );
// });

// // ─── Main Screen ──────────────────────────────────────────────────────────────
// function EditProfileScreen() {
//   const navigation = useNavigation<NativeStackNavigationProp<any>>();
//   const dispatch = useAppDispatch();
//   const profile = useAppSelector((state: any) => state.profile);

//   // ── State (all hooks at top level, unconditionally) ───────────────────────
//   const [fullName, setFullName] = useState<string>(profile.name ?? '');
//   const [email, setEmail] = useState<string>(profile.email ?? '');
//   const [phone, setPhone] = useState<string>(profile.phone ?? '');
//   const [locationState, setLocationState] = useState<string>(
//     profile.state ?? '',
//   );
//   const [city, setCity] = useState<string>(profile.city ?? '');
//   const [avatar, setAvatar] = useState<string | null>(profile.avatar ?? null);
//   const [uploadingPhoto, setUploadingPhoto] = useState<boolean>(false);

//   const saveAnim = useRef(new Animated.Value(0)).current;

//   // ── Detect changes ────────────────────────────────────────────────────────
//   const hasChanges =
//     fullName !== (profile.name ?? '') ||
//     email !== (profile.email ?? '') ||
//     phone !== (profile.phone ?? '') ||
//     locationState !== (profile.state ?? '') ||
//     city !== (profile.city ?? '') ||
//     avatar !== (profile.avatar ?? null);

//   // ── Animate save button ───────────────────────────────────────────────────
//   useEffect(() => {
//     Animated.spring(saveAnim, {
//       toValue: hasChanges ? 1 : 0,
//       useNativeDriver: true,
//       tension: 160,
//       friction: 12,
//     }).start();
//   }, [hasChanges]);

//   // ── Save ──────────────────────────────────────────────────────────────────
//   const handleSave = () => {
//     if (!fullName.trim()) {
//       Alert.alert('Validation', 'Full name cannot be empty.');
//       return;
//     }
//     dispatch(
//       updateProfile({
//         name: fullName.trim(),
//         email: email.trim(),
//         phone: phone.trim(),
//         state: locationState.trim(),
//         city: city.trim(),
//         avatar,
//       }),
//     );
//     navigation.goBack();
//   };

//   // ── Render ────────────────────────────────────────────────────────────────
//   return (
//     <SafeAreaView style={profile_safe}>
//       {/* Header — Save button removed */}
//       <View style={profile_header}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={profile_backBtn}
//         >
//           <Icon name="chevron-back" size={22} color={COLORS.ink} />
//         </TouchableOpacity>

//         <Text style={profile_headerTitle}>Edit Profile</Text>

//         {/* Spacer to keep title centered */}
//         <View style={{ width: 36 }} />
//       </View>

//       <ScrollView
//         contentContainerStyle={profile_scroll}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         {/* Avatar + Camera Section — separate component */}
//         <CameraPickerSection
//           avatar={avatar}
//           setAvatar={setAvatar}
//           uploadingPhoto={uploadingPhoto}
//           setUploadingPhoto={setUploadingPhoto}
//           fullName={fullName}
//         />

//         {/* Form Card */}
//         <View style={profile_formCard}>
//           <InputField
//             label="Full Name"
//             placeholder="Your full name"
//             icon="user"
//             value={fullName}
//             onChangeText={setFullName}
//           />
//           <InputField
//             label="Email Address"
//             placeholder="you@example.com"
//             icon="email"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//           />
//           <InputField
//             label="Phone Number"
//             placeholder="Phone number"
//             icon="phone"
//             keyboardType="phone-pad"
//             value={phone}
//             onChangeText={setPhone}
//           />

//           <SectionDivider label="Location" />

//           <View style={profile_rowFields}>
//             {/* State */}
//             <View style={profile_halfField}>
//               <Text style={profile_inputLabel}>State</Text>
//               <View style={profile_inputContainerHalf}>
//                 <MapPinIcon
//                   size={16}
//                   color={COLORS.muted}
//                   style={{ marginRight: 8 }}
//                 />
//                 <TextInput
//                   style={profile_input}
//                   placeholder="State"
//                   placeholderTextColor={COLORS.muted}
//                   value={locationState}
//                   onChangeText={setLocationState}
//                   autoCapitalize="words"
//                 />
//               </View>
//             </View>

//             {/* City */}
//             <View style={profile_halfField}>
//               <Text style={profile_inputLabel}>City</Text>
//               <View style={profile_inputContainerHalf}>
//                 <MapPinIcon
//                   size={16}
//                   color={COLORS.muted}
//                   style={{ marginRight: 8 }}
//                 />
//                 <TextInput
//                   style={profile_input}
//                   placeholder="City"
//                   placeholderTextColor={COLORS.muted}
//                   value={city}
//                   onChangeText={setCity}
//                   autoCapitalize="words"
//                 />
//               </View>
//             </View>
//           </View>
//         </View>

//         {/* Bottom Save Button */}
//         {hasChanges && (
//           <Animated.View
//             style={[
//               profile_bottomBtnWrap,
//               {
//                 opacity: saveAnim,
//                 transform: [
//                   {
//                     translateY: saveAnim.interpolate({
//                       inputRange: [0, 1],
//                       outputRange: [20, 0],
//                     }),
//                   },
//                 ],
//               },
//             ]}
//           >
//             <TouchableOpacity
//               style={profile_saveBtn}
//               activeOpacity={0.85}
//               onPress={handleSave}
//             >
//               <Icon
//                 name="checkmark-circle-outline"
//                 size={18}
//                 color={COLORS.ink}
//                 style={{ marginRight: 8 }}
//               />
//               <Text style={profile_saveBtnText}>Save Changes</Text>
//             </TouchableOpacity>
//           </Animated.View>
//         )}

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // ─── Styles (all prefixed profile_) ──────────────────────────────────────────
// const profile_safe: any = {
//   flex: 1,
//   backgroundColor: COLORS.surface,
// };

// const profile_header: any = {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   paddingHorizontal: 16,
//   paddingVertical: 14,
//   backgroundColor: COLORS.white,
//   borderBottomWidth: 1,
//   borderBottomColor: COLORS.border,
// };

// const profile_backBtn: any = {
//   width: 36,
//   height: 36,
//   borderRadius: 10,
//   backgroundColor: COLORS.surface,
//   alignItems: 'center',
//   justifyContent: 'center',
// };

// const profile_headerTitle: any = {
//   fontSize: 17,
//   fontWeight: '800',
//   color: COLORS.ink,
//   letterSpacing: -0.3,
// };

// const profile_scroll: any = {
//   paddingBottom: 16,
// };

// // Form
// const profile_formCard: any = {
//   marginHorizontal: 16,
//   backgroundColor: COLORS.white,
//   borderRadius: 20,
//   borderWidth: 1,
//   borderColor: COLORS.border,
//   padding: 20,
//   gap: 16,
// };

// const profile_inputGroup: any = {
//   gap: 6,
// };

// const profile_inputLabel: any = {
//   fontSize: 12,
//   fontWeight: '700',
//   color: COLORS.labelColor,
//   letterSpacing: 0.3,
// };

// const profile_inputContainer: any = {
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: COLORS.inputBg,
//   borderRadius: 12,
//   paddingHorizontal: 14,
//   paddingVertical: 11,
//   borderWidth: 1.5,
//   borderColor: 'transparent',
// };

// const profile_inputContainerFocused: any = {
//   borderColor: COLORS.primary,
//   backgroundColor: COLORS.white,
// };

// const profile_inputContainerHalf: any = {
//   flex: 1,
//   flexDirection: 'row',
//   alignItems: 'center',
//   backgroundColor: COLORS.inputBg,
//   borderRadius: 12,
//   paddingHorizontal: 12,
//   paddingVertical: 11,
//   borderWidth: 1.5,
//   borderColor: 'transparent',
// };

// const profile_input: any = {
//   flex: 1,
//   fontSize: 14,
//   fontWeight: '600',
//   color: COLORS.ink,
// };

// const profile_rowFields: any = {
//   flexDirection: 'row',
//   gap: 12,
// };

// const profile_halfField: any = {
//   flex: 1,
//   gap: 6,
// };

// const profile_dividerRow: any = {
//   flexDirection: 'row',
//   alignItems: 'center',
//   gap: 10,
//   marginVertical: 4,
// };

// const profile_dividerLine: any = {
//   flex: 1,
//   height: 1,
//   backgroundColor: COLORS.border,
// };

// const profile_dividerLabel: any = {
//   fontSize: 10,
//   fontWeight: '800',
//   color: COLORS.muted,
//   letterSpacing: 1.2,
// };

// const profile_bottomBtnWrap: any = {
//   marginHorizontal: 16,
//   marginTop: 20,
// };

// const profile_saveBtn: any = {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundColor: COLORS.primary,
//   borderRadius: 14,
//   paddingVertical: 15,
//   shadowColor: COLORS.primary,
//   shadowOffset: { width: 0, height: 6 },
//   shadowOpacity: 0.35,
//   shadowRadius: 12,
//   elevation: 6,
// };

// const profile_saveBtnText: any = {
//   fontSize: 15,
//   fontWeight: '800',
//   color: COLORS.ink,
//   letterSpacing: -0.2,
// };

// export default EditProfileScreen;
