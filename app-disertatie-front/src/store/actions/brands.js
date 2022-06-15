export function setBrands(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_BRANDS", brands: result.data });
        return result.data.lenght;
      });
  };
}

export function addBrand(url, body) {
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
        dispatch({ type: "ADD_BRAND", brand: result.addedBrand });
      });
  };
}

export function editBrand(url, body) {
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
        dispatch({ type: "EDIT_BRAND", brand: result.editedBrand });
      });
  };
}
