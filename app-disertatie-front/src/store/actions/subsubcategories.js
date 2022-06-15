export function setSubSubCategories(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_SUBSUBCATEGORIES", subsubcategories: result.data });
        return result.data.lenght;
      });
  };
}

export function addSubSubCategory(url, body) {
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
          type: "ADD_SUBSUBCATEGORY",
          subsubcategory: result.addedSubSubCategory,
        });
      });
  };
}

export function editSubSubCategory(url, body) {
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
          type: "EDIT_SUBSUBCATEGORY",
          subsubcategory: result.editedSubSubCategory,
        });
      });
  };
}
