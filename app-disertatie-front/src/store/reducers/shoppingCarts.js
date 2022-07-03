const initialState = {
  carts: [],
  currentSessionCarts: [],
};

export default function addCart(state = initialState, action) {
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state,
        carts: [...state.carts, { ...action.cart, id: state.carts.length + 1 }],
      };
    case "SET_CARTS":
      return { ...state, carts: action.carts };
    case "EDIT_CART":
      return {
        ...state,
        carts: state.carts.map((cart) => {
          return cart._id === action.cart?._id ? action.cart : cart
        }),
      };
    case "DELETE_CART":
      return {
        ...state,
        carts: state.carts.filter((cart) => cart._id !== action.cart._id),
      };
    case "ADD_CART_NO_USER":
      return {
        ...state,
        currentSessionCarts: [...state.currentSessionCarts, action.cart],
      };
    case "SET_CARTS_NO_USER":
      return { ...state, currentSessionCarts: action.carts };
    case "EDIT_CART_NO_USER":
      return {
        ...state,
        currentSessionCarts: action.cart,
      };
    case "DELETE_CART_NO_USER":
      return {
        ...state,
        currentSessionCarts: state.currentSessionCarts.filter(
          (cart) => cart.idProdus !== action.cart.idProdus
        ),
      };
    default:
      return state;
  }
}
