import { Colors } from "@/constants/Colors";
import { generateTruthTable } from "@/helpers/truth-table.helpers";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface Props {
  propositions: string[];
  expressions?: string[];
}

export const Table: React.FC<Props> = ({ propositions, expressions = [] }) => {
  const tableHeaders = propositions.concat(expressions);

  const truthTable = generateTruthTable(propositions, expressions);

  return (
    <ScrollView horizontal>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        {tableHeaders.map((header, index) => (
          <View key={header}>
            <ThemedText
              style={[
                styles.cell,
                {
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
    textAlignVertical: "center",
    fontWeight: "bold",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.dark.background,
    height: 32,
    minWidth: 32,
    paddingHorizontal: 8
  },
});
