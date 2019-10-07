import React, { useState, useEffect, useContext } from "react";
import { Columns, Heading, Message, Button, Tag } from "react-bulma-components";
import { Field, Checkbox, Control } from "bloomer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass, faPlus, faFw } from "@fortawesome/free-solid-svg-icons";

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
                globalActions.modifyVectorLine("tasks", props.id, "done", "!x")
              }
            >
              {props.info.taskTitle}
            </Checkbox>
          </Control>

          <Tag.Group>
            {props.info.type !== "timer" && !props.noTimer && (
              <Tag size="small" rounded>
                <Button
                  rounded
                  color="info"
                  size="small"
                  onClick={event => {
                    event.stopPropagation();
                    globalActions.modifyLine("tasks", props.id, "time", 0);
                    globalActions.modifyLine(
                      "tasks",
                      props.id,
                      "type",
                      "timer"
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp; <FontAwesomeIcon icon={faHourglass} />
                </Button>
              </Tag>
            )}
            {props.info.type === "timer" && (
              <Tag color="light" rounded>
                <Button
                  rounded
                  disabled={props.noTimer}
                  color={props.info.activeChrono ? "success" : "warning"}
                  size="small"
                  onClick={() =>
                    !props.noTimer && globalActions.toggleTimer(props.info.id)
                  }
                >
                  {props.info.time === 0 ? (
                    !props.noTimer ? (
                      <strong>START</strong>
                    ) : (
                      <strong>0s</strong>
                    )
                  ) : props.info.time > 0 ? (
                    <strong> {hoursFormat(props.info.time)} </strong>
                  ) : null}

                  {!props.noTimer && (
                    <Button
                      renderAs="a"
                      remove
                      onClick={event => {
                        event.stopPropagation();
                        props.info.activeChrono > 0
                          ? globalActions.toggleTimer(props.info.id, true)
                          : globalActions.modifyLine(
                              "tasks",
                              props.id,
                              "type",
                              "basic"
                            );
                      }}
                    />
                  )}
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
