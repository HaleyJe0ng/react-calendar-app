import React from "react";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

function UserSchedule({ year, month }) {
  const [userSchedule, setUserSchedule] = useState({});

  //get user Schedule when month change
  useEffect(() => {
    let formdata = new FormData();
    formdata.append("uid", id);
    formdata.append("upasswd", pwd);
  }, [month]);

  return <div>userSchedule</div>;
}

export default UserSchedule;
