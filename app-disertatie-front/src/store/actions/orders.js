export function setOrders(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_ORDERS", orders: result.data });
        return result.data.lenght;
      });
  };
}

export function addOrder(url, body) {
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
        dispatch({ type: "ADD_ORDER", order: result.addedOrder });
      });
  };
}