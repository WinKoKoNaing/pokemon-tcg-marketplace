import { View, Text } from "react-native";
import React, { memo } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
export type DataType = {
  label: string;
};
type Props = {
  data?: DataType[];
  value: DataType;
  onChange: (label: DataType, role: string) => void;
  placeholder?: string;
  role: string;
};
const Select = ({ value, onChange, data, role, placeholder }: Props) => {
  return (
    <View className="flex-1">
      <Dropdown
        style={{
          height: 35,
          width: 100,
          paddingHorizontal: 20,
          borderRadius: 100,
          backgroundColor: "white",
        }}
        placeholder={placeholder}
        containerStyle={{
          borderWidth: 0,
          width: 200,
          height: 500,
          borderRadius: 20,
        }}
        renderRightIcon={() => (
          <MaterialIcons
            className="flex-none"
            name={"keyboard-arrow-down"}
            size={25}
            color="black"
          />
        )}
        placeholderStyle={{ color: "#A4A7B6", fontSize: 10 }}
        selectedTextStyle={{
          color: "black",
          fontSize: 10,
        }}
        selectedTextProps={{ numberOfLines: 1 }}
        renderItem={(item, selected) => (
          <View
            className={`p-4 ${
              selected ? "bg-gray-100" : ""
            } flex-row items-center`}
          >
            <Text className=" flex-1 text-xs">{item?.label}</Text>
          </View>
        )}
        onChange={(item) => onChange(item, role)}
        value={value}
        labelField="label"
        valueField="label"
        data={data ?? []}
        autoScroll={false}
        mode="modal"
      />
    </View>
  );
};

export default memo(Select);
