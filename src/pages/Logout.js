import { useState, useEffect } from "react";
const STORAGE_USER_CHECK = "user_key";

function Logout() {
  const onClickLogout = () => {
    sessionStorage.removeItem(STORAGE_USER_CHECK);
    document.location.href = "/";
  };

  return <button onClick={onClickLogout}>Logout</button>;
}

export default Logout;
