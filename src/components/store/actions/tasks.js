const AddTask = (value) => {
    return {
        type: 'TASK_ADD',
        payload: value
    }
}

const RemoveTask = (id) => {
    return {
        type: 'TASK_REMOVE',
        id
    }
}

const EditTask = (value) => {
    return {
        type: 'TASK_EDIT',
        payload: value
    }
}

const FinishTask = (id, comments) => {
    return {
        type: 'TASK_FINISH',
        id: id,
        comments: comments
    }
}

const RemoveTag = (tagId, taskId) => {
    return {
        type: 'TASK_REMOVETAG',
        tagId,
        taskId
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    AddTask,
    RemoveTask,
    EditTask,
    FinishTask,
    RemoveTag
}

