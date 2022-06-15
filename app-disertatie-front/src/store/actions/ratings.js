export function setRatings(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_RATINGS", ratings: result.data });
        return result.data.lenght;
      });
  };
}

export function addRating(url, body) {
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
          type: "ADD_RATING",
          rating: result.addedRating,
        });
      });
  };
}

export function editRating(url, body) {
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
          type: "EDIT_RATING",
          rating: result.editedRating,
        });
      });
  };
}

export function deleteRating(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "DELETE_RATING", rating: result.data });
      });
  };
}