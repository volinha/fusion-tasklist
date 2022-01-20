import { combineReducers } from 'redux';

import tasks from './tasks';
import search from './search';

export default combineReducers({
    tasks,
    search
})