const initialState = {
  categories: [],
};

export default function addCategory(state = initialState, action) {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [
          ...state.categories,
          { ...action.category, id: state.categories.length + 1 },
        ],
      };
    case "SET_CATEGORIES":
      return { ...state, categories: action.categories };
    case "EDIT_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.category._id ? action.category : category
        ),
      };
    default:
      return state;
  }
}
