import { searchTypes } from "./search.types"

export const getSearchResult = () => {
    return{
        type: searchTypes.SET_RESULT
    }
}

export const startSearchResult = () => {
    return{
        type: searchTypes.SET_START_SEARCH
    }
}

export const setSearchQuery = () => {
    return{
        type: searchTypes.SET_SEARCH_QUERY
    }
}