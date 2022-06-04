import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { v4 } from "uuid";

const defaultStateGroup = {
  id: "",
  title: "",
  cards: [],
};

const defaultStateCard = {
  id: "",
  title: "",
  description: "",
};

const initialState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, { payload }) => {
      const newGroup = cloneDeep(defaultStateGroup);
      newGroup.id = v4();
      newGroup.title = payload;
      state.groups = [...cloneDeep(state.groups), newGroup];
    },
    removeGroup: (state, { payload }) => {
      state.groups = cloneDeep(state.groups).filter(({ id }) => id !== payload);
    },
    addCard: (state, { payload }) => {
      const { title, groupId } = payload;
      const newCard = cloneDeep(defaultStateCard);
      newCard.id = v4();
      newCard.title = title;
      const currentGroup = state.groups.find(({ id }) => id === groupId);
      currentGroup.cards.push(newCard);
    },
    removeCard: (state, { payload }) => {
      const { id, groupId } = payload;
      const currentGroup = state.groups.find(({ id }) => id === groupId);
      currentGroup.cards = cloneDeep(currentGroup.cards).filter(
        (card) => card.id !== id
      );
    },
    removeAllCards: (state, { payload }) => {
      const currentGroup = state.groups.find(({ id }) => id === payload);
      currentGroup.cards = [];
    },
  },
});

export const { addGroup, addCard, removeCard, removeGroup, removeAllCards } =
  groupsSlice.actions;

export default groupsSlice.reducer;
