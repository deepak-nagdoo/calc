import React from "react";

function Row(props) {
  return <div className={"flex-row"}>{props.children}</div>;
}

export default React.memo(Row);
