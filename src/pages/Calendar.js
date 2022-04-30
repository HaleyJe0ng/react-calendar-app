import { useState, useContext, useEffect } from "react";
import { getMonth } from "./../utils/util-calendar";
import GlobalContext from "../context/GlobalContext";
import CalendarHeader from "../components/CalendarHeader";
import Sidebar from "../components/Sidebar";
import Month from "../components/Month";
import EventModal from "../components/EventModal";
import { getSharedUser } from "../utils/get-shared-user";

function Calendar() {
  const [sharedUserInfo, setSharedUserInfo] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const {
    monthIndex,
    showEventModal,
    userKey,
    sharedUser,
    setSharedUser,
    filteredEvents,
    setFilteredEvents,
  } = useContext(GlobalContext);

  useEffect(() => {
    getSharedUser(JSON.parse(userKey).uno).then((res) => {
      setSharedUserInfo(res);
      console.log("res", res);
    });
  }, [userKey]);

  console.log("sharedUser IN CALENDAR", sharedUser);

  useEffect(() => {
    setSharedUser(sharedUserInfo);
  }, [sharedUserInfo]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <section className="section-default">
      {showEventModal && (
        <>
          <EventModal />
          <div className="section-blind"></div>
        </>
      )}
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
