import { StyleSheet } from "react-native";
import { Colors } from "./constants/Colors";

export const globalStyles = StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    height: 40,
    borderRadius: 50,
    color: Colors.dark.text,
    flex: 1,
    fontWeight: "bold",
    backgroundColor: Colors.table.header,
  },
  squareButton: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: Colors.table.header,
  },
  key: {
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: Colors.table.header,
  },
});
