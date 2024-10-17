const initialState = {
  token: "",
  user: {},
  search: "",
  reviews: []
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
    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      }
    case "REVIEWS":
      return {
        ...state,
        reviews: action.payload
      }
    default:
      return state;
  }
};

export default mainReducer;
