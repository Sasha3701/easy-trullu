import { createSlice } from "@reduxjs/toolkit";

// const defaultStateGroup = {
//   id: "",
//   title: "",
//   cards: [],
// };

const initialState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
});

export const { } = groupsSlice.actions;

export default groupsSlice.reducer;
