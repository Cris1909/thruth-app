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
      style={[globalStyles.squareButton, style]}
      onPress={() => onPressKey(character)}
    >
      {children ? (
        children
      ) : (
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 24 }}>
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

  const { expressions, newExpression, removeExpression, propositions } =
    useTruthTableStore();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
    setExpression(""); // Limpiar el campo de texto
    setCurrentSelection({ start: 0, end: 0 }); // Reiniciar la posición del cursor
  };

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
    <ThemedView style={{ flex: 1, padding: 24 }}>
      <ThemedText type="title">Paso 3:</ThemedText>
      <ThemedText type="subtitle">Crea expresiones complejas</ThemedText>

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
          ref={inputRef}
          value={expression}
          onChangeText={setExpression}
          placeholder="Introduce tus expresiones..."
          style={globalStyles.input}
          placeholderTextColor={Colors.dark.icon}
          showSoftInputOnFocus={false}
          onSelectionChange={(event) => {
            const { end, start } = event.nativeEvent.selection;
            setCurrentSelection({ start, end });
          }}
        />

        {/* Botón para añadir la proposición */}
        <TouchableOpacity
          onPress={addExpression}
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

      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: Colors.table.header,
          marginVertical: 16,
        }}
      />
      {expressions.length ? (
        <ThemedText type="default">Expresiones creadas:</ThemedText>
      ) : null}

      {/* Lista de proposiciones */}
      <FlatList
        data={expressions}
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
              onPress={() => removeExpression(item)}
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
        <GlobalLink disabled={!expressions.length} href={"/step-2"}>
          {expressions.length ? "Continuar" : "Añade al menos una proposición"}
        </GlobalLink>
      </View>
      {/* 
      <Pressable
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor:  }
          ]}
          onPress={handleClose}
        /> */}

      <BottomSheet
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
            paddingHorizontal: 24,
            paddingBottom: 24,
            paddingTop: 16,
           
          }}
        >
          <View style={{ gap: 8 }}>
            {/* Proposiciones */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {propositions.map((character) => (
                <KeyButton
                  key={character}
                  character={character}
                  onPressKey={handleButtonClick}
                />
              ))}
            </View>

            {/* Caracteres logicos */}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {logicalCharacters.map((character) => (
                <KeyButton
                  key={character}
                  character={character}
                  onPressKey={handleButtonClick}
                />
              ))}
            </View>

            {/* Espacio y borrar */}
            <View style={{ flexDirection: "row", gap: 8 }}>
              <KeyButton
                character={" "}
                onPressKey={handleButtonClick}
                style={{ flex: 1, backgroundColor: Colors.primary }}
              >
                <MaterialIcons name="space-bar" color={"white"} size={32} />
              </KeyButton>

              <KeyButton
                character={" "}
                onPressKey={handleBackspace}
                style={{ backgroundColor: Colors.error, width: 100 }}
              >
                <MaterialIcons name="backspace" color={"white"} size={32} />
              </KeyButton>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </ThemedView>
  );
}
