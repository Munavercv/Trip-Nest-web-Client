import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/api";

export const fetchApplicationCounts = createAsyncThunk(
    "applicationCounts/fetchCounts",
    async () => {
        const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-all-applications-count`);
        return response.data.counts;
    }
);

const initialState = [
    { _id: "pending", count: 0 },
    { _id: "approved", count: 0 },
    { _id: "rejected", count: 0 },
    { _id: "activated", count: 0 },
];

const applicationCountsSlice = createSlice({
    name: "applicationCounts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchApplicationCounts.fulfilled, (state, action) => {
            return state.map(status => ({
                _id: status._id,
                count: action.payload.find(item => item._id === status._id)?.count || 0,
            }));
        });
    }
});

export default applicationCountsSlice.reducer;
