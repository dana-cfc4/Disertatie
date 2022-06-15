const initialState = {
  specifications: [],
};

export default function addSpecification(state = initialState, action) {
  switch (action.type) {
    case "ADD_SPECIFICATION":
      return {
        ...state,
        specifications: [
          ...state.specifications,
          { ...action.specification, id: state.specifications.length + 1 },
        ],
      };
    case "SET_SPECIFICATIONS":
      return { ...state, specifications: action.specifications };
    case "EDIT_SPECIFICATION":
      return {
        ...state,
        specifications: state.specifications.map((specification) =>
          specification._id === action.specification._id ? action.specification : specification
        ),
      };
    default:
      return state;
  }
}
