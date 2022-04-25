import { useContext } from "react";
import React from "react";
import Logout from "./../pages/Logout";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChevronLeft,
  faChevronRight,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

function CalendarHeader() {
  const { monthIndex, setMonthIndex, userKey } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  return (
    <header className="calendar-header-area">
      <div className="calendar-header-info">
        <FontAwesomeIcon icon={faCalendarDays} className="ico-calendar" />
        <h4 className="calendar-header-year">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY")}
        </h4>

        <button onClick={handlePrevMonth}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h4 className="calendar-header-date">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM")}
        </h4>
        <button onClick={handleNextMonth}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="calendar-header-user-area">
        <div className="user-info">
          <FontAwesomeIcon icon={faCircleUser} className="ico-user" />
          <span className="user-id">{JSON.parse(userKey).uid}</span>
        </div>
        <Logout />
      </div>
    </header>
  );
}

export default CalendarHeader;
