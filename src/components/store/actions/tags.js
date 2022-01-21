const AddTagList = (id, value) => {
    return{
        type: 'TAG_ADD',
        id,
        value
    }
}

const RemoveTagList = (id) => {
    return{
        type: 'TAG_REMOVE',
        id
    }
}

const ClearTagList = () => {
    return{
        type: 'TAG_CLEARLIST'
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    AddTagList,
    RemoveTagList,
    ClearTagList
}