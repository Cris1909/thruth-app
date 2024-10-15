// Función para generar las combinaciones de verdad con el patrón correcto
export const generateTruthTable = (propositions: string[], expressions: string[]) => {
  const propisitionsLength = propositions.length;
  let truthTable = [];

  // Siguiendo la formula de 2^n se obtiene el número de filas
  const rowCount = Math.pow(2, propisitionsLength);
  
  // Generar todas las combinaciones posibles
  for (let i = 0; i < rowCount; i++) {
    // Variable para guardar los valores de cada fila
    const row: Record<string, boolean> = {};

    // Iteración de las proposiciones
    for (let j = 0; j < propisitionsLength; j++) {
      const repeatCount = Math.pow(2, propisitionsLength - j - 1);
      row[propositions[j]] = Math.floor(i / repeatCount) % 2 === 0;
    }

    // Evaluar las expresiones lógicas
    for (let expression of expressions) {
      row[expression] = evaluateExpression(expression, row, propositions);
    }

    // Se añade la fila a la tabla de verdad
    truthTable.push(row);
  }

  return truthTable;
};

// Función para evaluar la expresión lógica de forma dinámica
export const evaluateExpression = (
  expression: string,
  values: Record<string, boolean>,
  propositions: string[]
) => {
  let evaluatedExpr = expression;

  propositions.forEach((prop) => {
    evaluatedExpr = evaluatedExpr.replace(
      new RegExp(`\\b${prop}\\b`, "g"),
      values[prop] ? "true" : "false"
    );
  });

  // Reemplazar operadores lógicos con funciones JavaScript
  evaluatedExpr = evaluatedExpr
    .replace(/∧/g, "&&")
    .replace(/∨/g, "||")
    .replace(/¬/g, "!")
    .replace(/→/g, "|| !") // a → b es lo mismo que !a || b
    .replace(/↔/g, "==="); // a ↔ b es lo mismo que a === b

  return eval(evaluatedExpr);
};