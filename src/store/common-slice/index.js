import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

// Existing Thunk for getting feature images
export const getFeatureImages = createAsyncThunk(
  "/common/getFeatureImages", // Corrected path to common, was /order
  async () => {
    const response = await axios.get(
      `http://localhost:5000/api/common/feature/get`
    );
    return response.data;
  }
);

// Existing Thunk for adding feature image
export const addFeatureImage = createAsyncThunk(
  "/common/addFeatureImage", // Corrected path to common, was /order
  async (image) => {
    const response = await axios.post(
      `http://localhost:5000/api/common/feature/add`,
      { image }
    );
    return response.data;
  }
);

// NEW THUNK FOR DELETING FEATURE IMAGE
export const deleteFeatureImage = createAsyncThunk(
  "/common/deleteFeatureImage", // Unique name for this thunk
  async (imageId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/common/feature/delete/${imageId}` // Adjust the endpoint based on your backend
      );
      return response.data; // This should ideally contain a success message or confirmation
    } catch (error) {
      // Use rejectWithValue to pass the error to the rejected action
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Reducers for getFeatureImages
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      // Reducers for addFeatureImage (optional, but good practice)
      .addCase(addFeatureImage.pending, (state) => {
        // state.isLoading = true; // You might want to show a loading state for add
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        // state.isLoading = false; // Reset loading state
        // You might choose to add the new image to the list here,
        // but since you're re-fetching the list after add, it's not strictly necessary.
        // state.featureImageList.push(action.payload.data); // If your backend returns the new image
      })
      .addCase(addFeatureImage.rejected, (state) => {
        // state.isLoading = false; // Reset loading state
      })
      // NEW REDUCERS FOR deleteFeatureImage
      .addCase(deleteFeatureImage.pending, (state) => {
        // You can set a loading state here if you want to indicate deletion in progress
        // state.isLoading = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        // state.isLoading = false; // Reset loading state
        // If your backend returns the ID of the deleted item, you could remove it from the state here
        // For example: state.featureImageList = state.featureImageList.filter(item => item._id !== action.meta.arg);
        // However, since you are re-fetching the list in AdminDashboard after deletion,
        // direct state manipulation here is not strictly required.
      })
      .addCase(deleteFeatureImage.rejected, (state, action) => {
        // state.isLoading = false; // Reset loading state
        console.error("Failed to delete feature image:", action.payload);
        // You might want to add error handling or a notification here
      });
  },
});

export default commonSlice.reducer;
