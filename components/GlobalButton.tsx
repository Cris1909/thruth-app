import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface Props extends React.ComponentProps<typeof TouchableOpacity> {
  children: React.ReactNode;
  onPress?: () => void;
}

export default function GlobalButton({ children, onPress, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      {...rest}
    >
      <Text
        style={{
          color: "white",
          fontSize: 16,
          textAlign: "center",
          backgroundColor: Colors.primary,
          width: "100%",
          borderRadius: 100,
          padding: 8,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}
