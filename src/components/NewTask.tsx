import React, { ChangeEvent, useState } from "react";
import { addTask, showOnDate, showAll } from "../store/tasksSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  form: {
    margin: "3rem",
    fontSize: "1.2rem",
  },
  calendarDiv: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "right",
    fontSize: "large",
  },
  calendar: {
    padding: "5px",
    fontWeight: "bolder",
  },
  showBtn: {
    marginLeft: "1rem",
    backgroundColor: "lightseagreen",
    color: "black",
    borderStyle: "none",
    padding: "8px",
    borderRadius: "5px",
  },
  newTaskLabel: {
    fontWeight: 600,
  },
  newTask: {
    fontSize: "1rem",
    marginTop: "10px",
    width: "100%",
    padding: "5px",
    border: " 1px solid lightseagreen",
  },
  submitBtn: {
    fontSize: "0.9rem",
    marginTop: "1rem",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "lightseagreen",
    color: "black",
    borderStyle: "none",
    marginLeft: "1rem",
  },
  errorMsg: {
    color: "rgb(181, 83, 83)",
  },
});

export const NewTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentDate = new Date().toISOString().split("T")[0];
  const [newTask, setNewTask] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>(currentDate);
  const selectedDate = useAppSelector((state) => state.tasks.selectedDate);

  const classes = useStyles();

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
      <form className={classes.form}>
        <div className={classes.calendarDiv}>
          <input
            type="date"
            className={classes.calendar}
            id="calendar"
            onChange={handleDate}
            value={selectedDate || ""}
          />
          <button type="submit" onClick={onShowAll} className={classes.showBtn}>
            Show All Tasks
          </button>
        </div>
        <div>
          <label
            htmlFor="new-task"
            id="new-task-label"
            className={classes.newTaskLabel}
          >
            Input Task
          </label>
          <input
            type="text"
            value={newTask}
            id="new-task"
            onChange={handleChange}
            placeholder="Enter Tasks"
            className={classes.newTask}
            autoFocus
          />
        </div>
        {taskDate < currentDate ? (
          <p className={classes.errorMsg}>Do not enter past date!</p>
        ) : null}
        <input
          type="date"
          onChange={handleTaskDateChange}
          value={taskDate}
          defaultValue={currentDate}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className={classes.submitBtn}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};
