import React from "react";
import CalcContainer from "../components/CalcContainer";
import Row from "../components/Row";
import Col from "../components/Col";
import Switch from "../components/Switch";
import Button from "../components/Button";
import "./Main.css";
import CONST from "../utils/Constants";
import * as service from "../utils/Service";

function Main({ ...props }) {
  const [result, setResult] = React.useState(0);
  const [holder, setHolder] = React.useState(0);
  const [operations, setOperations] = React.useState([]);
  const [preOperations, setPreOperations] = React.useState([]);
  const [showAdvance, setShowAdvance] = React.useState(false);
  const [dark, setDark] = React.useState(false);

  const updateOperation = (type) => {
    if (operations.length > 0) {
      switch (operations[operations.length - 1]) {
        case CONST.OPS.ADDITION:
          setResult(parseInt(holder) + parseInt(result));
          setHolder(parseInt(holder) + parseInt(result));
          break;
        case CONST.OPS.SUBTRACT:
          setResult(parseInt(holder) - parseInt(result));
          setHolder(parseInt(holder) - parseInt(result));
          break;
        case CONST.OPS.MULTIPLY:
          setResult(parseInt(holder) * parseInt(result));
          setHolder(parseInt(holder) * parseInt(result));
          break;
        case CONST.OPS.DIVIDE:
          setResult(parseInt(holder) / parseInt(result));
          setHolder(parseInt(holder) / parseInt(result));
          break;
        default:
          break;
      }
    } else {
      setHolder(result);
    }
    setOperations([...operations, type]);
  };

  const clear = () => {
    setHolder(0);
    setResult(0);
    setOperations([]);
    setPreOperations([]);
  };

  const updateHolder = (val) => {
    if (operations.length > 0) {
      if (operations.length !== preOperations.length) {
        setResult(val);
        setPreOperations([...preOperations, operations[operations.length - 1]]);
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
    updateOperation(operations[operations.length - 1]);
    setHolder(0);
    setOperations([]);
    setPreOperations([]);
  };
  document.documentElement.className = dark ? "dark" : "light";
  return (
    <div className="container center dir-col">
      <Row>
        <Switch
          label="Theme"
          value={dark}
          onChange={() => {
            setDark(!dark);
          }}
        />
      </Row>
      <Row>
        <Switch
          label="Scientic Mode"
          value={showAdvance}
          onChange={() => setShowAdvance(!showAdvance)}
        />
      </Row>
      <CalcContainer>
        <header id="screen">{result}</header>
        <Row>
          <Col>
            <div>
              {Array(9)
                .fill()
                .map((v, i) => {
                  return (
                    <Button
                      label={i + 1}
                      key={`num-${i + 1}`}
                      onClick={() => updateHolder(i + 1)}
                    />
                  );
                })}
            </div>
            <div>
              <Button onClick={() => clear()} label="Clear" />
              <Button onClick={() => updateHolder(0)} label="0" />
              <Button onClick={showResult} label="=" />
            </div>
            {showAdvance && (
              <div>
                <Button
                  onClick={() => {
                    setResult(service.sign(result));
                  }}
                  label="Sign"
                />
                <Button
                  onClick={() => {
                    setResult(service.square(result));
                  }}
                  label="Square"
                />
                <Button
                  onClick={() => {
                    setResult(service.squareRoot(result));
                  }}
                  label="Square root"
                />
              </div>
            )}
          </Col>
          <Col>
            <Button
              onClick={() => updateOperation(CONST.OPS.ADDITION)}
              label="+"
            />
            <Button
              onClick={() => updateOperation(CONST.OPS.SUBTRACT)}
              label="-"
            />
            <Button
              onClick={() => updateOperation(CONST.OPS.MULTIPLY)}
              label="*"
            />
            <Button
              onClick={() => updateOperation(CONST.OPS.DIVIDE)}
              label="/"
            />
          </Col>
        </Row>
      </CalcContainer>
    </div>
  );
}

export default React.memo(Main);
