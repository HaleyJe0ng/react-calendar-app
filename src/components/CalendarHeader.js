import { useContext } from "react";
import React from "react";
import Logout from "./../pages/Logout";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  return (
    <header className="calendar-header-area">
      <div>
        <h2>CalendarHeader</h2>
        <h4>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h4>

        <button onClick={handlePrevMonth}>
          <span>&lt;</span>
        </button>
        <button onClick={handleNextMonth}>
          <span>&gt;</span>
        </button>
      </div>

      <Logout />
    </header>
  );
}

export default CalendarHeader;
