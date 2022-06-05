export const selectGroupsState = (state) => state.groups.groups;

export const selectModalState = (state) => state.modal;

export const selectModalStatus = (state) => selectModalState(state).status;

export const selectModalCard = (state) => selectModalState(state).card;
