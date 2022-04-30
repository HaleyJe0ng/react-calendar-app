import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},

  daySelected: null,
  setDaySelected: (day) => {},

  showEventModal: false,
  setShowEventModal: () => {},

  selectedEvent: null,
  setSelectedEvent: () => {},

  userMonthEvents: [],
  setUserMonthEvents: () => {},

  sharedUser: [],
  setSharedUser: () => {},

  labels: [],
  setLabels: () => {},

  filteredEvents: [],
  setFilteredEvents: (filter) => {},

  STORAGE_USER_CHECK: "user_key",
  userKey: null,
  setUserKey: (userStorage) => {},
});

export default GlobalContext;
