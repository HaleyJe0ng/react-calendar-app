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
import { getUserEvent } from "../utils/get-user-event";
import { getSharedScheduleInfo } from "../utils/get-shared-schedule-info";
import { deleteUserEvent } from "../utils/delete-user-event";

function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    selectedEvent,
    userKey,
    labels,
    sharedUser,
    monthIndex,
    sharedSchedule,
    setSharedSchedule,
  } = useContext(GlobalContext);

  const [day, setDay] = useState(
    selectedEvent ? selectedEvent.sstartdate : daySelected.format("YYYY-MM-DD")
  );
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.stitle : "");
  const [info, setInfo] = useState(selectedEvent ? selectedEvent.sinfo : "");
  const [owner, setOwner] = useState(
    selectedEvent ? selectedEvent.owner : JSON.parse(userKey).uno
  );
  const [eventKey, setEventKey] = useState(
    selectedEvent ? selectedEvent.sno : 0
  );
  const [id, setId] = useState(
    selectedEvent ? selectedEvent.uid : JSON.parse(userKey).uid
  );

  const [sharedScheduleInfo, setSharedScheduleInfo] = useState([]);
  // const [checkedState, setCheckedState] = useState(
  //   sharedUser !== []
  //     ? sharedUser.map((usr) => {
  //         return {
  //           ...usr,
  //           state: false,
  //         };
  //       })
  //     : [
  //         {
  //           state: false,
  //         },
  //       ]
  // );

  const [checkedState, setCheckedState] = useState(
    sharedUser !== []
      ? sharedUser.map((usr) => {
          return {
            ...usr,
            state: false,
          };
        })
      : []
  );

  const handleOnClose = () => {
    setShowEventModal(false);
  };

  const handleOnDelete = () => {
    deleteUserEvent(eventKey).then((res) => {
      console.log(res);
    });
    setShowEventModal(false);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (title.replace(/^\s+|\s+$/gm, "") !== "") {
      const calendarEvent = {
        sno: eventKey,
        owner,
        uid: id,
        share: checkedState.filter((val) => val.state === true),
        stitle: title,
        sinfo: info,
        day: day,
      };
      console.log("calendarEvent", calendarEvent);
      if (selectedEvent) {
        getUserEvent(
          "UPDATE",
          JSON.parse(userKey).uno,
          monthIndex,
          calendarEvent
        ).then((res) => {
          console.log("HERE! UPDATED!", res);
        });
      } else {
        getUserEvent(
          "CREATE",
          JSON.parse(userKey).uno,
          monthIndex,
          calendarEvent
        ).then((res) => {
          console.log(res);
        });
      }
      setShowEventModal(false);
    } else {
      alert("Please input the title!");
    }
  }

  useEffect(() => {
    if (selectedEvent) {
      getSharedScheduleInfo(eventKey).then((res) => {
        setSharedScheduleInfo(res);
      });
    }
  }, [selectedEvent]);

  useEffect(() => {
    setSharedSchedule(sharedScheduleInfo);
  }, [selectedEvent, sharedScheduleInfo]);

  return (
    <div className="event-modal-area">
      <form>
        <header className="modal-header-area">
          {selectedEvent ? (
            <button
              onClick={handleOnDelete}
              disabled={owner === JSON.parse(userKey).uno ? false : true}
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
            disabled={owner === JSON.parse(userKey).uno ? false : true}
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
              disabled={owner === JSON.parse(userKey).uno ? false : true}
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
              disabled={owner === JSON.parse(userKey).uno ? false : true}
            />
          </div>
          <div className="modal-col-area labels-area">
            <span className="sub-title">
              <FontAwesomeIcon icon={faTag} className="ico-calendar" /> Share
            </span>

            <div className="shared-list">
              <ul className="shared-items">
                {owner === JSON.parse(userKey).uno &&
                sharedUser !== [] &&
                sharedUser.length === checkedState.length ? (
                  sharedUser.map((sharedInfo, i) => {
                    return (
                      <div key={`${i}`}>
                        <div key={`${i}`}>
                          {sharedSchedule != [] &&
                            sharedSchedule.map((info) => {
                              if (sharedInfo.user === info.shared) {
                                {
                                  return `You shared this schedule with ${sharedInfo.user}`;
                                }
                              } else return "  ";
                            })}
                        </div>
                        <li key={`${i}-li`}>
                          <label
                            key={`${i}-lbl`}
                            htmlFor={`shared-${sharedInfo.shared}`}
                            className="shared-item"
                          >
                            {sharedInfo.user}
                            <div
                              className={`text-${
                                labels[sharedInfo.shared - 1]
                              }`}
                            >
                              <input
                                key={`${i}-ipt`}
                                id={`shared-${sharedInfo.shared}`}
                                type="checkbox"
                                value={sharedInfo.shared}
                                checked={checkedState[i].state}
                                onChange={() => {
                                  setCheckedState(
                                    checkedState.map((v) =>
                                      v.shared === checkedState[i].shared
                                        ? {
                                            ...v,
                                            state: !checkedState[i].state,
                                          }
                                        : v
                                    )
                                  );
                                }}
                              />
                              {checkedState[i].state && (
                                <span className="check-mark"></span>
                              )}
                            </div>
                          </label>
                        </li>
                      </div>
                    );
                  })
                ) : (
                  <div>This is a shared schedule for {id}</div>
                )}
              </ul>
            </div>
          </div>
        </div>

        <footer className="modal-footer-area">
          <button
            className="modal-save-btn"
            onClick={handleSubmit}
            type="submit"
            disabled={owner === JSON.parse(userKey).uno ? false : true}
          >
            SAVE
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
