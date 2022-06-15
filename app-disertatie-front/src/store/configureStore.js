import { applyMiddleware, createStore } from "redux";

import middleware from "./middleware";
import rootReducer from "./reducers";
export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(middleware())
  );

  return store;
}
