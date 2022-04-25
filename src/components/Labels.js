import React, { useContext } from "react";
import GlobalContext from "./../context/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <React.Fragment>
      <p className="labels-title">
        <FontAwesomeIcon icon={faTag} className="ico-label" />
        Label
      </p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label className="labels-list" key={idx}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`text-${lbl}`}
          />
          {checked && <span className="check-mark"></span>}
          <span>{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}

export default Labels;
