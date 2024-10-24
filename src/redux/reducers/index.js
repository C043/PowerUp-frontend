const initialState = {
  token: "",
  user: {},
  search: "",
  reviews: [],
  page: 1
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
    case "PAGE":
      return {
        ...state,
        page: action.payload
      }
    default:
      return state;
  }
};

export default mainReducer;
