import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStatusBar } from "components";
import { AppProvider, useAppState } from "context/Context";
import * as SplashScreen from "expo-splash-screen";
import SwrConfig from "lib/SwrConfig";
import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  CartScreen,
  HomeScreen,
  LoginScreen,
  PaymentSuccessScreen,
} from "screens";
import {
  CART,
  HOME,
  LOGIN,
  PAYMENT_SUCCESS,
  RootStackParamList,
} from "type/Router";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const RootStack = createNativeStackNavigator<RootStackParamList>();

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const MainStack = () => {
    const { token } = useAppState();
    return (
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <RootStack.Screen name={LOGIN} component={LoginScreen} />
        ) : (
          <>
            <RootStack.Screen name={HOME} component={HomeScreen} />

            <RootStack.Group
              screenOptions={{
                presentation: "containedTransparentModal",
              }}
            >
              <RootStack.Screen name={CART} component={CartScreen} />
              <RootStack.Screen
                name={PAYMENT_SUCCESS}
                component={PaymentSuccessScreen}
              />
            </RootStack.Group>
          </>
        )}
      </RootStack.Navigator>
    );
  };
  return (
    <AppProvider>
      <SwrConfig>
        <AppStatusBar />
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </SafeAreaProvider>
      </SwrConfig>
    </AppProvider>
  );
}
