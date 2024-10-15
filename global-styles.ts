import { StyleSheet } from "react-native";
import { Colors } from "./constants/Colors";

export const globalStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 8,
    borderColor: Colors.dark.icon,
    color: Colors.dark.text,
    flex: 1,
    fontWeight: "bold",
  },
  squareButton: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
