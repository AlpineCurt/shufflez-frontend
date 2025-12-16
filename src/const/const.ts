import {
  STRAIGHT_FLUSH,
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  FLUSH,
  STRAIGHT,
  THREE_OF_A_KIND,
  TWO_PAIR,
  ONE_PAIR,
  HIGH_CARD,
  FLUSH_DRAW,
  STRAIGHT_DRAW,
  OVERPAIR,
  PP_BELOW_TP,
  UNDERPAIR,
  TOP_PAIR,
  TPTK,
  WEAK_PAIR,
  MIDDLE_PAIR,
  NUT_FLUSH,
  SECOND_NUT_FLUSH,
  THIRD_NUT_FLUSH,
  NUT_FLUSH_DRAW,
  SECOND_NUT_FLUSH_DRAW,
  BD_FD_ONE_CARD,
  BD_FD_TWO_CARDS,
  OESD_STR,
  GUTSHOT_STR,
} from "shufflez-calc";

export const BET = "bet";
export const RAISE = "raise";
export const CALL = "call";
export const CHECK = "check";
export const FOLD = "fold";

/** Index can be used to sort and order ranks */
export const ranks = ["A", "K", "Q", "J", "T", 9, 8, 7, 6, 5, 4, 3, 2];

export const suits_str = ["s", "c", "h", "d"];

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

/** BoardDisplay and Card */
export const SHEET_WIDTH = 2171;
export const SHEET_HEIGHT = 880;
export const SHEET_CARD_WIDTH = 167;
export const SHEET_CARD_HEIGHT = 220;
export const SHEET_SUIT_IDX: { [suit: string]: number } = {
  s: 0,
  c: 1,
  d: 2,
  h: 3,
};
export const DEFAULT_CARD_WIDTH = 50;
export const CARD_MARGIN = 5;
export const SHOW_BACK = "back";
export const BACK_SHEET_WIDTH = 612;
export const BACK_SHEET_HEIGHT = 408;
export const CARD_BACK_HEIGHT = 408;
export const CARD_BACK_WIDTH = 285;

export const FLOPZILLA_ARR = [
  STRAIGHT_FLUSH,
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  [FLUSH, [NUT_FLUSH, SECOND_NUT_FLUSH, THIRD_NUT_FLUSH]],
  STRAIGHT,
  THREE_OF_A_KIND,
  TWO_PAIR,
  OVERPAIR,
  [TOP_PAIR, [TPTK]],
  MIDDLE_PAIR,
  WEAK_PAIR,
  [
    FLUSH_DRAW,
    [NUT_FLUSH_DRAW, SECOND_NUT_FLUSH_DRAW, BD_FD_ONE_CARD, BD_FD_TWO_CARDS],
  ],
  [STRAIGHT_DRAW, [OESD_STR, GUTSHOT_STR]],
];
