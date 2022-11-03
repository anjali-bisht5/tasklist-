import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { editTask, removeTask } from "../store/tasksSlice";
import { itemTypes } from "../task.model";
import { Button, TextField } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import { useDrag } from "react-dnd";

interface TaskCardProps {
  id: string;
  text: string;
  date: string;
  status: string;
}
const useStyles = makeStyles({
  taskDiv: {
    listStyle: "none",
    width: "90%;",
    margin: "1rem auto",
    padding: 0,
  },
  newTaskDate: {
    width: "10rem",
  },
  li: {
    padding: "0.7rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    borderRadius: "6px",
    backgroundColor: "white",
  },
  inputField: {
    width: "10rem",
    display: "block",
    wordWrap: "break-word",
    marginRight: "2rem",
  },
});

export const WIPTask = (props: TaskCardProps) => {
  const classes = useStyles();
  const currentDate = new Date().toISOString().split("T")[0];
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [editedValue, setEditedValue] = useState<string>("");
  const [ID, setID] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
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

  const [{ isDragging }, drag] = useDrag(() => ({
    type: itemTypes.TASK,
    item: { id: props.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div>
      <Stack>
        <Box style={{ opacity: isDragging ? "0.5" : "1" }} ref={drag}>
          <ul className={classes.taskDiv}>
            <div key={props.id}>
              <li className={classes.li}>
                <Stack>
                  <Stack spacing={2} direction="row">
                    <p className={classes.inputField}>{props.text}</p>
                    <p>{props.date}</p>
                  </Stack>
                  <div>
                    <Stack
                      spacing={2}
                      direction="row"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {props.status === "wip" && (
                        <Button
                          style={{
                            backgroundColor: "#00adb5",
                            color: "white",
                            borderStyle: "none",
                            width: "auto",
                          }}
                          startIcon={<EditIcon />}
                          variant="outlined"
                          onClick={() => onEditTask(props.id)}
                        >
                          Edit
                        </Button>
                      )}
                      {props.id === ID && props.date >= currentDate && (
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
                        onClick={() => onDeleteTask(props.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </div>
                </Stack>
              </li>
            </div>
          </ul>
        </Box>
      </Stack>
    </div>
  );
};
