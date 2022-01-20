const AddTask = (value) => {
    return {
        type: 'TASK_ADD',
        payload: value
    }
}

const RemoveTask = (value) => {
    return {
        type: 'TASK_REMOVE',
        value
    }
}

const EditTask = (value) => {
    return {
        type: 'TASK_EDIT',
        payload: value
    }
}

const FinishTask = (value) => {
    return {
        type: 'TASK_FINISH',
        payload: value
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    AddTask,
    RemoveTask,
    EditTask,
    FinishTask
}

