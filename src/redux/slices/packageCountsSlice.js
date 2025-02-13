import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/api";

export const fetchPackageCounts = createAsyncThunk(
    "packageCounts/fetchCounts",
    async () => {
        const response = await axios.get(`${config.API_BASE_URL}/api/admin/get-all-packages-count`);
        return response.data.counts;
    }
);

const initialState = [
    { _id: "active", count: 0 },
    { _id: "approved", count: 0 },
    { _id: "pending", count: 0 },
    { _id: "inactive", count: 0 },
    { _id: "rejected", count: 0 },
    { _id: "expired", count: 0 },
];

const packageCountsSlice = createSlice({
    name: "packageCounts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPackageCounts.fulfilled, (state, action) => {
            return state.map(status => ({
                _id: status._id,
                count: action.payload.find(item => item._id === status._id)?.count || 0,
            }));
        });
    }
});

export default packageCountsSlice.reducer;