import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "./../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faTrashCan,
  faCalendar,
  faPencil,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    selectedEvent,
    userKey,
    labels,
    sharedUser,
  } = useContext(GlobalContext);

  const [day, setDay] = useState(
    selectedEvent ? selectedEvent.sstartdate : daySelected.format("YYYY-MM-DD")
  );
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.stitle : "");
  const [info, setInfo] = useState(selectedEvent ? selectedEvent.sinfo : "");
  const [owner, setOwner] = useState(
    selectedEvent ? selectedEvent.owner : JSON.parse(userKey).uno
  );
  const [share, setShare] = useState([]);
  const [eventKey, setEventKey] = useState(
    selectedEvent ? selectedEvent.sno : 0
  );
  const [id, setId] = useState(selectedEvent ? selectedEvent.uid : "");

  const [checkedState, setCheckedState] = useState(
    sharedUser !== []
      ? sharedUser.map((usr) => {
          if (selectedEvent)
            return usr.shared === selectedEvent.owner
              ? { ...usr, state: true }
              : { ...usr, state: false };
          else return { ...usr, state: false };
        })
      : []
  );

  const handleOnClose = () => {
    setShowEventModal(false);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (title.replace(/^\s+|\s+$/gm, "") !== "") {
      const calendarEvent = {
        sno: eventKey,
        owner,
        uid: id,
        share,
        stitle: title,
        sinfo: info,
        day: day,
      };

      if (selectedEvent) {
        //id 같이 넣어줌
        //update
      } else {
        //id 넣지 않음
        //push
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
                //delete
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
            name="stitle"
            placeholder="Add Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
            required
          />
          <div className="modal-col-area">
            <span>
              <FontAwesomeIcon icon={faCalendar} className="ico-calendar" />{" "}
              Schedule
            </span>
            <input
              type="date"
              id="sstartdate"
              name="trip-start"
              value={day}
              onChange={(e) => {
                e.preventDefault();
                setDay(e.target.value);
              }}
            />
          </div>
          <div className="modal-col-area">
            <span className="sub-title">
              <FontAwesomeIcon icon={faPencil} className="ico-calendar" />{" "}
              Description
            </span>
            <input
              type="text"
              name="sinfo"
              placeholder="Add Description"
              value={info}
              className="description-input"
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
          <div className="modal-col-area labels-area">
            <span className="sub-title">
              <FontAwesomeIcon icon={faTag} className="ico-calendar" /> Share
            </span>

            <div className="shared-list">
              <ul className="shared-items">
                {sharedUser !== [] &&
                  sharedUser.map((sharedInfo, i) => {
                    return (
                      <li key={`${i}-div`}>
                        <label
                          key={`${i}-lbl`}
                          htmlFor={`shared-${sharedInfo.shared}`}
                          className="shared-item"
                        >
                          {sharedInfo.user}
                          <div
                            className={`text-${labels[sharedInfo.shared - 1]}`}
                          >
                            <input
                              key={`${i}-ipt`}
                              id={`shared-${sharedInfo.shared}`}
                              type="checkbox"
                              value={sharedInfo.shared}
                              checked={checkedState[i].state}
                              onChange={() => {
                                setCheckedState({
                                  ...checkedState,
                                  [i]: {
                                    state: !checkedState[i].state,
                                    user: checkedState[i].user,
                                    shared: checkedState[i].shared,
                                  },
                                });
                              }}
                            />
                            {checkedState[i].state && (
                              <span className="check-mark"></span>
                            )}
                          </div>
                        </label>
                      </li>
                    );
                  })}
              </ul>
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
