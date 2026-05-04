import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileState {
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  isPro: boolean;
  state: string;
  city: string;
  stats: {
    orders: number;
    wishlist: number;
    cart: number;
  };
}

const initialState: ProfileState = {
  name: 'Oliver Smith',
  email: 'oliver@email.com',
  phone: '+1 234 567 8900',
  avatar: null,
  isPro: true,
  state: 'Gujarat',
  city: 'Ahmedabad',
  stats: {
    orders: 12,
    wishlist: 8,
    cart: 3,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile(
      state: ProfileState,
      action: PayloadAction<Partial<ProfileState>>,
    ) {
      return { ...state, ...action.payload };
    },
    resetProfile() {
      return initialState;
    },
  },
});

export const { updateProfile, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
