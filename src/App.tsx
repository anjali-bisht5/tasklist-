import React from "react";
import "./App.css";
import NewTask from "./components/NewTask";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <NewTask />
      <TaskList />
    </div>
  );
}

export default App;
