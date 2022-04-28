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

function EventModal({ sharedUser }) {
  const { setShowEventModal, daySelected, selectedEvent, userKey, labels } =
    useContext(GlobalContext);

  const [day, setDay] = useState(
    selectedEvent ? selectedEvent.sstartdate : daySelected.format("YYYY-MM-DD")
  );
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.stitle : "");
  const [info, setInfo] = useState(selectedEvent ? selectedEvent.sinfo : "");
  const [owner, setOwner] = useState(JSON.parse(userKey).uno);
  const [shared, setShared] = useState();
  const [id, setId] = useState(selectedEvent ? selectedEvent.sno : 0);

  const handleOnClose = () => {
    setShowEventModal(false);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (title.replace(/^\s+|\s+$/gm, "") !== "") {
      const calendarEvent = {
        sno: id,
        owner,
        shared,
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

            <div className="labels-list">
              {sharedUser.map((share, i) => {
                // return (
                //   <span
                //     key={i}
                //     onClick={() => setShared(share.shared)}
                //     className={`text-${labels[share.shared - 1]}`}
                //   >   {share.shared}
                //     <FontAwesomeIcon icon={faCheck} className="ico-close" />
                //   </span>
                // );

                return (
                  <>
                    <label key={`${i}-lbl`} htmlFor={`shared-${share.shared}`}>
                      {share.user}
                    </label>
                    <input
                      key={`${i}-ipt`}
                      id={`shared-${share.shared}`}
                      type="checkbox"
                      value={share.shared}
                      className={`text-${labels[share.shared - 1]}`}
                    />
                    {/* setShared 중복으로 들어가야 함! */}
                  </>
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
