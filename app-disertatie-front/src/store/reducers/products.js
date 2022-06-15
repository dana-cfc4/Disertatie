const initialState = {
  products: [],
};

export default function addProduct(state = initialState, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [
          ...state.products,
          { ...action.product, id: state.products.length + 1 },
        ],
      };
    case "SET_PRODUCTS":
      return { ...state, products: action.products };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.product._id ? action.product : product
        ),
      };
    default:
      return state;
  }
}
