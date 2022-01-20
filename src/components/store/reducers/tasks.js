import taskList from "./tasklist";

const INITIAL_STATE = {
    taskList
}

export default function tasks(state = INITIAL_STATE, action){
    switch(action.type) {
        case 'TASK_ADD':
            return {...state, taskList: [...state.taskList, action.payload]};
        default:
            return state;
    }
}

