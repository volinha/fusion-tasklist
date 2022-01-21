import { combineReducers } from 'redux';

import tasksReducer from './tasks';
import searchReducer from './search';
import tagsReducer from './tags';
import dialogReducer from './dialog';

export default combineReducers({
    tasks: tasksReducer,
    search: searchReducer,
    tags: tagsReducer,
    dialog: dialogReducer
})