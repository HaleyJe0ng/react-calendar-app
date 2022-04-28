import { useState, useContext, useEffect } from "react";
import { getMonth } from "./../utils/util-calendar";
import GlobalContext from "../context/GlobalContext";
import CalendarHeader from "../components/CalendarHeader";
import Sidebar from "../components/Sidebar";
import Month from "../components/Month";
import EventModal from "../components/EventModal";
import { getSharedUser } from "../utils/get-shared-user";

function Calendar() {
  const [sharedUser, setSharedUser] = useState([]);
  const [sharedUserInfo, setSharedUserInfo] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, userKey } = useContext(GlobalContext);

  useEffect(() => {
    getSharedUser(JSON.parse(userKey).uno).then((res) => {
      setSharedUser(res);
    });
  }, []);

  useEffect(() => {
    setSharedUserInfo(sharedUser);
  }, [sharedUser]);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <section className="section-default">
      {showEventModal && (
        <>
          <EventModal sharedUser={sharedUserInfo} />
          <div className="section-blind"></div>
        </>
      )}
      <CalendarHeader />
      <div className="calendar-main-area">
        <Sidebar sharedUser={sharedUserInfo} />
        <div className="calendar-area">
          <Month month={currentMonth} />
        </div>
      </div>
    </section>
  );
}

export default Calendar;
