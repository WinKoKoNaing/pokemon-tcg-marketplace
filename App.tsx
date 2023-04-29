import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, LoginScreen } from "screens";
import { HOME, LOGIN, RootStackParamList } from "types";

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={HOME}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={LOGIN} component={LoginScreen} />
        <Stack.Screen name={HOME} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
