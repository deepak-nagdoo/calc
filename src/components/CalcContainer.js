import React from "react";

function CalcContainer(props) {
  return <div className="box calc-container ">{props.children}</div>;
}

export default React.memo(CalcContainer);
