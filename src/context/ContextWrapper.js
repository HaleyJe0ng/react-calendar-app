import React, { useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showEventModal, setShowEventModal] = useState(false);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [userMonthEvents, setUserMonthEvents] = useState([]);
  const [sharedUser, setSharedUser] = useState([]);
  const [labels, setLabels] = useState(["indigo", "red", "mint"]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sharedSchedule, setSharedSchedule] = useState([]);

  const STORAGE_USER_CHECK = "user_key";
  const [userKey, setUserKey] = useState(
    sessionStorage.getItem(STORAGE_USER_CHECK)
  );

  useEffect(() => {
    setUserKey(sessionStorage.getItem(STORAGE_USER_CHECK));
  }, [userKey]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        showEventModal,
        setShowEventModal,
        daySelected,
        setDaySelected,
        selectedEvent,
        setSelectedEvent,
        userMonthEvents,
        setUserMonthEvents,
        userKey,
        setUserKey,
        sharedUser,
        setSharedUser,
        filteredEvents,
        setFilteredEvents,
        sharedSchedule,
        setSharedSchedule,
        STORAGE_USER_CHECK,
        labels,
        setLabels,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
