const UpdateState = (value) => {
    return {
        type: 'STATE_UPDATE',
        payload: value
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    UpdateState
}