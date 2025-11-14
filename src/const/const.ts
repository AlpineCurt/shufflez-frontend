export const BET = "bet";
export const RAISE = "raise";
export const CALL = "call";
export const CHECK = "check";
export const FOLD = "fold";

/** Index can be used to sort and order ranks */
export const ranks = ["A", "K", "Q", "J", "T", 9, 8, 7, 6, 5, 4, 3, 2];

/** face to value */
export const f2v: { [face: string | number]: number } = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

/** value to face */
export const v2f = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "T",
  11: "J",
  12: "Q",
  13: "K",
  14: "A",
};

export const CELL_MAX_WIDTH = 35;
export const CELL_MAX_HEIGHT = 35;
export const CELL_FONT_SIZE = 13;
export const CELL_BORDER_STYLE = "1px solid black";

/** RangeMatrix Cell color fill order from bottom to top
 */
export const ACTION_ORDER: string[] = [FOLD, CALL, CHECK, RAISE, BET];
