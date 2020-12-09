import * as  ActionTypes from './ActionTypes';

export const Payment = (state = {
   isLoading: false,
   errMess: null,
   paymentSuccess: false
}, action) => {
    switch(action.type){
        case ActionTypes.PAY_SUCCESS:
            return{...state, isLoading: false, errMess: null, paymentSuccess: true};
        case ActionTypes.PAY_FAILED:
            return{...state, isLoading: false, errMess: action.payload, paymentSuccess: false};
        case ActionTypes.PAY_LOADING:
            return{...state, isLoading: true, errMess: null, paymentSuccess: false};
                             
        default:
            return state;    
    }
}