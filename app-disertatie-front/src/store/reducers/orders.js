const initialState = {
  orders: [],
};

export default function addOrder(state = initialState, action) {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [
          ...state.orders,
          { ...action.order, id: state.orders.length + 1 },
        ],
      };
    case "SET_ORDERS":
      return { ...state, orders: action.orders }
    default:
      return state;
  }
}
