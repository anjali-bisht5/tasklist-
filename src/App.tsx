import React from "react";
import "./App.css";
import { NewTask } from "./components/NewTask";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <NewTask />
        <TaskList />
      </DndProvider>
    </div>
  );
}

export default App;
