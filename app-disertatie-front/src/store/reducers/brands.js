const initialState = {
  brands: [],
};

export default function addBrand(state = initialState, action) {
  switch (action.type) {
    case "ADD_BRAND":
      return {
        ...state,
        brands: [
          ...state.brands,
          { ...action.brand, id: state.brands.length + 1 },
        ],
      };
    case "SET_BRANDS":
      return { ...state, brands: action.brands };
    case "EDIT_BRAND":
      return {
        ...state,
        brands: state.brands.map((brand) =>
          brand._id === action.brand._id ? action.brand : brand
        ),
      };
    default:
      return state;
  }
}
