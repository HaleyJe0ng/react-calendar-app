import React, { useContext, useEffect, useState } from "react";
import Day from "./Day";
import dayjs from "dayjs";
import { getUserEvent } from "../utils/get-user-event";
import GlobalContext from "../context/GlobalContext";

function Month({ month }) {
  const [userEvent, setUserEvent] = useState([]);
  const { monthIndex, showEventModal, STORAGE_USER_CHECK } =
    useContext(GlobalContext);

  useEffect(() => {
    getUserEvent(
      "POST",
      JSON.parse(sessionStorage.getItem(STORAGE_USER_CHECK)).uno,
      monthIndex
    ).then((res) => {
      setUserEvent(res);
    });
  }, [monthIndex]);

  return (
    <div className="month-area">
      <div>
        {userEvent.length !== 0
          ? userEvent.map((value, idx) => {
              return (
                <p key={idx}>
                  {value.sno} + {value.owner} + {value.sstartdate} +{" "}
                  {value.stitle} + {value.sinfo} +{" "}
                  {dayjs(new Date(value.sstartdate)).format("ddd")}
                </p>
              );
            })
          : null}
      </div>
      {month.map((row, index) => {
        return (
          <div className="week-area" key={index}>
            {row.map((day, idx) => {
              return <Day day={day} key={idx} rowIdx={index} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Month;
