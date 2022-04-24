import { useContext } from "react";
import GlobalContext from "./../context/GlobalContext";

function Logout() {
  const { setUserKey, STORAGE_USER_CHECK } = useContext(GlobalContext);

  const onClickLogout = () => {
    sessionStorage.removeItem(STORAGE_USER_CHECK);
    setUserKey(sessionStorage.getItem(STORAGE_USER_CHECK));
  };

  return <button onClick={onClickLogout}>Logout</button>;
}

export default Logout;
