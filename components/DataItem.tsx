import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/global-styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

interface Props {
  item: string;
  onDelete: () => void;
}

export const DataItem: React.FC<Props> = ({ item, onDelete }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <TextInput value={item} editable={false} style={globalStyles.input} />
      <TouchableOpacity
        onPress={onDelete}
        style={{ height: 32, justifyContent: "center" }}
      >
        <Ionicons name="trash" size={20} color={Colors.error} />
      </TouchableOpacity>
    </View>
  );
};
