import React from "react";
import { Colors } from "@/constants/Colors";
import { Href, Link } from "expo-router";
import { LinkComponent, LinkProps } from "expo-router/build/link/Link";
import { ThemedText } from "./ThemedText";
import { TouchableOpacity } from "react-native";

interface Props extends LinkProps<string> {}

export default function GlobalLink({ href, children, disabled }: Props) {
  return (
    <Link
      href={href}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? Colors.table.header : Colors.primary,
        width: "100%",
        borderRadius: 100,
        padding: 8,
      }}
      asChild
    >
      <TouchableOpacity activeOpacity={0.5}>
        <ThemedText
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {children}
        </ThemedText>
      </TouchableOpacity>
    </Link>
  );
}
