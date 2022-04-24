import React, { useContext } from "react";
import GlobalContext from "./../context/GlobalContext";

function CreateEventButton() {
  const { setShowEventModal, setSelectedEvent } = useContext(GlobalContext);

  const handleOnClickCreateEvent = () => {
    setShowEventModal(true);
    setSelectedEvent(null);
  };

  return (
    <button onClick={handleOnClickCreateEvent}>
      <span alt="create_event">+</span>
      <span> Create </span>
    </button>
  );
}

export default CreateEventButton;
