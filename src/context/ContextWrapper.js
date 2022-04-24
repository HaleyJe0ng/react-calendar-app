import React, { useEffect, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function SavedEventReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((event) => (event.id === payload.id ? payload : event));
    case "delete":
      return state.filter((event) => event.id !== payload.id);
    default:
      throw new Error();
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];

  return parsedEvents;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month()); //insert current month
  const [showEventModal, setShowEventModal] = useState(false);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [savedEvents, dispatchCalEvent] = useReducer(
    SavedEventReducer,
    [],
    initEvents
  );

  const STORAGE_USER_CHECK = "user_key";
  const [userKey, setUserKey] = useState(
    sessionStorage.getItem(STORAGE_USER_CHECK)
  );

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setUserKey(sessionStorage.getItem(STORAGE_USER_CHECK));
  }, [userKey]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        showEventModal,
        setShowEventModal,
        daySelected,
        setDaySelected,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        userKey,
        setUserKey,
        STORAGE_USER_CHECK,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
