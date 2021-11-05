import { createSlice } from '@reduxjs/toolkit';

export type InterfaceState = {
  favoriteChecked: boolean;
  starTrigger: boolean;
  open: boolean;
};

const initialState: InterfaceState = {
  favoriteChecked: false,
  starTrigger: false,
  open: false,
};

export const interfaceSlice = createSlice({
  name: 'interface',
  initialState,
  reducers: {
    setFavoriteChecked: (state) => {
      state.favoriteChecked = !state.favoriteChecked;
    },
    setStarTrigger: (state) => {
      state.starTrigger = !state.starTrigger;
    },
    setOpen: (state, { payload }) => {
      state.open = payload;
    },
  },
});

export const { setFavoriteChecked, setStarTrigger, setOpen } =
  interfaceSlice.actions;
export default interfaceSlice.reducer;
