import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},

  daySelected: null,
  setDaySelected: (day) => {},

  showEventModal: false,
  setShowEventModal: () => {},

  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],

  selectedEvent: null,
  setSelectedEvent: () => {},

  labels: [],
  setLabels: () => {},
  updateLabel: () => {},

  filteredEvents: [],

  STORAGE_USER_CHECK: "user_key",
  userKey: null,
  setUserKey: (userStorage) => {},
});

export default GlobalContext;
