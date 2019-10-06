import React, { useState, useContext, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Timer from "./timers/Timer";
import Interruption from "./timers/Interruption";
import Todos from "./todos/Todos";
import { hoursFormat } from "./helpers/helpers";
import moment from "moment";
import Top from "./medias/top.jpg";

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

  const [totalTempTasks, setTotalTempTasks] = useState(0);
  const [totalTempTimers, setTotalTempTimers] = useState(0);
  const [totalTempInterruptions, setTotalTempInterruptions] = useState(0);
  const [totalInterruptions, setTotalInterruptions] = useState(0);

  const [isHidden, setIsHidden] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  const [totalDone, setTotalDone] = useState(0);

  const style = { textAlign: "center" };

  useEffect(() => {
    setTotalTempTimers(
      globalState.boxes
        .filter(x => x.type !== "interruption")
        .reduce((a, b) => a + (b.time || 0), 0)
    );
    setTotalTempTasks(globalState.tasks.reduce((a, b) => a + (b.time || 0), 0));
    setTotalInterruptions(
      globalState.boxes
        .filter(x => x.type === "interruption")
        .reduce((a, b) => a + (b.events || 0), 0)
    );

    setTotalTempInterruptions(
      globalState.boxes
        .filter(x => x.type === "interruption")
        .reduce((a, b) => a + (b.time || 0), 0)
    );
    setTotalDone(globalState.tasks.filter(x => x.done === true).length);
  }, [globalState.tasks, globalState.boxes]);

  // const inputRef = useRef(null);

  function updateValue(e) {
    globalActions.setNewBoxSelect(e.target.name, e.target.value);
    let maxId = Math.max.apply(Math, globalState.boxes.map(o => o.id));
    globalActions.setNewBoxSelect("id", maxId >= 0 ? maxId + 1 : 0);
    globalActions.setNewBoxSelect("time", 0);
    globalActions.setNewBoxSelect("isActive", false);
  }

  return (
    <div className="App">
      <Hero
        style={{
          backgroundImage: `linear-gradient(to right, rgba(32,156,238,0.99), rgba(32,156,238, 0.93)),
          url(${Top})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
        color="dark"
      >
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
                  Today
                </Heading>
                <Heading renderAs="p">{moment().format("DD/MM/YYYY")}</Heading>
              </div>
            </Level.Item>

            <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                  Total tasks
                </Heading>
                <Heading renderAs="p">{globalState.tasks.length}</Heading>
              </div>
            </Level.Item>

            <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                  Remaining tasks
                </Heading>
                <Heading renderAs="p" className="has-text-warning">
                  {globalState.tasks.length - totalDone}
                </Heading>
              </div>
            </Level.Item>

            <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                  Tasks done
                </Heading>
                <Heading className="has-text-success" renderAs="p">
                  {totalDone}
                </Heading>
              </div>
            </Level.Item>

            <Level.Item style={style}>
              <div>
                <Heading renderAs="p" heading>
                  Total interruption time
                </Heading>
                <Heading renderAs="p" className="has-text-danger">
                  {hoursFormat(totalTempInterruptions)}
                </Heading>
              </div>
            </Level.Item>
          </Level>

          {isSummaryExpanded && (
            <Level className="is-mobile">
              <Level.Item style={style}>
                <div>
                  <Heading renderAs="p" heading>
                    Total time
                  </Heading>
                  <Heading renderAs="p">
                    {hoursFormat(totalTempTasks + totalTempTimers)}
                  </Heading>
                </div>
              </Level.Item>

              <Level.Item style={style}>
                <div>
                  <Heading renderAs="p" heading>
                    Total timers time
                  </Heading>
                  <Heading renderAs="p">{hoursFormat(totalTempTimers)}</Heading>
                </div>
              </Level.Item>
              <Level.Item style={style}>
                <div>
                  <Heading renderAs="p" heading>
                    Total task time
                  </Heading>
                  <Heading renderAs="p" className="has-text-success">
                    {hoursFormat(totalTempTasks)}
                  </Heading>
                </div>
              </Level.Item>
              <Level.Item style={style}>
                <div>
                  <Heading renderAs="p" heading>
                    Total interruptions
                  </Heading>
                  <Heading renderAs="p" className="has-text-danger">
                    {totalInterruptions}
                  </Heading>
                </div>
              </Level.Item>
            </Level>
          )}
          <Button
            style={{ height: "5px" }}
            className="is-fullwidth"
            color="dark"
            onClick={() =>
              setIsSummaryExpanded(isSummaryExpanded => !isSummaryExpanded)
            }
          />
        </Box>

        {true && <Todos />}

        <Box>
          <Columns>
            <Columns.Column>
              <Button
                color="dark"
                className="is-fullwidth"
                onClick={() => setIsHidden(isHidden => !isHidden)}
              >
                {" "}
                TIMERS{" "}
              </Button>
            </Columns.Column>
            <Columns.Column size={8}>
              <div className="field has-addons has-addons-right">
                <p className="control">
                  <span className="select">
                    <select
                      style={{ width: "8.5rem" }}
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
                      <option value="interruption">Interruption</option>
                      <option disabled value="detailed">
                        Detailed{" "}
                      </option>
                      <option disabled value="exclusive">
                        Exclusive
                      </option>
                    </select>
                  </span>
                </p>

                <p className="control">
                  <input
                    className="input"
                    type="text"
                    name="title"
                    // ref={inputRef}
                    placeholder="Title of the timer..."
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
                        setIsHidden(isHidden => false);
                        // inputRef.current.focus();
                      }}
                      color={"info"}
                    >
                      Add timer
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
                      Add timer
                    </Button>
                  )}
                </p>
              </div>
            </Columns.Column>
          </Columns>

          {!isHidden &&
            globalState.boxes
              .filter(x => x.type === "interruption")
              .map((x, index) => (
                <Tile kind="ancestor">
                  <Tile style={{ flexWrap: "wrap" }}>
                    <Interruption title={x.title} id={x.id} key={x.id} />
                  </Tile>
                </Tile>
              ))}

          {!isHidden && (
            <Tile kind="ancestor">
              <Tile style={{ flexWrap: "wrap" }}>
                {globalState.boxes
                  .filter(x => x.type !== "interruption")
                  .map((x, index) => (
                    <Timer title={x.title} id={x.id} key={x.id} />
                  ))}
              </Tile>
            </Tile>
          )}
        </Box>

        <Box>
          <Message color={"info"}>
            <Message.Header>🚀 Roadmap</Message.Header>
            <Message.Body>
              <strong />
              <ul style={{ listStyleType: "circle", marginLeft: "30px" }}>
                <li>✔ Disable button if no text </li>
                <li>✔ Add global summary</li>
                <li>Autofocus input </li>
                <li>
                  ✔Timer tasks front: <em>13m 19s</em>
                </li>
                <li>interruptions type and shortcuts </li>
                <li>✔Timer tasks back</li>
                <li>Send tasks to done </li>
                <li>✔ Add on enter </li>
                <li>✔Unify boxs props</li>
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
