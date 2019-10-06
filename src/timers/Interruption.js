import React, { useState, useEffect, useContext } from "react";
import { Columns, Heading, Tile, Button, Tag } from "react-bulma-components";
import { useGlobal } from "../store";
import { hoursFormat } from "../helpers/helpers";

const Interruption = props => {
  const [globalState, globalActions] = useGlobal();
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [type, setType] = useState(
    globalState.boxes.find(x => x.id === props.id).type
  );

  function toggle() {
    setIsActive(!isActive);
    !isActive && setCount(count + 1);
    !globalState.boxes.find(x => x.id === props.id).isActive &&
      setCount(count + 1);
    globalActions.setActive(props.id);
    console.log("hola");
    globalActions.modifyLine("boxes", props.id, "events", count);
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
    <Tile kind="parent">
      <Tile
        style={{}}
        kind="child"
        notification
        color={
          type === "to-do"
            ? "dark"
            : globalState.boxes.find(x => x.id === props.id).isActive
            ? "danger"
            : globalState.boxes.find(x => x.id === props.id).time === 0
            ? "warning"
            : "warning"
        }
        onClick={toggle}
      >
        {
          //globalState.boxes.find(x => x.id === props.id).type
        }

        <button className="delete" onClick={remove} />
        <Columns>
          <div className="column is-half">
            <Heading size={5} style={{ textAlign: "center" }}>
              {" "}
              {props.title ? props.title : "Timer"}{" "}
            </Heading>
          </div>
          <div className="column">
            <Heading size={5} style={{ textAlign: "center" }}>
              {hoursFormat(globalState.boxes.find(x => x.id === props.id).time)}
            </Heading>
          </div>
          <div className="column">
            <Heading size={5} style={{ textAlign: "center" }}>
              {count} events
            </Heading>
          </div>
        </Columns>
      </Tile>
    </Tile>
  );
};

export default Interruption;
