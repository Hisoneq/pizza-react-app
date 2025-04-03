import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  isActiveToggle: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    toggleSortOrder(state) {
      state.isActiveToggle = !state.isActiveToggle;
    },
  },
});

export const { setCategoryId, setSort, toggleSortOrder } = filterSlice.actions;
export default filterSlice.reducer;
