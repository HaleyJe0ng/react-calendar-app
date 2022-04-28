import React from "react";
import CreateEventButton from "./createEventButton";
// import Labels from "./Labels";

function Sidebar({ sharedUser }) {
  return (
    <div className="sidebar-area">
      <CreateEventButton />
      <div className="labels-area">
        {/* <Labels /> */}
        <div>
          {sharedUser.length !== 0 &&
            sharedUser.map((user, idx) => {
              return <li key={idx}>{user.shared}</li>;
            })}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
