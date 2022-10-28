import React, { ChangeEvent, useState } from "react";
import { addTask, showOnDate, showAll } from "../store/tasksSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { makeStyles, TextField } from "@material-ui/core";
import { Button, Stack } from "@mui/material";

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
          <Stack display="block" spacing={2} direction="row">
            <input
              type="date"
              className={classes.calendar}
              id="calendar"
              onChange={handleDate}
              value={selectedDate || ""}
            />
            <Button variant="contained" onClick={onShowAll} size="small">
              Show All Tasks
            </Button>
          </Stack>
        </div>
        <Stack spacing={2} direction="column">
          <label
            htmlFor="new-task"
            id="new-task-label"
            className={classes.newTaskLabel}
          >
            Input Task
          </label>
          <Stack spacing={2} direction="column">
            <TextField
              type="text"
              label="Enter Tasks"
              variant="outlined"
              onChange={handleChange}
              size="small"
              value={newTask}
            />
          </Stack>
          {taskDate < currentDate ? (
            <p className={classes.errorMsg}>Do not enter past date!</p>
          ) : null}

          <Stack spacing={2} direction="row">
            <input
              type="date"
              onChange={handleTaskDateChange}
              value={taskDate}
              defaultValue={currentDate}
            />

            <Button variant="contained" onClick={handleSubmit}>
              Add Task
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};
