import { useRef, useState, useEffect } from "react";
import Logout from "./Logout";
import { getMonth, getTest } from "./../utils/util-calendar";
import CalendarHeader from "../components/CalendarHeader";
import Sidebar from "../components/Sidebar";
import Month from "../components/Month";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  // const { monthIndex, showEventModal } = useContext(GlobalContext);

  // useEffect(() => {
  //   setCurrentMonth(getMonth(monthIndex));
  // }, [monthIndex]);

  console.table(getMonth(3));

  return (
    <section>
      <CalendarHeader />
      <h1>Calendar</h1>
      <div>
        <Sidebar />
        <Month month={currentMonth} />
      </div>
      <Logout />
    </section>
  );
}

export default Calendar;
