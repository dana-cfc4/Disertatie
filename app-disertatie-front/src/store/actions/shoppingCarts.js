export function setCarts(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_CARTS", carts: result.data });
        return result.data.lenght;
      });
  };
}

export function addCart(url, body) {
  return (dispatch) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: "ADD_CART",
          cart: result.addedCart,
        });
      });
  };
}

export function editCart(url, body) {
  return (dispatch) => {
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: "EDIT_CART",
          cart: result.editedCart,
        });
      });
  };
}

export function deleteCart(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "DELETE_CART", cart: result.data });
      });
  };
}

export function setCartsNoUser(carts) {
  return {
    type: "SET_CARTS_NO_USER",
    carts,
  };
}

export function addCartNoUser(cart) {
  return {
    type: "ADD_CART_NO_USER",
    cart,
  };
}

export function editCartNoUser(cart) {
  return {
    type: "EDIT_CART_NO_USER",
    cart,
  };
}

export function deleteCartNoUser(cart) {
  return {
    type: "DELETE_CART_NO_USER",
    cart,
  };
}
