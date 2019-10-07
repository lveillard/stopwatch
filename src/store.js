import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { inmutableSet, inmutableVectorSet } from "./helpers/helpers";

import useGlobalHook from "use-global-hook";

const initialState = {
  text: "null",
  newBox: { type: "basic", title: "" },
  newTask: { type: "basic", taskTitle: "", time: 0, isActive: false },
  current: null,
  tasks: [
    {
      id: 0,
      type: "basic",
      taskTitle: "Buy some bananas 🍌🍌",
      taskDescription: "Make this work like the section of timers",
      isActive: false
    },
    {
      id: 1,
      type: "basic",
      taskTitle: "Buy whortleberries",
      taskDescription: "Description",
      isActive: false
    },
    {
      id: 2,
      type: "timer",
      taskTitle: "Buy figs",
      taskDescription: "Description",
      time: 0,
      isActive: false,
      activeChrono: null
    },
    {
      id: 3,
      type: "timer",
      taskTitle: "Make a smoothie",
      taskDescription: "Description",
      time: 10,
      isActive: false
    }
  ],
  boxes: [
    { id: 0, title: "📧 Emails", type: "basic", time: 0, isActive: false },
    { id: 1, title: "🗣️ Slack", type: "basic", time: 0, isActive: false },
    { id: 2, title: "📝 Feature", type: "basic", time: 0, isActive: false },
    {
      id: 3,
      title: "💣 Interruption",
      type: "basic",
      time: 0,
      isActive: false
    },
    { id: 4, title: "📅 Meeting", type: "basic", time: 0, isActive: false },
    { id: 5, title: "⏸️ Break", type: "basic", time: 0, isActive: false },
    { id: 6, title: "🚀 Roadmap", type: "basic", time: 0, isActive: false },
    { id: 7, title: "❓ Asking", type: "basic", time: 0, isActive: false },
    { id: 8, title: "🐞 Bug", type: "basic", time: 0, isActive: false },
    {
      id: 9,
      title: "❌ Interruptions",
      type: "interruption",
      time: 0,
      isActive: false
    }
  ]
};

const actions = {
  // generic awesome functions
  modifyLine: (store, type, id, field, value) => {
    store.setState({
      [type]: inmutableSet(store.state[type], id, field, value)
    });
  },

  modifyVectorLine: (store, type, id, field, vector) => {
    store.setState({
      [type]: inmutableVectorSet(store.state[type], id, field, vector)
    });
  },

  // TODO MANAGEMENT

  toggleTimer: (store, id, reset) => {
    let current = store.state.tasks.find(x => x.id === id);

    reset &&
      store.setState({
        tasks: inmutableSet(store.state.tasks, id, "time", 0)
      });

    if (current.activeChrono) {
      //remove the chrono:
      clearInterval(current.activeChrono);
      store.setState({
        tasks: inmutableSet(store.state.tasks, id, "activeChrono", null)
      });
    } else if (!reset) {
      //create the chrono:
      const interval = setInterval(() => {
        store.actions.increaseTimer(id);
      }, 1000);
      store.setState({
        tasks: inmutableSet(store.state.tasks, id, "activeChrono", interval)
      });
    }
  },

  increaseTimer: (store, id) => {
    store.actions.modifyVectorLine("tasks", id, "time", "x+1");
  },

  addTask: (store, task) => {
    store.setState({ tasks: store.state.tasks.concat(task) });

    store.setState({ newTask: { type: "basic", taskTitle: "" } });
    console.log(store.state.tasks);
  },

  removeTask: (store, id) => {
    store.setState({
      tasks: store.state.tasks.filter(item => item.id !== id)
    });
  },

  setNewTaskSelect: (store, item, value) => {
    store.setState({ newTask: { ...store.state.newTask, [item]: value } });
  },

  // BOX MANAGEMENT

  //  1.Box creation
  setNewBoxSelect: (store, item, value) => {
    store.setState({ newBox: { ...store.state.newBox, [item]: value } });
  },

  addBox: (store, box) => {
    store.setState({ boxes: store.state.boxes.concat(box) });

    store.setState({ newBox: { type: "basic", title: "" } });
    console.log(store.state.boxes);
  },

  removeBox: (store, id) => {
    store.setState({
      boxes: store.state.boxes.filter(item => item.id !== id)
    });
  },

  // 2.Box timers
  updateTime: (store, id) => {
    // old methof
    //let a = store.state.values;
    //a.find(x => x.id === id)
    // ? (a.find(x => x.id === id).time = time + 1)
    // : a.push({ id: id, time: time + 1 });
    //store.setState({ values: a });

    // new nethod
    const oldValue = store.state.boxes.find(x => x.id === id);
    const newValue = { ...oldValue, time: oldValue.time + 1 };
    const indexOldElement = store.state.boxes.findIndex(
      ({ id }) => id === newValue.id
    );
    const newArray = Object.assign([...store.state.boxes], {
      [indexOldElement]: newValue
    });
    store.setState({ boxes: newArray });
  },
  resetTime: (store, id) => {
    // new nethod
    const oldValue = store.state.boxes.find(x => x.id === id);
    const newValue = { ...oldValue, time: 0 };
    const indexOldElement = store.state.boxes.findIndex(
      ({ id }) => id === newValue.id
    );
    const newArray = Object.assign([...store.state.boxes], {
      [indexOldElement]: newValue
    });
    store.setState({ boxes: newArray });
  },
  // 3. Last active box
  setActive: (store, id) => {
    const oldValue = store.state.boxes.find(x => x.id === id);
    const newValue = { ...oldValue, isActive: !oldValue.isActive };
    const indexOldElement = store.state.boxes.findIndex(
      ({ id }) => id === newValue.id
    );
    const newArray = Object.assign([...store.state.boxes], {
      [indexOldElement]: newValue
    });

    store.setState({ boxes: newArray });
  }
};

export const useGlobal = useGlobalHook(React, initialState, actions);
