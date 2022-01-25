const AddTask = (value) => {
    return {
        type: 'TASK_ADD',
        payload: value
    }
}

const RemoveTask = (id) => {
    return {
        type: 'TASK_REMOVE',
        id: id
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
        tagId: tagId,
        taskId: taskId
    }
}

const EditTag = (taskId, tagId, text) => {
        return {
            type: 'TASK_EDITTAG',
            taskId: taskId,
            tagId: tagId,
            value: text
        }
}

const EditPriority = (id, title, value) => {
    return {
        type: 'TASK_EDITPRIORITY',
        id: id,
        title: title,
        value: value
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    AddTask,
    RemoveTask,
    EditTask,
    FinishTask,
    RemoveTag,
    EditTag,
    EditPriority
}

