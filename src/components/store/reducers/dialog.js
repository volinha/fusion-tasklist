const INITIAL_STATE = {
    value: {
        open: false,
        id: 'default',
        title: 'default',
        module: 'default'
    }
}

export default function dialog(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'DIALOG_OPEN':
            return { state, value: [{ open: true, id: action.id, title: action.title, module: action.module }] }
        case 'DIALOG_OPEN_TAG':
            return { state, value: [{ open: true, id: action.id, title: action.title, module: action.module, taskid: action.taskid }] }
        case 'DIALOG_CLOSE':
            return { state, value: [{ open: false }] }
        default:
            return state;
    }
}