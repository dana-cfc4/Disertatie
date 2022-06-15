const initialState = {
  subsubcategories: [],
};

export default function addSubSubCategory(state = initialState, action) {
  switch (action.type) {
    case "ADD_SUBSUBCATEGORY":
      return {
        ...state,
        subsubcategories: [
          ...state.subsubcategories,
          { ...action.subsubcategory, id: state.subsubcategories.length + 1 },
        ],
      };
    case "SET_SUBSUBCATEGORIES":
      return { ...state, subsubcategories: action.subsubcategories };
    case "EDIT_SUBSUBCATEGORY":
      return {
        ...state,
        subsubcategories: state.subsubcategories.map((subsubcategory) =>
          subsubcategory._id === action.subsubcategory._id
            ? action.subsubcategory
            : subsubcategory
        ),
      };
    default:
      return state;
  }
}
