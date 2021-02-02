import React from "react";

function Col(props) {
  return <div className={"flex-col"}>{props.children}</div>;
}

export default React.memo(Col);
