import { useContext } from "react";
import GlobalContext from "./../context/GlobalContext";

function Logout() {
  const {
    setUserKey,
    STORAGE_USER_CHECK,
    setFilteredEvents,
    setUserMonthEvents,
    setSharedUser,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const onClickLogout = () => {
    setFilteredEvents([]);
    setSharedUser([]);
    setUserMonthEvents([]);
    setSelectedEvent(null);
    sessionStorage.removeItem(STORAGE_USER_CHECK);
    setUserKey(sessionStorage.getItem(STORAGE_USER_CHECK));
  };

  return <button onClick={onClickLogout}>Logout</button>;
}

export default Logout;
