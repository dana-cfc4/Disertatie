export default () =>
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }
    const { request, type, mode = "paralel", ...rest } = action;

    if (!request) {
      return next(action);
    }
  };
