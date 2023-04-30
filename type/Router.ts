import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const LOGIN = "Login";
export const HOME = "Home";
export const CART = "Cart";
export const PAYMENT_SUCCESS = "PaymentSuccess";

export type RootStackParamList = {
  [LOGIN]: undefined;
  [HOME]: undefined;
  [CART]: undefined;
  [PAYMENT_SUCCESS]: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
export type CartScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Cart"
>;
