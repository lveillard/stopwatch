import React, { useState, useEffect, useContext } from "react";
import { Columns, Heading, Message, Button, Tag } from "react-bulma-components";
import { Field, Checkbox, Control } from "bloomer";

import { useGlobal } from "../store";
import { hoursFormat } from "../helpers/helpers";

const Todo = props => {
  const [globalState, globalActions] = useGlobal();

  function remove(e, id) {
    e.stopPropagation();
    globalActions.removeTask(id);
  }

  function reset(e) {
    e.stopPropagation();
    globalActions.resetTime(props.id);
  }

  return (
    <Columns.Column size={6} key={props.info.id}>
      <Message color="light">
        <Message.Header>
          <Control>
            <Checkbox
              checked={globalState.tasks.find(x => x.id === props.id).done}
              onClick={() =>
                globalActions.modifyLine("tasks", props.id, "done", "true")
              }
            >
              {" "}
              {props.info.taskTitle}
            </Checkbox>
          </Control>

          <Tag.Group>
            {props.info.type === "timer" && (
              <Tag color="light" rounded>
                <Button
                  rounded
                  color={props.info.activeChrono ? "success" : "warning"}
                  size="small"
                  onClick={() => globalActions.toggleTimer(props.info.id)}
                >
                  {props.info.time === 0
                    ? "START"
                    : props.info.time > 0
                    ? hoursFormat(props.info.time)
                    : null}
                  <Button
                    renderAs="a"
                    remove
                    onClick={event => {
                      event.stopPropagation();
                      globalActions.toggleTimer(props.info.id, true);
                    }}
                  />
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
