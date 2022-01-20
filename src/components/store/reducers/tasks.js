import taskList from "./tasklist";

const INITIAL_STATE = {
    taskList
}

export default function tasks(state = INITIAL_STATE, action){
    switch(action.type) {
        case 'TASK_ADD':
            localStorage.addItem('@tasklist',{...state, taskList: [...state.taskList, action.payload]});
            return 0;
        default:
            return state;
    }
}

