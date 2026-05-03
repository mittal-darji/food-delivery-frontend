import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const COLORS = {
  primary: '#F5C518',
  primaryMid: '#FDEEA0',
  primaryDark: '#C49A00',
  navy: '#1A1033',
};

const ArrowRightIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 12h14M13 6l6 6-6 6"
      stroke={COLORS.navy}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface ButtonComponentProps {
  label: string;
  loadingLabel: string;
  isLoading: boolean;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonComponentProps> = ({
  label,
  loadingLabel,
  isLoading,
  onPress,
  variant = 'primary',
  icon,
}) => (
  <TouchableOpacity
    style={[
      styles.btn,
      variant === 'outline' && styles.btnOutline,
      isLoading && styles.btnLoading,
    ]}
    onPress={onPress}
    activeOpacity={isLoading ? 1 : 0.85}
    disabled={isLoading}
  >
    {isLoading ? (
      <View style={styles.loadingRow}>
        <ActivityIndicator
          color={variant === 'outline' ? COLORS.primary : COLORS.navy}
          size="small"
        />
        <Text
          style={[
            styles.btnText,
            variant === 'outline' && styles.btnTextOutline,
            { marginLeft: 8 },
          ]}
        >
          {loadingLabel}
        </Text>
      </View>
    ) : (
      <View style={styles.innerRow}>
        <Text
          style={[
            styles.btnText,
            variant === 'outline' && styles.btnTextOutline,
          ]}
        >
          {label}
        </Text>
        <View style={styles.iconWrapper}>{icon ?? <ArrowRightIcon />}</View>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    height: 56,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  btnLoading: {
    backgroundColor: COLORS.primaryMid,
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.navy,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  btnTextOutline: {
    color: COLORS.primary,
  },
  iconWrapper: {
    marginLeft: 2,
  },
});

export default Button;
