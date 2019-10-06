import React, { useState, useEffect, useContext } from "react";
import { Columns, Heading, Tile, Button, Tag } from "react-bulma-components";
import { useGlobal } from "../store";
import { hoursFormat } from "../helpers/helpers";

const Timer = props => {
  const [globalState, globalActions] = useGlobal();
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [type, setType] = useState(
    globalState.boxes.find(x => x.id === props.id).type
  );

  function toggle() {
    setIsActive(!isActive);
    !isActive && setCount(count + 1);
    globalActions.setActive(props.id);
  }

  function reset(e) {
    e.stopPropagation();
    setCount(0);
    globalActions.resetTime(props.id);
    setIsActive(false);
  }

  function remove(e) {
    e.stopPropagation();
    globalActions.removeBox(props.id);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        globalActions.updateTime(props.id);
      }, 1000);
    } else if (!isActive && 0 !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, props.id, globalActions]);

  return (
    <Tile size={4} kind="parent">
      <Tile
        renderAs="article"
        style={{ padding: "1.5rem" }}
        kind="child"
        notification
        color={
          type === "to-do"
            ? "dark"
            : isActive
            ? "success"
            : globalState.boxes.find(x => x.id === props.id).time === 0
            ? "info"
            : "warning"
        }
        onClick={toggle}
      >
        {
          //globalState.boxes.find(x => x.id === props.id).type
        }

        <button className="delete" onClick={remove} />

        <Heading size={5} style={{ textAlign: "center" }}>
          {" "}
          {props.title ? props.title : "Timer"}{" "}
        </Heading>
        <div className="timer">
          <div className="time">
            {hoursFormat(globalState.boxes.find(x => x.id === props.id).time)}
          </div>

          <div className="events"> {count} events </div>

          <div className="row" style={{ display: "flex" }}>
            {type == "to-do" && (
              <Button
                style={{ textTransform: "uppercase" }}
                color={"success"}
                rounded
                onClick={null}
              >
                {globalState.boxes.find(x => x.id === props.id).done == "yes"
                  ? "Pause"
                  : "Done!"}
              </Button>
            )}

            <Button
              style={{
                marginRigh: "10px",
                marginLeft: "auto",
                textTransform: "uppercase"
              }}
              rounded
              color="danger"
              onClick={reset}
            >
              reset
            </Button>
          </div>
        </div>
      </Tile>
    </Tile>
  );
};

export default Timer;
