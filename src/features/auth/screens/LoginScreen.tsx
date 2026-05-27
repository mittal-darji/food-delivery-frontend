import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Dimensions,
  StatusBar,
  ImageBackground,
  Alert,
} from 'react-native';
import Button from '../../../components/button/Button';
import {
  DarkOverlay,
  AuthHeader,
  InputField,
  CheckboxRow,
  COLORS,
} from '../components/AuthForm';

const { width } = Dimensions.get('window');

type LoginMethod = 'email' | 'phone' | null;

const TOGGLE_PADDING = 4;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [loginMethod, setLoginMethod] = useState<LoginMethod>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;

  const inputSlide = useRef(new Animated.Value(0)).current;
  const inputOpacity = useRef(new Animated.Value(0)).current;

  const toggleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const openMethod = (method: 'email' | 'phone') => {
    setLoginMethod(method);
    Animated.spring(toggleAnim, {
      toValue: method === 'email' ? 0 : 1,
      friction: 7,
      useNativeDriver: true,
    }).start();
    Animated.parallel([
      Animated.spring(inputSlide, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(inputOpacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMethod = () => {
    Animated.parallel([
      Animated.timing(inputOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.spring(inputSlide, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start(() => setLoginMethod(null));
  };

  const switchMethod = (method: 'email' | 'phone') => {
    if (method === loginMethod) return;
    setLoginMethod(method);
    Animated.spring(toggleAnim, {
      toValue: method === 'email' ? 0 : 1,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  const pillTranslate = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, (width - 32 - 48 - 8) / 2],
  });

  const inputTranslateY = inputSlide.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const handleLogin = async () => {
    const identifier = loginMethod === 'email' ? email : phone;
    if (!identifier || !password) {
      Alert.alert(
        'Missing Fields',
        `Please enter your ${
          loginMethod === 'email' ? 'email' : 'phone number'
        } and password`,
      );
      return;
    }
    if (loginMethod === 'phone' && !/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      Alert.alert(
        'Invalid Phone',
        'Please enter a valid 10-digit phone number',
      );
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(() => resolve(undefined), 1500));
      navigation.navigate('Home');
    } catch {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/log.png')}
      style={styles.login_bgImage}
      resizeMode="cover"
    >
      <DarkOverlay />

      <KeyboardAvoidingView
        style={styles.login_flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        <ScrollView
          style={styles.login_flex}
          contentContainerStyle={styles.login_scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <AuthHeader
            fadeAnim={fadeAnim}
            slideAnim={slideAnim}
            logoScale={logoScale}
            screenWidth={width}
          />

          <Animated.View
            style={[
              styles.login_card,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.login_cardAccentBar} />

            <Text style={styles.login_cardTitle}>Welcome Back!</Text>
            <Text style={styles.login_cardSubtitle}>
              Login to continue ordering
            </Text>

            <View style={styles.login_divider}>
              <View style={styles.login_dividerLine} />
              <Text style={styles.login_dividerText}>or continue with</Text>
              <View style={styles.login_dividerLine} />
            </View>

            {loginMethod === null && (
              <View style={styles.login_methodList}>
                <TouchableOpacity
                  style={styles.login_methodBtn}
                  onPress={() => openMethod('email')}
                  activeOpacity={0.82}
                >
                  <View
                    style={[
                      styles.login_methodIconWrap,
                      styles.login_methodIconEmail,
                    ]}
                  >
                    <Icon name="email" size={18} color="#fff" />
                  </View>
                  <Text style={styles.login_methodBtnText}>
                    Continue with Email
                  </Text>
                  <Icon
                    name="chevron-right"
                    size={20}
                    color="rgba(255,255,255,0.35)"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.login_methodBtn}
                  onPress={() => openMethod('phone')}
                  activeOpacity={0.82}
                >
                  <View
                    style={[
                      styles.login_methodIconWrap,
                      styles.login_methodIconPhone,
                    ]}
                  >
                    <Icon name="phone" size={18} color="#fff" />
                  </View>
                  <Text style={styles.login_methodBtnText}>
                    Continue with Phone
                  </Text>
                  <Icon
                    name="chevron-right"
                    size={20}
                    color="rgba(255,255,255,0.35)"
                  />
                </TouchableOpacity>
              </View>
            )}

            {loginMethod !== null && (
              <Animated.View
                style={[
                  styles.login_inputSection,
                  {
                    opacity: inputOpacity,
                    transform: [{ translateY: inputTranslateY }],
                  },
                ]}
              >
                <View style={styles.login_toggleWrapper}>
                  <Animated.View
                    style={[
                      styles.login_togglePill,
                      { transform: [{ translateX: pillTranslate }] },
                    ]}
                  />

                  <TouchableOpacity
                    style={styles.login_toggleBtn}
                    onPress={() => switchMethod('email')}
                    activeOpacity={0.8}
                  >
                    <Icon
                      name="email"
                      size={14}
                      color={
                        loginMethod === 'email'
                          ? '#1A1033'
                          : 'rgba(255,255,255,0.5)'
                      }
                      style={{ marginRight: 5 }}
                    />
                    <Text
                      style={[
                        styles.login_toggleText,
                        loginMethod === 'email' &&
                          styles.login_toggleTextActive,
                      ]}
                    >
                      Email
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.login_toggleBtn}
                    onPress={() => switchMethod('phone')}
                    activeOpacity={0.8}
                  >
                    <Icon
                      name="phone"
                      size={14}
                      color={
                        loginMethod === 'phone'
                          ? '#1A1033'
                          : 'rgba(255,255,255,0.5)'
                      }
                      style={{ marginRight: 5 }}
                    />
                    <Text
                      style={[
                        styles.login_toggleText,
                        loginMethod === 'phone' &&
                          styles.login_toggleTextActive,
                      ]}
                    >
                      Phone
                    </Text>
                  </TouchableOpacity>
                </View>

                {loginMethod === 'email' ? (
                  <InputField
                    label="Email Address"
                    placeholder="you@example.com"
                    icon="email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                ) : (
                  <InputField
                    label="Phone Number"
                    placeholder="Enter 10-digit number"
                    icon="phone"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                )}

                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  icon="lock"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />

                <View style={styles.login_row}>
                  <CheckboxRow
                    checked={rememberMe}
                    onToggle={() => setRememberMe(!rememberMe)}
                    label="Remember me"
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                  >
                    <Text style={styles.login_forgotText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>

                <Button
                  label="Login"
                  loadingLabel="Logging in..."
                  isLoading={isLoading}
                  onPress={handleLogin}
                />

                <TouchableOpacity
                  style={styles.login_backBtn}
                  onPress={closeMethod}
                  activeOpacity={0.75}
                >
                  <Icon
                    name="arrow-back"
                    size={14}
                    color="rgba(255,255,255,0.5)"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.login_backBtnText}>
                    Other sign-in options
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            )}

            <View style={styles.login_signupRow}>
              <Text style={styles.login_signupText}>New here? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.login_signupLink}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  login_bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  login_flex: { flex: 1 },
  login_scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  login_card: {
    width: width - 32,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'rgba(245, 197, 24, 0.57)',
    overflow: 'hidden',
  },
  login_cardAccentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  login_cardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  login_cardSubtitle: {
    fontSize: 14,
    color: COLORS.border,
    marginBottom: 20,
  },
  login_divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  login_dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(245,197,24,0.15)',
  },
  login_dividerText: {
    fontSize: 12,
    color: COLORS.border,
    marginHorizontal: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  login_methodList: {
    gap: 10,
    marginBottom: 20,
  },
  login_methodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    gap: 12,
  },
  login_methodIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_methodIconEmail: {
    backgroundColor: '#4F46E5',
  },
  login_methodIconPhone: {
    backgroundColor: '#16A34A',
  },
  login_methodBtnText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.88)',
    letterSpacing: 0.1,
  },
  login_inputSection: {
    marginBottom: 4,
  },
  login_toggleWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 14,
    padding: TOGGLE_PADDING,
    marginBottom: 20,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(245,197,24,0.2)',
  },
  login_togglePill: {
    position: 'absolute',
    top: TOGGLE_PADDING,
    left: TOGGLE_PADDING,
    width: '50%',
    bottom: TOGGLE_PADDING,
    backgroundColor: COLORS.primary,
    borderRadius: 11,
  },
  login_toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  login_toggleText: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 0.3,
  },
  login_toggleTextActive: {
    color: '#1A1033',
  },
  login_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 4,
  },
  login_forgotText: {
    fontSize: 13,
    color: COLORS.gold,
    fontWeight: '700',
  },
  login_backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  login_backBtnText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.84)',
    fontWeight: '500',
  },
  login_signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  login_signupText: {
    fontSize: 14,
    color: COLORS.slate,
  },
  login_signupLink: {
    fontSize: 14,
    color: COLORS.gold,
    fontWeight: '800',
  },
});

export default LoginScreen;
