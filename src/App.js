import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import { useEffect, useState } from "react";
import "./assets/scss/styles.scss";

const STORAGE_USER_CHECK = "user_key";

function App() {
  const [userKey, setUserKey] = useState(
    sessionStorage.getItem(STORAGE_USER_CHECK)
  );

  useEffect(() => {
    setUserKey(sessionStorage.getItem(STORAGE_USER_CHECK));
  }, [userKey]);

  return <div>{userKey !== null ? <Calendar></Calendar> : <Login />}</div>;
}

export default App;
