const initialState = {
  content: "",
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
