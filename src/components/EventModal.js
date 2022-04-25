import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "./../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faTrashCan,
  faCalendar,
  faPencil,
  faTag,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const labelsClasses = ["indigo", "red", "mint"];

function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const handleOnClose = () => {
    setShowEventModal(false);
  };

  //각 이벤트 일정 넣기 코드
  function handleSubmit(e) {
    e.preventDefault();

    if (title.replace(/^\s+|\s+$/gm, "") !== "") {
      const calendarEvent = {
        title,
        description,
        label: selectedLabel,
        day: daySelected.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
      };
      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCalEvent({ type: "push", payload: calendarEvent });
      }
      setShowEventModal(false);
    } else {
      alert("Please input the title!");
    }
  }

  return (
    <div className="event-modal-area">
      <form>
        <header className="modal-header-area">
          {selectedEvent ? (
            <button
              onClick={() => {
                dispatchCalEvent({ type: "delete", payload: selectedEvent });
                setShowEventModal(false);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} className="ico-trash" />
            </button>
          ) : (
            <div></div>
          )}
          <button onClick={handleOnClose}>
            <FontAwesomeIcon icon={faClose} className="ico-close" />
          </button>
        </header>

        <div className="modal-body-area">
          <input
            type="text"
            name="title"
            placeholder="Add Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
            required
          />
          <div className="modal-col-area">
            <span>
              <FontAwesomeIcon icon={faCalendar} className="ico-calendar" />
            </span>
            <p>{daySelected.format("YYYY MMMM DD - ddd")}</p>
          </div>
          <div className="modal-col-area">
            <span className="sub-title">
              <FontAwesomeIcon icon={faPencil} className="ico-calendar" />
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add Description"
              value={description}
              className="description-input"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="modal-col-area labels-area">
            <span className="sub-title">
              <FontAwesomeIcon icon={faTag} className="ico-calendar" />
            </span>
            <div className="labels-list">
              {labelsClasses.map((lblClass, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`text-${lblClass}`}
                  >
                    {selectedLabel === lblClass && (
                      <FontAwesomeIcon icon={faCheck} className="ico-close" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <footer className="modal-footer-area">
          <button
            className="modal-save-btn"
            onClick={handleSubmit}
            type="submit"
          >
            SAVE
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
