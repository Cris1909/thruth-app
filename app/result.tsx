import React from "react";
import { ScrollView } from "react-native";

import { Table } from "@/components/Table";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTruthTableStore } from "@/store/truth-table-store";

export default function StepTwoScreen() {
  const { propositions, expressions } = useTruthTableStore();

  return (
    <ThemedView style={{ flex: 1, padding: 16, paddingTop: 32 }}>
      <ThemedText type="title">¡Listo!</ThemedText>
      <ThemedText type="subtitle">Tabla de verdad creada</ThemedText>

      <ScrollView
        style={{
          marginTop: 16,
        }}
      >
        <Table propositions={propositions} expressions={expressions} />
      </ScrollView>
    </ThemedView>
  );
}
