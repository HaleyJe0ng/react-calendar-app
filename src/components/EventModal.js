import React, { useContext, useState } from "react";
import GlobalContext from "./../context/GlobalContext";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

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
  }

  return (
    <div className="event-modal-area">
      <form>
        <header>
          <span>drag_handle= </span>
          {selectedEvent && (
            <span
              onClick={() => {
                dispatchCalEvent({ type: "delete", payload: selectedEvent });
                setShowEventModal(false);
              }}
            >
              [ DELETE ]
            </span>
          )}
          <button onClick={handleOnClose}>[ CLOSE ]</button>
        </header>

        <div>
          <div>
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <span>[Schedule]</span>
            <p>{daySelected.format("dddd, MMMM, DD")}</p>
            <span>[description]</span>
            <input
              type="text"
              name="description"
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <span>[Shared]</span>
            <div>
              {labelsClasses.map((lblClass, i) => {
                return (
                  <span
                    key={i}
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`bg-${lblClass}`}
                  >
                    {/* {selectedLabel === lblClass && <p>{lblClass} icon</p>} */}

                    <p>{lblClass} icon</p>
                    {/* 선택되었을 때 수정 */}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <footer>
          <button onClick={handleSubmit} type="submit">
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
