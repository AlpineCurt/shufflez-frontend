import { BET, CALL, CHECK, FOLD, RAISE } from "./const";

export type Rank = string | number;

export type CellInfo = {
  totalCombos?: number;
  selectableCombos: number;
  actions: {
    [action: string]: number;
  };
};

export type CellActions = {
  [cellLabel: string]: CellInfo;
};

export type ActionsObj = {
  [action: string]: string[];
};

export type AnyAction =
  | typeof BET
  | typeof RAISE
  | typeof CALL
  | typeof CHECK
  | typeof FOLD;
