export function setSubCategories(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_SUBCATEGORIES", subcategories: result.data });
        return result.data.lenght;
      });
  };
}

export function addSubCategory(url, body) {
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
          type: "ADD_SUBCATEGORY",
          subcategory: result.addedSubCategory,
        });
      });
  };
}

export function editSubCategory(url, body) {
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
          type: "EDIT_SUBCATEGORY",
          subcategory: result.editedSubCategory,
        });
      });
  };
}
