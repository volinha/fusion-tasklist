import { combineReducers } from 'redux';

import tasksReducer from './tasks.reducer';
import searchReducer from './search.reducer';
import tagsReducer from './tags.reducer';
import dialogReducer from './dialog.reducer';
import formsReducer from './forms.reducer';

export default combineReducers({
    tasks: tasksReducer,
    search: searchReducer,
    tags: tagsReducer,
    dialog: dialogReducer,
    forms: formsReducer,
})