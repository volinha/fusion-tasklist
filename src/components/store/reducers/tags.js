const INITIAL_STATE = {
    tags:  []
}

export default function tags(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'TAG_ADD':
            return {...state, tags: [...state.tags, {id: action.id, value: action.value}]}
        case 'TAG_REMOVE':
            return {
                ...state,
                tags: state.tags.filter(item => {
                    return item.id !== action.id
                })
            }
        case 'TAG_CLEARLIST':
            return {...INITIAL_STATE}
        default:
            return state;
    }
}