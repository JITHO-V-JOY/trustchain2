import * as  ActionTypes from './ActionTypes';

export const TrustChainData = (state = {
    isLoading: true, 
    errMess: null,
    request:[],
    requestCount:[],
    verify:[],
    trustChain: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_TRUSTCHAIN_DATA:
            return{...state, isLoading:false, errMess:null, trustChain: action.payload};
        case ActionTypes.TRUSTCHAIN_DATA_LOADING:
            return{...state, isLoading:true, errMess:null, request:[], requestCount:[], trustChain: []};
        case ActionTypes.ADD_TRUSTCHAIN_REQUEST:
            return{...state, isLoading:true, errMess:null, request: action.payload };
        case ActionTypes.ADD_TRUSTCHAIN_VERIFY:
                return{...state, isLoading:true, errMess:null, verify: action.payload};
        case ActionTypes.ADD_TRUSTCHAIN_REQUEST_ID:
            return{...state, isLoading:false, errMess:null, requestCount: action.payload};
         case ActionTypes.TRUSTCHAIN_DATA_FAILED:
             return{...state, isLoading:true, errMess:action.payload ,requestCount: action.payload};                    
        default:
            return state;    
    }
}