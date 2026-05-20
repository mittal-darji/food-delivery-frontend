import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  MediaType,
} from 'react-native-image-picker';

// ─── Design Tokens (shared) ───────────────────────────────────────────────────
const COLORS = {
  primary: '#fac60b',
  primaryDark: '#c49900',
  ink: '#11072b',
  muted: '#94A3B8',
  white: '#FFFFFF',
  red: '#EF4444',
  redLight: '#FEE2E2',
};

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

// ─── Helper: get initials ─────────────────────────────────────────────────────
function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0]?.[0]?.toUpperCase() ?? '?';
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface CameraPickerSectionProps {
  avatar: string | null;
  setAvatar: (uri: string | null) => void;
  uploadingPhoto: boolean;
  setUploadingPhoto: (v: boolean) => void;
  fullName: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
function CameraPickerSection({
  avatar,
  setAvatar,
  uploadingPhoto,
  setUploadingPhoto,
  fullName,
}: CameraPickerSectionProps) {
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

  return (
    <View style={camera_section}>
      <TouchableOpacity
        style={camera_avatarWrapper}
        onPress={handlePhotoPress}
        activeOpacity={0.85}
      >
        {avatar ? (
          <Image source={{ uri: avatar }} style={camera_avatarImage} />
        ) : (
          <View style={camera_avatarFallback}>
            <Text style={camera_avatarInitials}>
              {getInitials(fullName || 'U')}
            </Text>
          </View>
        )}

        {uploadingPhoto && (
          <View style={camera_avatarOverlay}>
            <ActivityIndicator size="small" color={COLORS.white} />
          </View>
        )}

        <View style={camera_badge}>
          <Icon name="camera" size={13} color={COLORS.ink} />
        </View>
      </TouchableOpacity>

      <Text style={camera_hintText}>Tap photo to change</Text>

      <View style={camera_pills}>
        <TouchableOpacity
          style={camera_pill}
          onPress={openGallery}
          activeOpacity={0.75}
        >
          <Icon name="images-outline" size={13} color={COLORS.primaryDark} />
          <Text style={camera_pillText}>Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={camera_pill}
          onPress={openCamera}
          activeOpacity={0.75}
        >
          <Icon name="camera-outline" size={13} color={COLORS.primaryDark} />
          <Text style={camera_pillText}>Camera</Text>
        </TouchableOpacity>

        {avatar !== null && (
          <TouchableOpacity
            style={[camera_pill, camera_pillRemove]}
            onPress={() => setAvatar(null)}
            activeOpacity={0.75}
          >
            <Icon name="trash-outline" size={13} color={COLORS.red} />
            <Text style={[camera_pillText, { color: COLORS.red }]}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ─── Styles (all prefixed camera_) ───────────────────────────────────────────
const camera_section: any = {
  alignItems: 'center',
  paddingTop: 28,
  paddingBottom: 24,
  gap: 10,
};

const camera_avatarWrapper: any = {
  width: 96,
  height: 96,
  borderRadius: 48,
  position: 'relative',
};

const camera_avatarImage: any = {
  width: 96,
  height: 96,
  borderRadius: 48,
  borderWidth: 3,
  borderColor: COLORS.primary,
};

const camera_avatarFallback: any = {
  width: 96,
  height: 96,
  borderRadius: 48,
  backgroundColor: COLORS.primary + '22',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 3,
  borderColor: COLORS.primary + '55',
};

const camera_avatarInitials: any = {
  fontSize: 32,
  fontWeight: '800',
  color: COLORS.primaryDark,
};

const camera_avatarOverlay: any = {
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

const camera_badge: any = {
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

const camera_hintText: any = {
  fontSize: 12,
  color: COLORS.muted,
  fontWeight: '500',
};

const camera_pills: any = {
  flexDirection: 'row',
  gap: 8,
  marginTop: 2,
};

const camera_pill: any = {
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

const camera_pillRemove: any = {
  backgroundColor: '#FEE2E2',
  borderColor: '#FECACA',
};

const camera_pillText: any = {
  fontSize: 12,
  fontWeight: '700',
  color: COLORS.primaryDark,
};

export default CameraPickerSection;
