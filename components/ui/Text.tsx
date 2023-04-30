import { styled } from "nativewind";
import React, { ReactNode } from "react";
import { TextProps } from "react-native";
interface Props extends TextProps {
  children?: ReactNode;
}
function Text({ children, ...props }: Props) {
  return (
    <Text className="text-black font-Poppins400" {...props}>
      {children}
    </Text>
  );
}
export default Text;
