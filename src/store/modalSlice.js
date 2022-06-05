import { createSlice } from "@reduxjs/toolkit";

const defaultStateCard = {
  id: "",
  title: "",
  description: "",
};

const initialState = {
  status: false,
  card: defaultStateCard,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeStatusModal: (state) => {
      state.status = !state.status;
    },
    changeContentModal: (state, { payload }) => {
      state.card = payload;
      state.status = true;
    } 
  },
});

export const { changeStatusModal, changeContentModal } = modalSlice.actions;

export default modalSlice.reducer;
