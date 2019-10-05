import React, { useState, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Timer from "./timers/Timer";
import Todos from "./todos/Todos";

import {
  Container,
  Hero,
  Section,
  Box,
  Tile,
  Heading,
  Message,
  Input,
  Column,
  Columns,
  Button,
  Table,
  Level,
  Item
} from "react-bulma-components/full";

import "./app.scss";
import { useGlobal } from "./store";

const App = () => {
  const [globalState, globalActions] = useGlobal();

  const style = { textAlign: "center" };

  // const inputRef = useRef(null);

  function updateValue(e) {
    globalActions.setNewBoxSelect(e.target.name, e.target.value);
    let maxId = Math.max.apply(Math, globalState.boxes.map(o => o.id));
    console.log(maxId);

    globalActions.setNewBoxSelect("id", maxId >= 0 ? maxId + 1 : 0);
    console.log(globalState);
  }

  return (
    <div className="App">
      <Hero color="dark">
        <Hero.Body>
          <Container>
            <Heading>Timer</Heading>
            <Heading subtitle size={3}>
              Track where you spend your time
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>

      <Section>
        <Box>
          <Level className="is-mobile">
            <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                  Total tasks
                </Heading>
                <Heading renderAs="p">3,210</Heading>
              </div>
            </Level.Item>
            <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                  Total time
                </Heading>
                <Heading renderAs="p">210</Heading>
              </div>
            </Level.Item>
            <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                  Tasks done
                </Heading>
                <Heading renderAs="p">33</Heading>
              </div>
            </Level.Item>
          </Level>
        </Box>

        {true && <Todos />}

        <Box>
          <div className="field has-addons has-addons-right">
            <p className="control">
              <span className="select">
                <select
                  style={{ width: "8rem" }}
                  name="type"
                  value={globalState.newBox.type}
                  onChange={event =>
                    globalActions.setNewBoxSelect(
                      event.target.name,
                      event.target.value
                    )
                  }
                >
                  <option value="basic">Basic timer</option>
                  <option value="To-do">To-do</option>
                  <option value="detailed">Detailed </option>
                  <option value="exclusive">Exclusive</option>
                </select>
              </span>
            </p>

            <p className="control">
              <input
                className="input"
                type="text"
                name="title"
                // ref={inputRef}
                placeholder="Title of the box..."
                value={globalState.newBox["title"]}
                onChange={updateValue}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    globalActions.addBox(globalState.newBox);
                  }
                }}
              />
            </p>

            <p className="control">
              {globalState.newBox.title ? (
                <Button
                  onClick={() => {
                    globalActions.addBox(globalState.newBox);
                    // inputRef.current.focus();
                  }}
                  color={"info"}
                >
                  Add box
                </Button>
              ) : (
                <Button
                  disabled={true}
                  onClick={() => {
                    globalActions.addBox(globalState.newBox);
                    //inputRef.current.focus();
                  }}
                  color={"info"}
                >
                  Add box
                </Button>
              )}
            </p>
          </div>

          <Tile kind="ancestor">
            <Tile style={{ flexWrap: "wrap" }}>
              {globalState.boxes.map((x, index) => (
                <Timer title={x.title} id={x.id} key={x.id} />
              ))}
            </Tile>
          </Tile>
        </Box>
      </Section>
      <Section>
        <Box>
          <Message color={"info"}>
            <Message.Header>🚀 Roadmap</Message.Header>
            <Message.Body>
              <strong />
              <ul style={{ listStyleType: "circle", marginLeft: "30px" }}>
                <li>✔ Disable button if no text </li>
                <li>Autofocus input </li>
                <li>✔ Add on enter </li>
                <li>Unify boxs props</li>
                <li>Edit titles</li>
                <li>Remove/Add events</li>
                <li>Fix ugly front issues 🙊 </li>
                <li>Exclusive boxes (turns off the rest)</li>
                <li>To-do boxes </li>
                <li>Detailed boxes</li>
              </ul>
            </Message.Body>
          </Message>
        </Box>
      </Section>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
