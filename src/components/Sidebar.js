import React, { useContext, useEffect, useState } from "react";
import CreateEventButton from "./createEventButton";
import GlobalContext from "../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const { userKey, labels, sharedUser, setFilteredEvents, filteredEvents } =
    useContext(GlobalContext);

  // console.log("sharedUser IN SIDEBAR", sharedUser);

  const [userState, setUserState] = useState(
    !(Object.keys(sharedUser).length === 0 && sharedUser.constructor === Object)
      ? [
          {
            shared: JSON.parse(userKey).uno,
            user: JSON.parse(userKey).uid,
          },
          ...sharedUser,
        ]
      : [
          {
            shared: JSON.parse(userKey).uno,
            user: JSON.parse(userKey).uid,
          },
        ]
  );

  const [checkedState, setCheckedState] = useState(
    userState.map((usr) => {
      return { shared: usr.shared, user: usr.user, state: true };
    })
  );

  useEffect(() => {
    setUserState(
      !(
        Object.keys(sharedUser).length === 0 &&
        sharedUser.constructor === Object
      )
        ? [
            {
              shared: JSON.parse(userKey).uno,
              user: JSON.parse(userKey).uid,
            },
            ...sharedUser,
          ]
        : [
            {
              shared: JSON.parse(userKey).uno,
              user: JSON.parse(userKey).uid,
            },
          ]
    );
  }, [sharedUser]);

  useEffect(() => {
    setCheckedState(
      userState.map((usr) => {
        return { shared: usr.shared, user: usr.user, state: true };
      })
    );

    setFilteredEvents(
      userState.map((usr) => {
        return { shared: usr.shared, user: usr.user, state: true };
      })
    );
  }, [userState]);

  return (
    <div className="sidebar-area">
      <CreateEventButton />

      <div className="sidebar-shared-area">
        <span className="sub-title">
          <FontAwesomeIcon icon={faTag} className="ico-calendar" /> Share
        </span>

        <div className="shared-list">
          <ul className="shared-items">
            {userState.length === checkedState.length &&
              userState.map((userInfo, i) => {
                return (
                  <li key={`${i}-div`}>
                    <label
                      key={`${i}-lbl`}
                      htmlFor={`shared-${userInfo.shared}`}
                      className="shared-item"
                    >
                      {userInfo.user}
                      <div className={`text-${labels[userInfo.shared - 1]}`}>
                        <input
                          key={`${i}-ipt`}
                          id={`shared-${userInfo.shared}`}
                          type="checkbox"
                          value={userInfo.shared}
                          checked={checkedState[i].state}
                          onChange={() => {
                            setCheckedState(
                              checkedState.map((val) =>
                                val.shared === userInfo.shared
                                  ? { ...val, state: !checkedState[i].state }
                                  : val
                              )
                            );
                            setFilteredEvents(
                              checkedState.map((val) =>
                                val.shared === userInfo.shared
                                  ? { ...val, state: !checkedState[i].state }
                                  : val
                              )
                            );
                            console.log("checkedState", checkedState);
                            console.log("filteredEvent", filteredEvents);
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
  );
}

export default Sidebar;
