const OpenDialog = (id, title, module) => {
    return {
        type: 'DIALOG_OPEN',
        id: id,
        title: title,
        module: module
    }
}

const CloseDialog = () => {
    return {
        type: 'DIALOG_CLOSE',
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    OpenDialog,
    CloseDialog
}

