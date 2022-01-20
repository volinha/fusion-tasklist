const INITIAL_STATE = {
    value: '',
}

export default function search(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'UPDATE_SEARCH':
            if (!!action.value) {
                return { value: action.value }
            } else {
                return { value: '' };
            }
        default:
            return state;
    }
}