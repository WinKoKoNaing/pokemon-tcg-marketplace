import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SuccessSvgIcon } from "assets/svgs";

export default function PaymentSuccess() {
  const navigation = useNavigation();
  const onPressClose = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView className="flex-1 justify-end mb-20">
      <View className="bg-white h-[362px] relative items-center justify-center">
        <View className="justify-center items-center">
          <SuccessSvgIcon />
          <Text className="text-xl font-Poppins500 mt-4">Payment success!</Text>
        </View>
        <TouchableOpacity
          onPress={onPressClose}
          className="h-10 w-10 absolute bottom-0 rounded-lg self-center -mb-6 bg-red-500 items-center justify-center"
        >
          <AntDesign name="close" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
