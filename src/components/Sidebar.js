import React from "react";
import CreateEventButton from "./createEventButton";
import Labels from "./Labels";

function Sidebar() {
  return (
    <div className="sidebar-area">
      <CreateEventButton />
      <div className="labels-area">
        <Labels />
      </div>
    </div>
  );
}

export default Sidebar;
