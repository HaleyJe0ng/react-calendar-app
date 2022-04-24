import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import EventModal from "./EventModal";
import GlobalContext from "./../context/GlobalContext";

function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);

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

  const getCurrentDayClass = () => {
    //Check current day
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "today-dot"
      : "";
  };

  return (
    <div className="day">
      <header className="dayheader">
        {rowIdx === 0 && <p>{day.format("ddd").toUpperCase()}</p>}
        <p className={`${getCurrentDayClass()}`}>{day.format("DD")}</p>
      </header>
      <div
        className="daySelected"
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
