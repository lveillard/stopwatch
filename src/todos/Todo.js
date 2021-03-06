import React, { useState, useEffect, useContext } from "react";
import {
  Columns,
  Box,
  Heading,
  Message,
  Button,
  Tag
} from "react-bulma-components";
import { useGlobal } from "../store";
import { hoursFormat } from "../helpers/helpers";

const Todo = props => {
  const [globalState, globalActions] = useGlobal();

  useEffect(() => {
    let interval = null;
    let status = globalState.tasks.find(x => x.id === props.id);

    if (status.isActive) {
      interval = setInterval(() => {
        globalActions.increaseTimer(props.id);
      }, 1000);
    } else if (!status.isActive && status.time !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [props.id, globalState.tasks, globalActions]);

  function remove(e, id) {
    e.stopPropagation();
    globalActions.removeTask(id);
  }

  return (
    <Columns.Column size={6} key={props.info.id}>
      <Message color="info">
        <Message.Header>
          {props.info.taskTitle}
          <Tag.Group>
            {props.info.type === "timer" && (
              <Tag color="info" rounded>
                <Button
                  rounded
                  color={props.info.isActive ? "success" : "warning"}
                  size="small"
                  onClick={() => globalActions.activeTimer(props.info.id)}
                >
                  {props.info.time === 0
                    ? "START"
                    : props.info.time > 0
                    ? hoursFormat(props.info.time)
                    : null}
                  <Button renderAs="a" remove />
                </Button>
              </Tag>
            )}
            <Tag
              remove
              rounded
              onClick={event => remove(event, props.info.id)}
            />
          </Tag.Group>
        </Message.Header>

        {false && props.info.taskDescription && (
          <Message.Body>
            <Heading size={5} />
            <Heading subtitle size={6} renderAs="h2">
              {props.info.taskDescription}
            </Heading>
          </Message.Body>
        )}
      </Message>{" "}
    </Columns.Column>
  );
};

export default Todo;
