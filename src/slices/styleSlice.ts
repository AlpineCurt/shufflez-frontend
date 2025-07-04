import { createSlice } from "@reduxjs/toolkit";

export const styleSlice = createSlice({
  name: "style",
  initialState: {
    gridFontSize: 14,
    suited_bg: "#efd59a",
    offsuit_bg: "#93abd2",
    pp_bg: "#4682e2",
    suited_unselectable: "#e6e6e6",
    offsuit_unselectable: "#bdbdbd",
    pp_unselectable: "#8a8a8a",
  },
  reducers: {
    setGridFontSize: (state, action) => {
      state.gridFontSize = action.payload;
    },
  },
});

export const { setGridFontSize } = styleSlice.actions;

export default styleSlice.reducer;
