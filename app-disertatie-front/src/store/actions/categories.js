export function setCategories(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_CATEGORIES", categories: result.data });
        return result.data.lenght;
      });
  };
}

export function addCategory(url, body) {
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
        dispatch({ type: "ADD_CATEGORY", category: result.addedCategory });
      });
  };
}

export function editCategory(url, body) {
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
        dispatch({ type: "EDIT_CATEGORY", category: result.editedCategory });
      });
  };
}
