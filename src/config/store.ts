import { configureStore } from "@reduxjs/toolkit";
import styleReducer from "../slices/styleSlice";

const store = configureStore({
  reducer: {
    style: styleReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
