import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import EventModal from "./EventModal";
import GlobalContext from "./../context/GlobalContext";

function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const [holiday, setHoliday] = useState("weekday");

  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (event) => dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    ); //create new dayjs objects
    setDayEvents(events);
  }, [filteredEvents, day]);

  useEffect(() => {
    if (
      day.format("ddd").toUpperCase() === "SAT" ||
      day.format("ddd").toUpperCase() === "SUN"
    )
      setHoliday("holiday");
    else setHoliday("weekday");
  });

  const getCurrentDayClass = () => {
    //Check current day
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "today" : "";
  };

  const getCurrentDayDotClass = () => {
    //Check current day
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
        {dayEvents.map((event, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setSelectedEvent(event);
                setDaySelected(day);
                setShowEventModal(true);
              }}
              className={`event bg-${event.label}`}
            >
              {event.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Day;
