import React, { useState, useEffect, useContext } from "react";
import {
  Columns,
  Column,
  Box,
  Heading,
  Message,
  Button
} from "react-bulma-components";
import { useGlobal } from "../store";

const Todos = props => {
  const [globalState, globalActions] = useGlobal();

  function updateValue(e) {
    globalActions.setNewTaskSelect(e.target.name, e.target.value);
    let maxId = Math.max.apply(Math, globalState.tasks.map(o => o.id));
    globalActions.setNewTaskSelect("id", maxId >= 0 ? maxId + 1 : 0);
  }

  function remove(e, id) {
    e.stopPropagation();
    globalActions.removeTask(id);
  }

  return (
    <Box>
      <div className="field has-addons has-addons-right">
        <p className="control">
          <span className="select">
            <select
              style={{ width: "8rem" }}
              name="type"
              value={globalState.newTask.type}
              onChange={event =>
                globalActions.setNewBoxSelect(
                  event.target.name,
                  event.target.value
                )
              }
            >
              <option value="basic">Basic task</option>
              <option value="timer-task">Timer-task</option>
              <option value="parent-task">Parent-task </option>
            </select>
          </span>
        </p>

        <p className="control">
          <input
            className="input"
            type="text"
            name="taskTitle"
            // ref={inputRef}
            placeholder="Task's name..."
            value={globalState.newTask["taskTitle"]}
            onChange={updateValue}
            onKeyDown={e => {
              if (e.key === "Enter") {
                globalActions.addTask(globalState.newTask);
              }
            }}
          />
        </p>

        <p className="control">
          {globalState.newTask.taskTitle ? (
            <Button
              onClick={() => {
                globalActions.addTask(globalState.newTask);
                // inputRef.current.focus();
              }}
              color={"info"}
            >
              Add task
            </Button>
          ) : (
            <Button disabled={true} color={"info"}>
              Add task
            </Button>
          )}
        </p>
      </div>

      <Columns>
        {globalState.tasks.map(x => (
          <Columns.Column size={6} key={x.id}>
            <Message color="info">
              <Message.Header>
                {x.taskTitle}
                <Button onClick={event => remove(event, x.id)} remove />
              </Message.Header>

              {false && x.taskDescription && (
                <Message.Body>
                  <Heading size={5} />
                  <Heading subtitle size={6} renderAs="h2">
                    {x.taskDescription}
                  </Heading>
                </Message.Body>
              )}
            </Message>{" "}
          </Columns.Column>
        ))}
      </Columns>
    </Box>
  );
};

export default Todos;
