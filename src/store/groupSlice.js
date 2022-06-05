import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { v4 } from "uuid";

const defaultStateGroup = {
  id: "",
  title: "",
  order: 0,
  cards: [],
};

const defaultStateCard = {
  id: "",
  title: "",
  order: 0,
  description: "",
};

const initialState = {
  groups: [],
  currentCard: null,
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup: (state, { payload }) => {
      const newGroup = cloneDeep(defaultStateGroup);
      newGroup.id = v4();
      newGroup.title = payload;
      const lastOrder =
        state.groups.length && cloneDeep(state.groups).splice(-1)[0].order;
      newGroup.order = lastOrder + 1;
      state.groups = [...cloneDeep(state.groups), newGroup];
    },
    removeGroup: (state, { payload }) => {
      state.groups = cloneDeep(state.groups).filter(({ id }) => id !== payload);
    },
    reorderGroups: (state, { payload }) => {
      const { from, to } = payload;
      const { order: orderFrom, id: idFrom } = from;
      const { order: orderTo, id: idTo } = to;
      const groupFrom = state.groups.find(({ id }) => id === idFrom);
      groupFrom.order = orderTo;
      const groupTo = state.groups.find(({ id }) => id === idTo);
      groupTo.order = orderFrom;
      state.groups.sort((a, b) => a.order - b.order);
    },
    addCard: (state, { payload }) => {
      const { title, groupId } = payload;
      const newCard = cloneDeep(defaultStateCard);
      newCard.id = v4();
      newCard.title = title;
      const currentGroup = state.groups.find(({ id }) => id === groupId);
      const lastOrder =
        currentGroup.cards.length &&
        cloneDeep(currentGroup.cards).splice(-1)[0].order;
      newCard.order = lastOrder + 1;
      currentGroup.cards.push(newCard);
    },
    replaceCardFromAnotherGroup: (state, { payload }) => {
      const { cardId, groupId, currentGroupId } = payload;
      const group = state.groups.find(({ id }) => id === groupId);
      const currentGroup = state.groups.find(({ id }) => id === currentGroupId);
      const newCard = cloneDeep(group).cards.find(({ id }) => id === cardId);
      group.cards = cloneDeep(group).cards.filter(({ id }) => id !== cardId);
      currentGroup.cards.push(newCard);
      state.currentCard = null;
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
    reorderCards: (state, { payload }) => {
      const { from, to } = payload;
      const { groupId: groupIdFrom, card: cardFrom } = from;
      const { groupId: groupIdTo, card: cardTo } = to;
      const { order: orderFrom, id: idFrom } = cardFrom;
      const { order: orderTo, id: idTo } = cardTo;
      const currentGroupFrom = state.groups.find(
        ({ id }) => id === groupIdFrom
      );
      const currentCardFrom = currentGroupFrom.cards.find(
        ({ id }) => id === idFrom
      );
      currentCardFrom.order = orderTo;
      const currentGroupTo = state.groups.find(({ id }) => id === groupIdTo);
      const currentCardTo = currentGroupTo.cards.find(({ id }) => id === idTo);
      currentCardTo.order = orderFrom;
      currentGroupFrom.cards.sort((a, b) => a.order - b.order);
      currentGroupTo.cards.sort((a, b) => a.order - b.order);
      state.currentCard = null;
    },
    saveCurrentCard: (state, { payload }) => {
      state.currentCard = payload;
    }
  },
});

export const {
  addGroup,
  addCard,
  replaceCardFromAnotherGroup,
  removeCard,
  removeGroup,
  removeAllCards,
  reorderGroups,
  reorderCards,
  saveCurrentCard,
} = groupsSlice.actions;

export default groupsSlice.reducer;
