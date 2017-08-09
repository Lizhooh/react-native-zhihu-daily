import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers';

export default store = createStore(
    combineReducers({
        ...reducers
    }),
    compose(
        applyMiddleware(thunk),
    )
);
