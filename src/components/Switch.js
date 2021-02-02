import React from "react";

function Switch({ label, onChange, value }) {
  return (
    <>
      {label}
      <input type="checkbox" id={label} value={value} onChange={onChange} />
      <label htmlFor={label}></label>
    </>
  );
}

export default React.memo(Switch);
