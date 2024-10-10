const initialState = {
  token: "",
  user: {},
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload,
      };
    case "USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default mainReducer;
