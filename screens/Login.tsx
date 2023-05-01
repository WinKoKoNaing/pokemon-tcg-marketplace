import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useAppState } from "context/Context";

export default function LoginScreen() {
  const { login } = useAppState();
  const [username, setUserName] = useState<string>("");

  const onPressLogin = () => {
    login({ username, token: "abcd" });
  };
  return (
    <SafeAreaView className="flex-1 justify-center">
      <View className="px-10">
        <Text className="text-xl text-center font-Poppins600 my-10">
          Welcome
        </Text>

        <View>
          <Text>User Name</Text>
          <TextInput
            className="h-12 mt-2 bg-gray-300 px-3 rounded-md"
            value={username}
            placeholder="Enter username"
            onChangeText={setUserName}
          />
        </View>

        <View className="mt-5">
          <Text>Password</Text>
          <TextInput
            className="h-12 mt-2 bg-gray-300 px-3 rounded-md"
            value={"password-demo"}
            // onChangeText={setUserName}
          />
        </View>

        <TouchableOpacity
          disabled={username.length === 0}
          onPress={onPressLogin}
          className="bg-[#298BFD] items-center w-full justify-center px-[14px] h-[47px] rounded-[25px] flex-row my-8"
        >
          <Text className="font-Poppins500 text-white">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
