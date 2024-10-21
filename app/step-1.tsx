import React, { useState } from "react";
import {
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { DataItem } from "@/components/DataItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/global-styles";
import { useTruthTableStore } from "@/store/truth-table-store";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function StepOneScreen() {
  const [proposition, setProposition] = useState(""); // Estado para la nueva proposición

  const { propositions, newProposition, removeProposition } =
    useTruthTableStore();

  // Función para agregar una proposición
  const addProposition = () => {
    if (!proposition.trim()) {
      Alert.alert("Error", "La proposición no puede estar vacía.");
      return;
    }
    if (propositions.includes(proposition)) {
      Alert.alert("Error", "La proposición ya existe.");
      setProposition("");
      return;
    }
    newProposition(proposition);
    setProposition(""); // Limpiar el campo de texto
  };

  return (
    <ThemedView style={{ flex: 1, padding: 16, paddingTop: 32 }}>
      <ThemedText type="title">Paso 1:</ThemedText>
      <ThemedText type="subtitle">Introduce tus proposiciones</ThemedText>

      {/* Lista de proposiciones */}
      <FlatList
        data={propositions}
        style={{ marginTop: 16 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <DataItem item={item} onDelete={() => removeProposition(item)} />
        )}
      />

      {/* Link para navegar al siguiente paso */}
      <View style={{}}>
        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            gap: 8,
          }}
        >
          <TextInput
            value={proposition}
            onChangeText={setProposition}
            placeholder="Introduce una proposición..."
            maxLength={1}
            style={globalStyles.input}
            placeholderTextColor={Colors.dark.icon}
          />

          {proposition.length ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={addProposition}
              style={[
                globalStyles.squareButton,
                {
                  backgroundColor: Colors.success,
                },
              ]}
            >
              <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
          ) : (
            <Link
              href={"/step-2"}
              style={[
                globalStyles.squareButton,
                {
                  backgroundColor: Colors.primary,
                  opacity: !propositions.length ? 0.25 : 1,
                },
              ]}
              asChild
            >
              <TouchableOpacity
                activeOpacity={0.5}
                disabled={!propositions.length}
              >
                <Ionicons name="chevron-forward" size={30} color="white" />
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>
    </ThemedView>
  );
}
