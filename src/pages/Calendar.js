import { useState, useContext, useEffect } from "react";
import { getMonth } from "./../utils/util-calendar";
import GlobalContext from "../context/GlobalContext";
import CalendarHeader from "../components/CalendarHeader";
import Sidebar from "../components/Sidebar";
import Month from "../components/Month";
import EventModal from "../components/EventModal";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <section className="section-default">
      {showEventModal && <EventModal />}
      <CalendarHeader />
      <div className="calendar-main-area">
        <Sidebar />
        <div className="calendar-area">
          <Month month={currentMonth} />
        </div>
      </div>
    </section>
  );
}

export default Calendar;
