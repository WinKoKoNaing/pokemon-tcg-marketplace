import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";

export default function AppPicker() {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <Picker
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
    >
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
}
