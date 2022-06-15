export function setUsers() {
  return (dispatch) => {
    return fetch("http://localhost:8080/users", {
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
    return fetch("http://localhost:8080/users/signup", {
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
    return fetch("http://localhost:8080/users/signin", {
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
