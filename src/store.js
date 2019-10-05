import React, { useState, useEffect, useContext } from "react";

import useGlobalHook from "use-global-hook";

const initialState = {
  text: "null",
  newBox: { type: "basic", title: "" },
  newTask: { type: "basic", taskTitle: "" },
  current: null,
  tasks: [
    {
      id: 0,
      taskTitle: "Link the add button",
      taskDescription: "Make this work like the section of timers"
    },
    {
      id: 1,
      taskTitle: "Title",
      taskDescription: "Description"
    },
    {
      id: 2,
      taskTitle: "Title",
      taskDescription: "Description"
    },
    {
      id: 3,
      taskTitle: "Title",
      taskDescription: "Description"
    },
    {
      id: 4,
      taskTitle: "Title",
      taskDescription: "Description"
    }
  ],
  boxes: [
    { id: 0, title: "📧 Emails", type: "basic", time: 0 },
    { id: 1, title: "🗣️ Slack", type: "basic", time: 0 },
    { id: 2, title: "📝 Feature", type: "basic", time: 0 },
    { id: 3, title: "💣 Interruption", type: "basic", time: 0 },
    { id: 4, title: "📅 Meeting", type: "basic", time: 0 },
    { id: 5, title: "⏸️ Break", type: "basic", time: 0 },
    { id: 6, title: "🚀 Roadmap", type: "basic", time: 0 },
    { id: 7, title: "❓ Asking", type: "basic", time: 0 },
    { id: 8, title: "🐞 Bug", type: "basic", time: 0 }
  ]
};

const actions = {
  // TODO MANAGEMENT

  addTask: (store, task) => {
    console.log(task);
    store.setState({ tasks: store.state.tasks.concat(task) });

    store.setState({ newTask: { type: "basic", taskTitle: "" } });
    console.log(store.state.tasks);
  },

  removeTask: (store, id) => {
    store.setState({
      tasks: store.state.tasks.filter(item => item.id !== id)
    });
    console.log(store.state.tasks);
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
  updateTime: (store, id, time) => {
    // old methof
    //let a = store.state.values;
    //a.find(x => x.id === id)
    // ? (a.find(x => x.id === id).time = time + 1)
    // : a.push({ id: id, time: time + 1 });
    //store.setState({ values: a });

    // new nethod
    const oldValue = store.state.boxes.find(x => x.id === id);
    const newValue = { ...oldValue, time: time + 1 };
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
    store.setState({ current: id });
  }
};

export const useGlobal = useGlobalHook(React, initialState, actions);
