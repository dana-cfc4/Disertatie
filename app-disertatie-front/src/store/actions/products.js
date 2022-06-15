export function setProducts(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_PRODUCTS", products: result.data });
        return result.data.lenght;
      });
  };
}

export function addProduct(url, body) {
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
          type: "ADD_PRODUCT",
          product: result.addedProduct,
        });
      });
  };
}

export function editProduct(url, body) {
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
          type: "EDIT_PRODUCT",
          product: result.editedProduct,
        });
      });
  };
}
