import { create } from "zustand";

interface State {
  propositions: string[];
  expressions: string[];
}

interface Actions {
  newProposition: (proposition: string) => void;
  removeProposition: (proposition: string) => void;
  newExpression: (expression: string) => void;
  removeExpression: (expression: string) => void;
}

export const useTruthTableStore = create<State & Actions>()((set, get) => ({
  // State
  propositions: [],
  expressions: [],
  // Methods
  newProposition: (proposition) => {
    set({ propositions: [...get().propositions, proposition] });
  },
  removeProposition: (proposition) => {
    set({
      propositions: get().propositions.filter((p) => p !== proposition),
    });
  },
  newExpression: (expression) => {
    set({ expressions: [...get().expressions, expression] });
  },
  removeExpression: (expression) => {
    set({
      expressions: get().expressions.filter((e) => e !== expression),
    });
  },
}));
