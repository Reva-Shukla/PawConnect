
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchShelters = createAsyncThunk(
  "shelters/fetchShelters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/shelters.json");

      if (!response.ok) {
        throw new Error("Failed to fetch shelters");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid shelter data");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to load shelters"
      );
    }
  }
);

const shelterSlice = createSlice({
  name: "shelters",

  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  reducers: {
    addShelter: (state, action) => {
      state.list.push(action.payload);
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchShelters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShelters.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchShelters.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to load shelters";
      });
  },
});

export const { addShelter } = shelterSlice.actions;

export const selectShelters = (state) => state.shelters.list;
export const selectShelterLoading = (state) => state.shelters.loading;
export const selectShelterError = (state) => state.shelters.error;

export default shelterSlice.reducer;
