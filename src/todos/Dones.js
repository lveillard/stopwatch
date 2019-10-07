import React, { useState, useEffect } from "react";
import { Container, Columns, Box, Button } from "react-bulma-components";
import { useGlobal } from "../store";
import Todo from "./Todo";

const Dones = props => {
  const [globalState, globalActions] = useGlobal();
  const [isHidden, setIsHidden] = useState(false);

  function updateValue(e) {
    globalActions.setNewTaskSelect(e.target.name, e.target.value);
    let maxId = Math.max.apply(Math, globalState.tasks.map(o => o.id));
    globalActions.setNewTaskSelect("id", maxId >= 0 ? maxId + 1 : 0);
    globalActions.setNewTaskSelect("time", 0);
  }

  return (
    <Container>
      <Columns>
        <Columns.Column>
          <Button
            color="success"
            className="is-fullwidth

            "
            onClick={() => setIsHidden(isHidden => !isHidden)}
          >
            {" "}
            DONE TASKS{" "}
          </Button>
        </Columns.Column>
        <Columns.Column size={8} />
      </Columns>

      {!isHidden && (
        <Columns>
          {globalState.tasks
            .filter(x => x.done === true)
            .map(x => (
              <Todo key={x.id} id={x.id} info={x} noTimer />
            ))}
        </Columns>
      )}
    </Container>
  );
};

export default Dones;
