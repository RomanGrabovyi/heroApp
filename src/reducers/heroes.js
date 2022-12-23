import { createReducer } from "@reduxjs/toolkit";
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} from '../actions/index';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

const heroes = createReducer(initialState, {// працює лише в нативному js
    [heroesFetching]: state => {
                    state.heroesLoadingStatus = 'loading' //дужки обовязкові,щоб працювала іммутабельність
                },
    [heroesFetched]: (state, action) => {
                    state.heroes = action.payload;
                    state.heroesLoadingStatus = 'idle'
                },
    [heroesFetchingError]: state => {
                    state.heroesLoadingStatus = 'error'
                },
    [heroCreated]: (state, action) => {
                    state.heroes.push(action.payload)
                },
    [heroDeleted]: (state, action) => {
                    state.heroes = state.heroes.filter(item => item.id !== action.payload)
                }
    },[],state => state
)


export default heroes;