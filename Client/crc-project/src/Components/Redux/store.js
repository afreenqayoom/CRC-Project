import { createStore } from 'redux';
import addReducer from './reducer';

const store = createStore(addReducer);


export default store;