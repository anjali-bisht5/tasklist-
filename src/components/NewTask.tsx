import React, { ChangeEvent, useState } from "react";
import "./NewTask.css";
import { addTask, showOnDate, showAll } from "../store/tasksSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

export const NewTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentDate = new Date().toISOString().split("T")[0];
  const [newTask, setNewTask] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>(currentDate);
  const selectedDate = useAppSelector((state) => state.tasks.selectedDate);

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!newTask || !taskDate) {
      return;
    } else if (newTask && taskDate >= currentDate) {
      dispatch(addTask({ text: newTask, date: taskDate }));
      setNewTask("");
      setTaskDate(currentDate);
    } else if (taskDate < currentDate) {
      setNewTask("");
      setTaskDate(currentDate);
      return;
    }
  };

  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    if (date >= currentDate) {
      dispatch(showOnDate(date));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleTaskDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDate(event.target.value);
  };

  const onShowAll = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(showAll());
  };

  return (
    <div>
      <form>
        <div id="calendar-div">
          <input
            type="date"
            id="calendar"
            onChange={handleDate}
            value={selectedDate || ""}
          />
          <button type="submit" onClick={onShowAll} id="show-btn">
            Show All Tasks
          </button>
        </div>
        <div id="new-task-form">
          <label htmlFor="new-task" id="new-task-label">
            Input Task
          </label>
          <input
            type="text"
            value={newTask}
            id="new-task"
            onChange={handleChange}
            placeholder="Enter Tasks"
            autoFocus
          />
        </div>
        {taskDate < currentDate ? (
          <p id="error-msg">Do not enter past date!</p>
        ) : null}
        <input
          type="date"
          id="task-date"
          onChange={handleTaskDateChange}
          value={taskDate}
          defaultValue={currentDate}
        />
        <button type="submit" id="submit-btn" onClick={handleSubmit}>
          Add Task
        </button>
      </form>
    </div>
  );
};
