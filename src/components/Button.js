import React from "react";

function Button({ id, onClick, label }) {
  return (
    <button key={id} onClick={onClick}>
      {label}
    </button>
  );
}

export default React.memo(Button);
