import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { CartScreen, HomeScreen, LoginScreen } from "screens";
import { CART, HOME, LOGIN, RootStackParamList } from "types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import SwrConfig from "lib/SwrConfig";
import { AppProvider } from "context/Context";
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

  return (
    <AppProvider>
      <SwrConfig>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <NavigationContainer>
            <RootStack.Navigator
              initialRouteName={HOME}
              screenOptions={{ headerShown: false }}
            >
              {/* <Stack.Screen name={LOGIN} component={LoginScreen} /> */}
              <RootStack.Screen name={HOME} component={HomeScreen} />

              <RootStack.Group
                screenOptions={{ presentation: "containedTransparentModal" }}
              >
                <RootStack.Screen name={CART} component={CartScreen} />
              </RootStack.Group>
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </SwrConfig>
    </AppProvider>
  );
}
