import * as  ActionTypes from './ActionTypes';

export const User = (state = {
   role: "user"
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_USER:
            return{...state, role: action.payload};
        default:
            return state;    
    }
}