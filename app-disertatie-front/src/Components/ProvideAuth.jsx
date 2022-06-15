import { authContext } from "../Utils/context";
import { useSelector } from "react-redux";

function ProvideAuth({ children }) {
  const users = useSelector((state) => state.users.users);
  const auth = users;

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export default ProvideAuth;
