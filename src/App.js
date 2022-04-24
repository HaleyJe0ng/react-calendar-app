import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import { useContext } from "react";
import "./assets/scss/styles.scss";
import GlobalContext from "./context/GlobalContext";

function App() {
  const { userKey } = useContext(GlobalContext);

  return <div>{userKey !== null ? <Calendar /> : <Login />}</div>;
}

export default App;
