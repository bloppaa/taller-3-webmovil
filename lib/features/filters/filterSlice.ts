import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  status: string;
  type: string;
  region: string;
  search: string;
}

const initialState: FilterState = {
  status: "All",
  type: "All",
  region: "All",
  search: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setRegion: (state, action: PayloadAction<string>) => {
      state.region = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    resetFilters: (state) => {
      state.status = "All";
      state.type = "All";
      state.region = "All";
      state.search = "";
    },
    // Hydrate action if needed, but we'll try to use preloadedState
    hydrate: (state, action: PayloadAction<FilterState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setStatus,
  setType,
  setRegion,
  setSearch,
  resetFilters,
  hydrate,
} = filterSlice.actions;
export default filterSlice.reducer;
