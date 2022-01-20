import { combineReducers } from 'redux';

import tasks from './tasks';
import search from './search';
import tags from './tags';

export default combineReducers({
    tasks,
    search,
    tags
})