import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card } from "type";

export const LOGIN = "Login";
export const HOME = "Home";
export const CART = "Cart";

export type RootStackParamList = {
  [LOGIN]: undefined;
  [HOME]: undefined;
  [CART]: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
export type CartScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Cart"
>;
