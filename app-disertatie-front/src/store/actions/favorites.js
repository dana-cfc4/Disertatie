export function setFavorites(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_FAVORITES", favorites: result.data });
        return result.data.lenght;
      });
  };
}

export function addFavorite(url, body) {
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
          type: "ADD_FAVORITE",
          favorite: result.addedFavorite,
        });

      });
  };
}

export function deleteFavorite(url) {
  return (dispatch) => {
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "DELETE_FAVORITE", favorite: result.data });
      });
  };
}

export function setFavoritesNoUser(favorites) {
  return {
    type: "SET_FAVORITES_NO_USER",
    favorites,
  };
}

export function addFavoriteNoUser(favorite) {
  return {
    type: "ADD_FAVORITE_NO_USER",
    favorite,
  };
}

export function deleteFavoriteNoUser(favorite) {
  return {
    type: "DELETE_FAVORITE_NO_USER",
    favorite,
  };
}
