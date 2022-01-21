import taskList from "./tasklist";
import produce from 'immer';

const INITIAL_STATE = {
    items: []
}

export default function tasks(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'TASK_ADD':
            return {
                items: [...state.items, {
                    id: action.payload.id,
                    title: action.payload.title,
                    status: action.payload.status,
                    priority: action.payload.priority,
                    createdAt: Date.now(),
                    finishedAt: action.payload.finishedAt,
                    tags: action.payload.tags,
                    comments: action.payload.comments,
                }]
            };
        default:
            return state;
    }
}

