const initialState = {
  subcategories: [],
};

export default function addSubCategory(state = initialState, action) {
  switch (action.type) {
    case "ADD_SUBCATEGORY":
      return {
        ...state,
        subcategories: [
          ...state.subcategories,
          { ...action.subcategory, id: state.subcategories.length + 1 },
        ],
      };
    case "SET_SUBCATEGORIES":
      return { ...state, subcategories: action.subcategories };
    case "EDIT_SUBCATEGORY":
      return {
        ...state,
        subcategories: state.subcategories.map((subcategory) =>
          subcategory._id === action.subcategory._id
            ? action.subcategory
            : subcategory
        ),
      };
    default:
      return state;
  }
}
