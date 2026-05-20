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
<<<<<<< HEAD
import HotelFoodMenuScreen from './src/features/HotelFoodMenu/screens/HotelFoodMenuScreen';
=======
import ProfileScreen from './src/features/home/profile/screens/ProfileScreen';
import EditProfileScreen from './src/features/home/profile/screens/EditProfileScreen';
>>>>>>> profile

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
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
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadAvatarUri().then((savedUri: string | null) => {
      if (savedUri) {
        store.dispatch(updateProfile({ avatar: savedUri }));
      }
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fac60b" />
      </View>
    );
  }

<<<<<<< HEAD
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="HotelFoodMenu" component={HotelFoodMenuScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
=======
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
>>>>>>> profile
  );
}

export default App;
