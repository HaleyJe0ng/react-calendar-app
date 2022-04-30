import React, { useContext, useEffect, useState } from "react";
import Day from "./Day";
import dayjs from "dayjs";
import { getUserEvent } from "../utils/get-user-event";
import GlobalContext from "../context/GlobalContext";

function Month({ month }) {
  const [userEvent, setUserEvent] = useState([]);
  const { monthIndex, STORAGE_USER_CHECK, setUserMonthEvents, showEventModal } =
    useContext(GlobalContext);

  const getDayUserCheck = (day, idx, index) => {
    let prevData = new Array();

    if (userEvent.length !== 0) {
      for (let i = 0; i < userEvent.length; i++) {
        if (
          new Date(userEvent[i].sstartdate) > new Date(day.format("YYYY-MM-DD"))
        ) {
          return <Day day={day} key={idx} rowIdx={index} userEvt={prevData} />;
        }
        if (userEvent[i].sstartdate === day.format("YYYY-MM-DD")) {
          prevData.push(userEvent[i]);
          continue;
        }
      }
    }
    return <Day day={day} key={idx} rowIdx={index} userEvt={prevData} />;
  };

  useEffect(() => {
    setUserMonthEvents([]); //init;
    getUserEvent(
      "POST",
      JSON.parse(sessionStorage.getItem(STORAGE_USER_CHECK)).uno,
      monthIndex,
      []
    ).then((res) => {
      setUserEvent(res);
    });
  }, [monthIndex, showEventModal]);

  useEffect(() => {
    setUserMonthEvents(userEvent);
  }, [userEvent]);

  return (
    <div className="month-area">
      {month.map((row, index) => {
        return (
          <div className="week-area" key={index}>
            {row.map((day, idx) => {
              return getDayUserCheck(day, idx, index);
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Month;
