import { headerActionsType } from "./header.types";

const INITIAL_STATE = {
    isDropDownOpen: false,
}

const headerReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case headerActionsType.DROP_DOWN_OPEN:
           return {

             ...state, isDropDownOpen: !state.isDropDownOpen,

           };

         default: return state;

    }

};

export default headerReducer;