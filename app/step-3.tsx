import GlobalLink from "@/components/GlobalLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/global-styles";
import { useTruthTableStore } from "@/store/truth-table-store";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function StepThreeScreen() {
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
      return;
    }
    newProposition(proposition);
    setProposition(""); // Limpiar el campo de texto
  };

  return (
    <ThemedView style={{ flex: 1, padding: 24 }}>
      <ThemedText type="title">Paso 3:</ThemedText>
      <ThemedText type="subtitle">Crea proposiciones complejas</ThemedText>

      <View
        style={{
          marginTop: 16,
          marginBottom: 48,
          flexDirection: "row",
          gap: 8,
        }}
      >
        {/* Input para añadir nueva proposición */}
        <TextInput
          value={proposition}
          onChangeText={setProposition}
          placeholder="Introduce tus expresiones..."
          maxLength={1}
          style={globalStyles.input}
          placeholderTextColor={Colors.dark.icon}
        />

        {/* Botón para añadir la proposición */}
        <TouchableOpacity
          onPress={addProposition}
          style={[
            globalStyles.squareButton,
            {
              backgroundColor: Colors.success,
              height: 48,
              width: 48,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            },
          ]}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {propositions.length ? (
        <ThemedText type="default">Expresiones creadas:</ThemedText>
      ) : null}

      {/* Lista de proposiciones */}
      <FlatList
        data={propositions}
        style={{ marginTop: 8 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <TextInput
              value={item}
              editable={false}
              style={globalStyles.input}
            />
            {/* Botón para eliminar */}
            <TouchableOpacity
              onPress={() => removeProposition(item)}
              style={[
                globalStyles.squareButton,
                {
                  backgroundColor: Colors.error,
                },
              ]}
            >
              <Ionicons name="trash" size={32} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Link para navegar al siguiente paso */}
      <View style={{ paddingTop: 24 }}>
        <GlobalLink disabled={!propositions.length} href={"/step-2"}>
          {propositions.length ? "Continuar" : "Añade al menos una proposición"}
        </GlobalLink>
      </View>
    </ThemedView>
  );
}
