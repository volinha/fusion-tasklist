import { createStore } from 'redux';
import rootReducer from './reducers';

// convert obj to string and store in localstorage
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serializedState);
    } catch (e) {
        console.warn(e);
    }
}

// load string from localStorage and convert into an object
// invalid output must be undefined

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem("persistantState");
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
const store = createStore(rootReducer, loadFromLocalStorage());

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;