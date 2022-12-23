import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {
            state.heroesLoadingStatus = 'loading' //дужки обовязкові,щоб працювала іммутабельність
        },
        heroesFetched: (state, action) => {
                    state.heroes = action.payload;
                    state.heroesLoadingStatus = 'idle'
                },
        heroesFetchingError: state => {
                    state.heroesLoadingStatus = 'error'
                },
        heroCreated: (state, action) => {
                    state.heroes.push(action.payload)
                },
        heroDeleted: (state, action) => {
                    state.heroes = state.heroes.filter(item => item.id !== action.payload)
                }
    }
});

const {actions, reducer} = heroSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;