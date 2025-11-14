import { createSlice } from "@reduxjs/toolkit";
import { BET, RAISE, CALL, CHECK, FOLD } from "../const/const";
import {
  selected,
  gridFontSize,
  suited_bg,
  offsuit_bg,
  pp_bg,
  suited_unselectable,
  offsuit_unselectable,
  pp_unselectable,
  bet_color,
  call_color,
  fold_color,
} from "../const/styles";

export const styleSlice = createSlice({
  name: "style",
  initialState: {
    gridFontSize,
    colors: {
      selected,
      suited_bg,
      offsuit_bg,
      pp_bg,
      suited_unselectable,
      offsuit_unselectable,
      pp_unselectable,
      [BET]: bet_color,
      [RAISE]: bet_color,
      [CALL]: call_color,
      [CHECK]: call_color,
      [FOLD]: fold_color,
    },
  },
  reducers: {
    setGridFontSize: (state, action) => {
      state.gridFontSize = action.payload;
    },
  },
});

export const { setGridFontSize } = styleSlice.actions;

export default styleSlice.reducer;
