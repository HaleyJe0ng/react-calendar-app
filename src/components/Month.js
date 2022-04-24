import React from "react";
import Day from "./Day";

function Month({ month }) {
  return (
    <div className="month-area">
      {month.map((row, index) => {
        return (
          <div className="week-area" key={index}>
            {row.map((day, idx) => {
              return <Day day={day} key={idx} rowIdx={index} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Month;
