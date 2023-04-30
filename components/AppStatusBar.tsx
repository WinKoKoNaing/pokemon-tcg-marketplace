import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import Constants from "expo-constants";

export default function AppStatusBar() {
  return (
    <View
      style={{
        height: Constants.statusBarHeight + 1,
        backgroundColor: "#298BFD",
      }}
    >
      <StatusBar backgroundColor="#298BFD" style="light" />
    </View>
  );
}
