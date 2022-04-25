import React, { useContext } from "react";
import dayjs from "dayjs";
import GlobalContext from "./../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function CreateEventButton() {
  const { setShowEventModal, setDaySelected } = useContext(GlobalContext);

  const handleOnClickCreateEvent = () => {
    setShowEventModal(true);
    setDaySelected(dayjs());
  };

  return (
    <button className="create-event-btn" onClick={handleOnClickCreateEvent}>
      <FontAwesomeIcon icon={faPlus} className="ico-plus" />
      <span> Create </span>
    </button>
  );
}

export default CreateEventButton;
