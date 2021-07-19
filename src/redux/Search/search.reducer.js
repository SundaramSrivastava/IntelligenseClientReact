import  searchTypes from "./search.types";

const INITIAL_STATE = {
    result: {
    },
    isLoading: false,
    searchQuery: {

    }
}

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case searchTypes.SET_RESULT:

           return {

             ...state, isLoading: false,

           };
        
           case searchTypes.SET_START_SEARCH:

            return {
 
              ...state, isLoading: true,
 
            };

        case searchTypes.SET_SEARCH_QUERY:
            // SET IT WITH PAYLOAD
           return {
              ...state, isLoggedIn: false,

           };

         default: return state;

    }

};

export default userReducer;
