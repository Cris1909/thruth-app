import { create } from "zustand";

interface State {
  propositions: string[];
}

interface Actions {
  newProposition: (proposition: string) => void;
  removeProposition: (proposition: string) => void;
}

export const useTruthTableStore = create<State & Actions>()((set, get) => ({
  // State
  propositions: [],
  // Methods
  newProposition: (proposition) => {
    set({ propositions: [...get().propositions, proposition] });
  },
  removeProposition: (proposition) => {
    set({
      propositions: get().propositions.filter((p) => p !== proposition),
    });
  },
}));
