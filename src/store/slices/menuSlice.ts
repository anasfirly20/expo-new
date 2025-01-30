import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGETMenu } from "@/src/api/types";

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface MenuState {
  data: TGETMenu | null;
  status: Status;
}

const initialState: MenuState = {
  data: null,
  status: Status.SUCCESS,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenuData: (state, action: PayloadAction<TGETMenu>) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
  },
});

export const { setMenuData, setStatus } = menuSlice.actions;
export default menuSlice.reducer;
