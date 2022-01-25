const INITIAL_STATE = {
  items: [],
};

export default function tasks(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "TASK_ADD":
      return {
        items: [
          ...state.items,
          {
            id: action.payload.id,
            title: action.payload.title,
            status: action.payload.status,
            priority: action.payload.priority,
            createdAt: action.payload.createdAt,
            finishedAt: action.payload.finishedAt,
            tags: action.payload.tags,
            comments: action.payload.comments,
            date: action.payload.date,
            edit: action.payload.edit,
          },
        ],
      };
    case "TASK_REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => {
          return item.id !== action.id;
        }),
      };
    case "TASK_EDIT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                title: action.payload.title,
                priority: action.payload.priority,
                date: action.payload.date,
                tags: action.payload.tags,
                edit: action.payload.edit,
              }
            : item
        ),
      };
    case "TASK_FINISH":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? {
                ...item,
                status: "done",
                finishedAt: Date.now(),
                comments: action.comments,
              }
            : item
        ),
      };
    case "TASK_EDITTAG":
      return {
        ...state,
        items: state.items.map((task) =>
          task.id === action.taskId
            ? {
                ...task,
                tags: task.tags.map((tag) =>
                  tag.id === action.tagId
                    ? { ...tag, value: action.value }
                    : tag
                ),
              }
            : task
        ),
      };
    case "TASK_EDITPRIORITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? {
                ...item,
                priority: action.value,
                editedAt: Date.now(),
              }
            : item
        ),
      };
    default:
      return state;
  }
}
