import React from "react";

function Day({ day }) {
  return (
    <div>
      <p>{day.format("ddd").toUpperCase()}</p>
      <p>{day.format("DD")}</p>
    </div>
  );
}

export default Day;
