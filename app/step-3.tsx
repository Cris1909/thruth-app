import GlobalLink from "@/components/GlobalLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/global-styles";
import { useTruthTableStore } from "@/store/truth-table-store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const KeyButton = ({
  character,
  onPressKey,
  style,
  children,
}: {
  character: string;
  icon?: any;
  onPressKey: (character?: string) => void;
  style?: ViewStyle;
  children?: React.ReactNode;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      key={character}
      style={[globalStyles.key, style]}
      onPress={() => onPressKey(character)}
    >
      {children ? (
        children
      ) : (
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {character}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default function StepThreeScreen() {
  const [expression, setExpression] = useState(""); // Estado para la nueva proposición
  const [currentSelection, setCurrentSelection] = useState({
    start: 0,
    end: 0,
  }); // Estado para la posición del cursor
  const inputRef = useRef<TextInput>(null); // Referencia para el TextInput

  const [isOpen, setIsOpen] = useState(false);

  const { expressions, newExpression, removeExpression, propositions } =
    useTruthTableStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const handleButtonClick = (value?: string) => {
    const { start, end } = currentSelection;

    const newText = expression.slice(0, start) + value + expression.slice(end);
    setExpression(newText);
    setCurrentSelection({
      start: end,
      end: end,
    });

    if (start === end) {
      inputRef.current?.setSelection(end + 1, end + 1);
    } else {
      inputRef.current?.setSelection(end, end);
    }
  };

  const handleBackspace = () => {
    const { start, end } = currentSelection;
    if ([start, end].includes(0)) return;
    const newText = expression.slice(0, start - 1) + expression.slice(end);
    setExpression(newText);
  };

  const logicalCharacters = ["¬", "∧", "∨", "(", ")"];

  // Función para agregar una proposición
  const addExpression = () => {
    if (!expression.trim()) {
      Alert.alert("Error", "La expresión no puede estar vacía.");
      return;
    }
    if (expressions.includes(expression)) {
      Alert.alert("Error", "La proposición ya existe.");
      return;
    }
    newExpression(expression);
    setExpression("");
    setCurrentSelection({ start: 0, end: 0 });
  };

  const ExpressionInput = (
    <View
      style={{
        marginTop: 16,
        flexDirection: "row",
        gap: 8,
      }}
    >
      <TextInput
        ref={inputRef}
        value={expression}
        onChangeText={setExpression}
        placeholder="Introduce tus expresiones..."
        style={globalStyles.input}
        onPress={() => {
          bottomSheetRef.current?.expand();
          setIsOpen(true);
        }}
        placeholderTextColor={Colors.dark.icon}
        showSoftInputOnFocus={false}
        onSelectionChange={(event) => {
          const { end, start } = event.nativeEvent.selection;
          setCurrentSelection({ start, end });
        }}
      />
      {expression.length ? (
        <TouchableOpacity
          onPress={addExpression}
          style={[
            globalStyles.squareButton,
            {
              backgroundColor: Colors.success,
            },
          ]}
        >
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      ) : (
        <Link
          href={"/result"}
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
            onPress={() => bottomSheetRef.current?.close()}
            activeOpacity={0.5}
            disabled={!propositions.length}
          >
            <Ionicons name="chevron-forward" size={30} color="white" />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  return (
    <ThemedView style={{ flex: 1, padding: 16, paddingTop: 32 }}>
      <ThemedText type="title">Paso 3:</ThemedText>
      <ThemedText type="subtitle">Crea expresiones complejas</ThemedText>

      {/* Lista de proposiciones */}
      <FlatList
        data={expressions}
        style={{ marginTop: 16 }}
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
              onPress={() => removeExpression(item)}
              style={{ height: "100%", justifyContent: "center" }}
            >
              <Ionicons name="trash" size={20} color={Colors.error} />
            </TouchableOpacity>
          </View>
        )}
      />

      {ExpressionInput}
      {isOpen ? (
        <Pressable
          style={[StyleSheet.absoluteFill]}
          onPress={() => {
            setIsOpen(false);
            bottomSheetRef.current?.close();
          }}
        />
      ) : null}

      <BottomSheet
        index={-1}
        backdropComponent={renderBackdrop}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        handleStyle={{ backgroundColor: Colors.table.header, padding: 4 }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        style={{ backgroundColor: Colors.dark.background }}
      >
        <BottomSheetView
          style={{
            backgroundColor: Colors.dark.background,
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          {ExpressionInput}
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: Colors.table.header,
              marginVertical: 16,
            }}
          />
          <View style={{ gap: 4 }}>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <View style={{ gap: 4, flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 4,
                  }}
                >
                  {propositions.map((character) => (
                    <KeyButton
                      key={character}
                      character={character}
                      onPressKey={handleButtonClick}
                    />
                  ))}
                </View>

                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}
                >
                  {logicalCharacters.map((character) => (
                    <KeyButton
                      key={character}
                      character={character}
                      onPressKey={handleButtonClick}
                    />
                  ))}
                </View>
              </View>
              <View style={{}}>
                <KeyButton
                  character={" "}
                  onPressKey={handleBackspace}
                  style={{ backgroundColor: Colors.error, width: 36 + 36 + 4 }}
                >
                  <MaterialIcons name="backspace" color={"white"} size={30} />
                </KeyButton>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
              <KeyButton
                character={" "}
                onPressKey={handleButtonClick}
                style={{ flex: 1, backgroundColor: Colors.primary }}
              >
                <MaterialIcons name="space-bar" color={"white"} size={30} />
              </KeyButton>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </ThemedView>
  );
}
