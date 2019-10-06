import React, { useState, useEffect } from "react";
import { Columns, Box, Button } from "react-bulma-components";
import { useGlobal } from "../store";
import Todo from "./Todo";

const Todos = props => {
  const [globalState, globalActions] = useGlobal();
  const [isHidden, setIsHidden] = useState(false);

  function updateValue(e) {
    globalActions.setNewTaskSelect(e.target.name, e.target.value);
    let maxId = Math.max.apply(Math, globalState.tasks.map(o => o.id));
    globalActions.setNewTaskSelect("id", maxId >= 0 ? maxId + 1 : 0);
    globalActions.setNewTaskSelect("time", 0);
  }

  return (
    <Box>
      <Columns>
        <Columns.Column>
          <Button
            color="dark"
            className="is-fullwidth

            "
            onClick={() => setIsHidden(isHidden => !isHidden)}
          >
            {" "}
            TASKS{" "}
          </Button>
        </Columns.Column>
        <Columns.Column size={8}>
          <div className="field has-addons has-addons-right">
            <p className="control">
              <span className="select">
                <select
                  style={{ width: "8.5rem" }}
                  name="type"
                  value={globalState.newTask.type}
                  onChange={event =>
                    globalActions.setNewTaskSelect(
                      event.target.name,
                      event.target.value
                    )
                  }
                >
                  <option value="basic">Basic task</option>
                  <option value="timer">Timer-task</option>
                  <option disabled value="parent-task">
                    Parent-task
                  </option>
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
                    setIsHidden(isHidden => false);
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
        </Columns.Column>
      </Columns>

      {!isHidden && (
        <Columns>
          {globalState.tasks.map(x => (
            <Todo key={x.id} id={x.id} info={x} />
          ))}
        </Columns>
      )}
    </Box>
  );
};

export default Todos;
