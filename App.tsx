import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';

import { store } from './src/features/home/profile/store';
import { updateProfile } from './src/features/home/profile/state/ProfileSlice';
import { loadAvatarUri } from './src/features/home/profile/storage';

import GetStartedScreen from './src/features/auth/screens/GetStartedScreen';
import LoginScreen from './src/features/auth/screens/LoginScreen';
import SignupScreen from './src/features/auth/screens/SignupScreen';
import ForgotPasswordScreen from './src/features/auth/screens/ForgotPasswordScreen';
import HomeScreen from './src/features/home/screens/HomeScreen';
import HotelFoodMenuScreen from './src/features/HotelFoodMenu/screens/HotelFoodMenuScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="HotelFoodMenu" component={HotelFoodMenuScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
