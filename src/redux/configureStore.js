import { createStore , combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {Status} from './status';
import {Images} from './share';
import {Person} from './addPerson';
import {TrustChainData} from './addTrustChainData';
import {Payment} from './addPayment';
import {Request} from './addRequest';
import {User} from './addUser';


export const ConfigureStore =()=>{
    const store = createStore(
        combineReducers({
            status: Status,
            images: Images,
            Person: Person,
            TrustChainData: TrustChainData,
            Payment: Payment,
            Request: Request,
            User: User
           
        }),
        applyMiddleware(thunk, logger)
      
    );

    return store;
}