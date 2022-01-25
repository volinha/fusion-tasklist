const INITIAL_STATE = {
  title: "",
  priority: "",
  date: new Date(),
  comment: "",
  tag: "",
};

export default function forms(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "STATE_UPDATE":
      switch (action.payload.form) {
        case "TITLE":
          return { ...state, title: action.payload.value };
        case "PRIORITY":
          return { ...state, priority: action.payload.value };
        case "DATE":
          return { ...state, date: action.payload.value };
        case "COMMENT":
          return { ...state, comment: action.payload.value };
        case "TAG":
          return { ...state, tag: action.payload.value };
        case "TAG_CLEAR":
          return { ...state, tag: INITIAL_STATE.tag }
        case "RESET":
          return INITIAL_STATE;
        default:
          return state;
      }
    default:
      return state;
  }
}
