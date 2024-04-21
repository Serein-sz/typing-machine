import { create } from "zustand";

const exampleOne = `import { create } from "zustand";

interface codeStore {
  codes: string[];
  appendCode: () => void;
}

const useCodeStore = create<codeStore>(set => ({
  codes: [],
  appendCode: () =>
    set((state: { codes: string[] }) => ({ codes: [...state.codes, ""] }))
}));

export default useCodeStore;
`;

const exampleTwo = `import { create } from "zustand";

interface codeStore {
  codes: string[];
  editCode: (code: string) => void;
}

const useCodeStore = create<codeStore>(set => ({
  codes: [],
  editCode: (code: string) => void;
}));

export default useCodeStore;
`;

interface codeStore {
  codes: string[];
  cursorIndex: number;
  appendCode: () => void;
  editCode: (code: string) => void;
  removeCode: (index: number) => void;
  changeCursorIndex: (index: number) => void;
}

const useCodeStore = create<codeStore>(set => ({
  codes: [exampleOne, exampleTwo],
  cursorIndex: 0,
  appendCode: () =>
    set(state => ({
      ...state,
      codes: [...state.codes, ""],
      cursorIndex: state.codes.length
    })),
  editCode: code => {
    set(state => {
      const newCodes = [...state.codes];
      newCodes[state.cursorIndex] = code;
      return { ...state, codes: newCodes };
    });
  },
  removeCode: index => {
    set(state => {
      const newCodes = [...state.codes];
      newCodes.splice(index, 1);
      return { ...state, codes: newCodes };
    });
  },
  changeCursorIndex: index => {
    set(state => {
      return { ...state, cursorIndex: index };
    });
  }
}));

export default useCodeStore;
