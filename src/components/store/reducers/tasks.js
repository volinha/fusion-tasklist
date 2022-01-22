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
                    createdAt: action.payload.createdAt,
                    finishedAt: action.payload.finishedAt,
                    tags: action.payload.tags,
                    comments: action.payload.comments,
                    date: action.payload.date
                }]
            };
        case 'TASK_REMOVE':
            return {
                ...state,
                items: state.items.filter(item => {
                    return item.id !== action.id
                })
            }
        case 'TASK_FINISH':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.id ? { ...item, status: 'done', finishedAt: Date.now(), comments: action.comments } : item
                )
            }
        default:
            return state;
    }
}

