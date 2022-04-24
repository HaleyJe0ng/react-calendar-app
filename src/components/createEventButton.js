import React, { useContext } from "react";
import dayjs from "dayjs";
import GlobalContext from "./../context/GlobalContext";

function CreateEventButton() {
  const { setShowEventModal, setDaySelected } = useContext(GlobalContext);

  const handleOnClickCreateEvent = () => {
    setShowEventModal(true);
    setDaySelected(dayjs());
  };

  return (
    <button onClick={handleOnClickCreateEvent}>
      <span alt="create_event">+</span>
      <span> Create </span>
    </button>
  );
}

export default CreateEventButton;
