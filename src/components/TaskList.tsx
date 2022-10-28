import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { editTask, removeTask } from "../store/tasksSlice";
import { Task } from "../task.model";
import { makeStyles, Button, TextField } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles({
  taskDiv: {
    listStyle: "none",
    width: "90%;",
    maxWidth: "55rem",
    margin: "2rem auto",
    padding: 0,
  },
  newTaskDate: {
    width: "10rem",
  },
  li: {
    margin: "1rem 0",
    padding: "0.7rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputField: {
    width: "20rem",
    display: "block",
    wordWrap: "break-word",
    marginRight: "2rem",
  },
});

const getFilteredTasks = (tasks: Task[], selectedDate: string | null) => {
  if (!selectedDate) {
    return tasks;
  }
  return tasks.filter((task) => task.date === selectedDate);
};

export const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [editedValue, setEditedValue] = useState<string>("");
  const [ID, setID] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const currentDate = new Date().toISOString().split("T")[0];
  const selectedDate = useAppSelector((state) => state.tasks.selectedDate);
  const filteredTasks = getFilteredTasks(tasks, selectedDate);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onEditTask = (ID: string) => {
    setID(ID);
    setIndex(tasks.findIndex((x) => x.id === ID));
    handleClickOpen();
  };
  const onSave = () => {
    if (editedValue) {
      dispatch(editTask({ id: ID, text: editedValue, index: index }));
      handleClose();
    }
  };
  const onEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedValue(event.target.value);
  };

  const onDeleteTask = (taskId: string) => {
    dispatch(removeTask(taskId));
  };

  return (
    <ul className={classes.taskDiv}>
      {filteredTasks.map((task) => (
        <div key={task.id}>
          <li className={classes.li}>
            <>
              <p className={classes.inputField}>{task.text}</p>
              <p>{task.date}</p>
            </>
            <div>
              <Stack spacing={2} direction="row">
                <Button
                  style={{
                    backgroundColor: "#00adb5",
                    color: "white",
                    borderStyle: "none",
                    width: 100,
                  }}
                  startIcon={<EditIcon />}
                  variant="outlined"
                  onClick={() => onEditTask(task.id)}
                >
                  Edit
                </Button>
                {task.id === ID && task.date >= currentDate && (
                  <Dialog open={open} onClose={handleClose} fullWidth>
                    <DialogTitle>Edit task</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Edit Task"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={onEdit}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={onSave}>Save</Button>
                    </DialogActions>
                  </Dialog>
                )}

                <Button
                  style={{
                    width: 100,
                    backgroundColor: "rgb(129, 53, 53)",
                    color: "white",
                  }}
                  startIcon={<DeleteIcon />}
                  variant="contained"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </Button>
              </Stack>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
};
