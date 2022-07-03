export function setUsers() {
  return (dispatch) => {
    return fetch("https://backend-r4zkv.ondigitalocean.app/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "SET_USERS", users: result.data });
        return { message: result.message, status: result.success };
      });
  };
}

export function signUp(body) {
  return (dispatch) => {
    return fetch("https://backend-r4zkv.ondigitalocean.app/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "AUTHENTICATE", user: result.user });
        return { message: result.message, status: result.success };
      });
  };
}

export function signIn(body) {
  return (dispatch) => {
    return fetch("https://backend-r4zkv.ondigitalocean.app/users/signin", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({ type: "AUTHENTICATE", user: result.user });
        return {
          message: result.message,
          status: result.success
        };
      });
  };
}

export function signOut() {
  return {
    type: "SIGN_OUT",
  };
}

export function editUser(url, body) {
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
          type: "EDIT_USER",
          user: result.editedUser,
        });
      });
  };
}