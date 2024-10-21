import React from "react";
import { ScrollView, View } from "react-native";

import GlobalLink from "@/components/GlobalLink";
import { Table } from "@/components/Table";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTruthTableStore } from "@/store/truth-table-store";

export default function StepTwoScreen() {
  const { propositions } = useTruthTableStore();

  return (
    <ThemedView style={{ flex: 1, padding: 16, paddingTop: 32 }}>
      <ThemedText type="title">Paso 2:</ThemedText>
      <ThemedText type="subtitle">Previzualización de la tabla</ThemedText>

      <ScrollView
        style={{
          marginTop: 16,
        }}
      >
        <Table propositions={propositions} />
      </ScrollView>

      {/* Link para navegar al siguiente paso */}
      <View style={{ paddingTop: 24, gap: 8 }}>
        <ThemedText type="small" style={{ textAlign: "center" }}>
          ¿Desea crear una tabla de verdad con estas proposiciones?
        </ThemedText>
        <GlobalLink disabled={!propositions.length} href={"/step-3"}>
          Crear tabla de verdad
        </GlobalLink>
      </View>
    </ThemedView>
  );
}
