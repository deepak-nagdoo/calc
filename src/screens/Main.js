import React from "react";
import "./Main.css";

function Main({ ...props }) {
  const [result, setResult] = React.useState(0);
  const [holder, setHolder] = React.useState(0);
  const [operation, setOperation] = React.useState(null);
  const [isReset, setIsReset] = React.useState(false);

  const updateOperation = (type) => {
    if (operation) {
      switch (operation) {
        case "add":
          setResult(parseInt(holder) + parseInt(result));
          break;
        case "sub":
          setResult(parseInt(holder) - parseInt(result));
          break;
        case "mul":
          setResult(parseInt(holder) * parseInt(result));
          break;
        case "div":
          setResult(parseInt(holder) / parseInt(result));
          break;
        default:
          break;
      }
    }
    setOperation(type);
    setHolder(result);
    setIsReset(true);
  };

  const clear = () => {
    setHolder(0);
    setResult(0);
  };

  const updateHolder = (val) => {
    if (operation) {
      if (isReset) {
        setResult(val);
      } else {
        setResult(parseInt(result) + "" + val);
      }
    } else {
      if (parseInt(result) > 0) {
        setResult(parseInt(result) + "" + val);
      } else {
        setResult(val);
      }
    }
  };

  const showResult = () => {
    setResult(holder + parseInt(result));
    setHolder(0);
    setOperation(null);
  };
  return (
    <div className="container center">
      <div className="box calc-container ">
        <header id="screen">{result}</header>
        <div className={"flex-row"}>
          <div className={"flex-col"}>
            <div>
              {Array(9)
                .fill()
                .map((v, i) => {
                  return (
                    <button
                      key={`num-${i + 1}`}
                      onClick={() => updateHolder(i + 1)}
                    >
                      {i + 1}
                    </button>
                  );
                })}
            </div>
            <div>
              <button data-action="clear" onClick={() => clear()}>
                Clear
              </button>
              <button onClick={() => updateHolder(0)}>0</button>
              <button data-action="calculate" onClick={showResult}>
                =
              </button>
            </div>
          </div>
          <div className={"flex-col"}>
            <button onClick={() => updateOperation("add")}>+</button>
            <button onClick={() => updateOperation("sub")}>-</button>
            <button onClick={() => updateOperation("mul")}>&times;</button>
            <button onClick={() => updateOperation("div")}>/</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Main);
