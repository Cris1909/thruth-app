import React, { useEffect, useRef } from "react";
import { Dimensions, ScrollView } from "react-native";

import { Table } from "@/components/Table";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTruthTableStore } from "@/store/truth-table-store";
import LottieView from "lottie-react-native";

export default function StepTwoScreen() {
  const { propositions, expressions } = useTruthTableStore();
  const ref = useRef<LottieView>(null);

  useEffect(() => {
    ref.current?.play();
  }, []);

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

      <LottieView
        ref={ref}
        style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}
        source={require("../assets/confetti.json")}
      />
    </ThemedView>
  );
}

const { width, height } = Dimensions.get("screen");
