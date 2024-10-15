import { Colors } from "@/constants/Colors";
import { generateTruthTable } from "@/helpers/truth-table.helpers";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface Props {
  propositions: string[];
  complexPropositions?: string[];
}
// const propositions = ["p", "q", "r", "s"];
// const complexPropositions = ["p ∧ q ∨ (¬p ∧ q)"];

export const Table: React.FC<Props> = ({
  propositions,
  complexPropositions = [],
}) => {
  const tableHeaders = propositions.concat(complexPropositions);

  const truthTable = generateTruthTable(propositions, complexPropositions);

  return (
    <ScrollView horizontal>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {tableHeaders.map((header, index) => (
          <View key={header}>
            <ThemedText
              style={[
                styles.cell,
                {
                  paddingHorizontal: 16,
                  backgroundColor: Colors.table.header,
                },
              ]}
            >
              {header}
            </ThemedText>
            {truthTable.map((e, i) => (
              <ThemedText
                key={i}
                style={[
                  styles.cell,
                  {
                    backgroundColor: e[header]
                      ? Colors.table.true
                      : Colors.table.false,
                    // backgroundColor: Colors.table.background,
                  },
                ]}
              >
                {e[header] ? "T" : "F"}
              </ThemedText>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cell: {
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.dark.background,
  },
});
