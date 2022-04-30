import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "./../context/GlobalContext";

function Day({ day, rowIdx, userEvt }) {
  const [holiday, setHoliday] = useState("weekday");

  const {
    setDaySelected,
    setShowEventModal,
    setSelectedEvent,
    labels,
    filteredEvents,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (
      day.format("ddd").toUpperCase() === "SAT" ||
      day.format("ddd").toUpperCase() === "SUN"
    )
      setHoliday("holiday");
    else setHoliday("weekday");
  });

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "today" : "";
  };

  const getCurrentDayDotClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "today-dot"
      : "";
  };

  return (
    <div className="day-area">
      <header className="day-header">
        {rowIdx === 0 && (
          <p className={`day-header-date date-${holiday}`}>
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <div className={`${getCurrentDayClass()} day-header-day`}>
          {day.format("DD")}
          <div className={`${getCurrentDayDotClass()}`}></div>
        </div>
      </header>
      <div
        className="day-body"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {Object.keys(filteredEvents).length === 0 &&
        filteredEvents.constructor === Object
          ? null
          : userEvt.map((event, idx) => {
              const filterState = filteredEvents.filter((value, idx, arr) => {
                return value.user === event.uid;
              });

              return filterState.map((val) => {
                if (val.state === true) {
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedEvent(event);
                        setDaySelected(day);
                        setShowEventModal(true);
                      }}
                      className={`event bg-${labels[event.owner - 1]}`}
                    >
                      {event.stitle}
                    </div>
                  );
                }
              });
            })}
      </div>
    </div>
  );
}

export default Day;
