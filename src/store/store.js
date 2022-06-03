import { configureStore } from "@reduxjs/toolkit";
import groupsSlice from "./groupSlice";

export const store = configureStore({
  reducer: {
    groups: groupsSlice,
  },
});
