const initialState = {
  ratings: [],
};

export default function addRating(state = initialState, action) {
  switch (action.type) {
    case "ADD_RATING":
      return {
        ...state,
        ratings: [
          ...state.ratings,
          { ...action.rating, id: state.ratings.length + 1 },
        ],
      };
    case "SET_RATINGS":
      return { ...state, ratings: action.ratings };
    case "EDIT_RATING":
      return {
        ...state,
        ratings: state.ratings.map((rating) =>
          rating._id === action.rating._id ? action.rating : rating
        ),
      };
    case "DELETE_RATING":
      return {
        ...state,
        ratings: state.ratings.filter(
          (rating) => rating._id !== action.rating._id
        ),
      };
    default:
      return state;
  }
}
