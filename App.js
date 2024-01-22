import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import LoginScreen from './Src/App/Screen/LoginScreen/LoginScreen';

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";


import * as SecureStore from "expo-secure-store";





SplashScreen.preventAutoHideAsync();
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ClerkProvider
    tokenCache={tokenCache}
    publishableKey={'pk_test_Z2xvd2luZy1wdXAtNjQuY2xlcmsuYWNjb3VudHMuZGV2JA'}>
    <View style={styles.container}  onLayout={onLayoutRootView}>
      <SignedIn>
          <Text>You are Signed in</Text>
      </SignedIn>
      <SignedOut>
        <Text> not Signed</Text> 
      </SignedOut>
     <StatusBar style='auto' />  
     {/*LoginScreen */}   
     </View>
     
     </ClerkProvider>
   
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:25
  },
});
