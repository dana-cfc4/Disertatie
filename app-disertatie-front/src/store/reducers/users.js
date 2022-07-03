const initialState = {
  users: null,
  usersList: [],
};

export default function addUser(state = initialState, action) {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        usersList: action.users,
      };
    case "AUTHENTICATE":
      return { ...state, users: action.user };
    case "SIGN_OUT":
      return { ...state, users: null };
    case "EDIT_USER":
      return {
        ...state,
        usersList: state.usersList.map((user) =>
          user._id === action.user._id ? action.user : user
        ),
      };
    default:
      return state;
  }
}
