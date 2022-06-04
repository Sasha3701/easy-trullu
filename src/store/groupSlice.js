import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { v4 } from "uuid";

const defaultStateGroup = {
  id: "",
  title: "",
  cards: [],
};

const initialState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, payload) => {
      const newGroup = cloneDeep(defaultStateGroup);
      newGroup.id = v4();
      newGroup.title = payload;
      state.groups = [...cloneDeep(state.groups), newGroup];
    }
  },
});

export const { addGroup } = groupsSlice.actions;

export default groupsSlice.reducer;
