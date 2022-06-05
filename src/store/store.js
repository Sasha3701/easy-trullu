import { configureStore } from "@reduxjs/toolkit";
import groupsSlice from "./groupSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    groups: groupsSlice,
    modal: modalSlice
  },
});
