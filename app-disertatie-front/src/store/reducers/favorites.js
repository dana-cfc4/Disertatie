const initialState = {
    favorites: [],
    currentSessionFavorites:[]
};

export default function addFavorite(state = initialState, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [
          ...state.favorites,
         action.favorite,
        ],
      };
    case "SET_FAVORITES":
      return { ...state, favorites: action.favorites };
    case "DELETE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite._id !== action.favorite._id
        ),
      };
      case "ADD_FAVORITE_NO_USER":
      return { ...state, currentSessionFavorites: [...state.currentSessionFavorites, action.favorite] };
      case "SET_FAVORITES_NO_USER":
      return { ...state, currentSessionFavorites: action.favorites };
    case "DELETE_FAVORITE_NO_USER":
      return {
        ...state,
        currentSessionFavorites: state.currentSessionFavorites.filter(
          (favorite) => favorite.idProdus !== action.favorite.idProdus
        ),
      };
    default:
      return state;
  }
}
