import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

export const fetchFiters = createAsyncThunk(
    'filters/fetchFiters',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters")
    }
)

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterChanged: (state, action) => {
            state.activeFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFiters.pending, state => {
                state.filtersLoadingStatus = 'loading'
            })
            .addCase(fetchFiters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                state.filters = action.payload
            })
            .addCase(fetchFiters.rejected, state => {
                state.filtersLoadingStatus = 'error'
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filterSlice;
export default reducer;
export const {
        filtersFetching,
        filtersFetched,
        filtersFetchingError,
        filterChanged
} = actions;