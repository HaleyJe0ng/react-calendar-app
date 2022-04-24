import React, { useContext } from "react";
import GlobalContext from "./../context/GlobalContext";

function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <React.Fragment>
      <p>Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`text-${lbl}`}
          />
          <span>{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}

export default Labels;
