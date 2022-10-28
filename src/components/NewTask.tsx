import React, { ChangeEvent, useState } from "react";
import { addTask, showOnDate, showAll } from "../store/tasksSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { makeStyles, TextField, Typography } from "@material-ui/core";
import { Button, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

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
});

export const NewTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentDate = new Date().toISOString().split("T")[0];
  const [newTask, setNewTask] = useState<string>("");
  const [taskDate, setTaskDate] = useState<string>(currentDate);
  const selectedDate = useAppSelector((state) => state.tasks.selectedDate);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTaskDate(currentDate);
    setNewTask("");
  };

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
    }
    handleClose();
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
        <Typography
          variant="h3"
          style={{ color: "#00adb5", marginBottom: "50px" }}
          align="center"
        >
          Click on Add Task Button to add tasks.
        </Typography>
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

        <div>
          <Button
            style={{
              backgroundColor: "#00adb5",
              color: "white",
              borderStyle: "none",
            }}
            variant="outlined"
            onClick={handleClickOpen}
          >
            Add Task
          </Button>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Enter tasks</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter Tasks"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={newTask}
              />
              {taskDate < currentDate ? (
                <Alert severity="warning">Do not enter past date!</Alert>
              ) : null}
              <TextField
                type="date"
                onChange={handleTaskDateChange}
                value={taskDate}
                defaultValue={currentDate}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>Add Task</Button>
            </DialogActions>
          </Dialog>
        </div>
      </form>
    </div>
  );
};
