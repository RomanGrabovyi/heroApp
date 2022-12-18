const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filterLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            const newHeroList = state.heroes.filter(item => item.id !== action.payload)
            return {
                ...state,
                heroes: newHeroList

            }
        case 'HERO_CREATED':
            const newCreatedHeroList = [...state.heroes, action.payload]
            return{
                ...state,
                heroes: newCreatedHeroList
            }
        case 'FILTER_FETCHING':
            return {
                ...state,
                filterLoadingStatus: 'loading'
            }
        case 'FITER_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filterLoadingStatus: 'idle'
            }
        case 'FILTER_FETCHING_ERROR':
            return {
                ...state,
                filterLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                                state.heroes :
                                state.heroes.filter(item => item.element === action.payload)
            }
        default: return state
    }
}

export default reducer;