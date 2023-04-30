import { Text, View } from "react-native";
import React from "react";
import { Logo } from "assets/svgs";
// import { Text } from "./ui";

export default function Header() {
  return (
    <View className="h-[97px] relative items-center justify-center bg-white leading-[36px]">
      <Text className="font-Poppins700 text-2xl">TCG Marketplace</Text>
      <View className="w-[52px] h-[52px] rounded-full absolute -bottom-5 items-center justify-center bg-white">
        <Logo className="mb-1.5" />
      </View>
    </View>
  );
}
