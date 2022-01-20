const INITIAL_STATE = {
    tags:[]
}

export default function tag(state = INITIAL_STATE, action) {
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
        default:
            return state;
    }
}