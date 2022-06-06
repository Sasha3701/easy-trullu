import { configureStore } from "@reduxjs/toolkit";
import groupsSlice from "./groupSlice";
import modalSlice from "./modalSlice";

const saveToLocalStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

const loadFromLocalStorage = () => {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    groups: groupsSlice,
    modal: modalSlice
  },
  preloadedState: loadFromLocalStorage()
}, );

store.subscribe(() => saveToLocalStorage(store.getState()));