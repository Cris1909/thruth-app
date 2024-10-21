import {
  StyleSheet
} from "react-native";

import GlobalLink from "@/components/GlobalLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const color = useThemeColor({}, "text");

  return (
    <ThemedView
      style={{
        padding: 16,
        flex: 1,
        paddingTop: 100,
      }}
    >
      <ThemedView style={{ flex: 1, alignItems: "center" }}>
        <ThemedView
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <ThemedText type="subtitle">∧</ThemedText>
          <ThemedText type="subtitle">∨</ThemedText>
          <ThemedText type="subtitle">¬</ThemedText>
          {/* <ThemedText type="subtitle">→</ThemedText>
          <ThemedText type="subtitle">↔</ThemedText> */}
        </ThemedView>
        <ThemedText
          type="title"
          style={{
            fontSize: 64,
            lineHeight: undefined,
          }}
        >
          TruthApp
        </ThemedText>

        <ThemedText type="default" style={{ textAlign: "center" }}>
          Crea tablas de verdad de manera sencilla
        </ThemedText>
      
      </ThemedView>
      <GlobalLink href={"/step-1"}>Empezar Ahora</GlobalLink>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
