import { headerActionsType } from "./header.types";

export const toggleDropDown = () => {
    return{
        type: headerActionsType.DROP_DOWN_OPEN
    }
}