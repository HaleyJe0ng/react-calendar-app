import React from "react";
import Day from "./Day";

function Month({ month }) {
  return (
    <div className="test">
      {month.map((row, index) => {
        return (
          <React.Fragment key={index}>
            {row.map((day, idx) => {
              return <Day day={day} key={idx} />;
            })}
          </React.Fragment>
        ); //not use the real DOM element
      })}
    </div>
  );
}

export default Month;
