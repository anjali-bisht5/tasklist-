import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { editTask, removeTask } from "../store/tasksSlice";
import { Task } from "../task.model";
import { makeStyles, Button } from "@material-ui/core";

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
  saveBtn: {
    width: "4.5rem",
    backgroundColor: "rgb(27, 81, 27)",
    color: "white",
    fontSize: "0.9rem",
    marginRight: "10px",
    borderStyle: "none",
    padding: "8px",
    borderRadius: "5px",
  },
  editBtn: {
    width: "4.5rem",
    marginRight: "10px",
    fontSize: "0.9rem",
    backgroundColor: "lightseagreen",
    color: "black",
    borderStyle: "none",
    padding: "8px",
    borderRadius: "5px",
  },
  deleteBtn: {
    width: "4.5rem",
    backgroundColor: " rgb(129, 53, 53)",
    color: "white",
    fontSize: "0.9rem",
    borderStyle: "none",
    padding: "8px",
    borderRadius: "5px",
  },
  inputField: {
    width: "20rem",
    display: "block",
    wordWrap: "break-word",
    marginRight: "2rem",
  },
  buttons: {
    display: "flex",
    width: "13rem",
    borderStyle: "none",
    padding: "8px",
    borderRadius: "5px",
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
  const [isedit, setIsEdit] = useState<boolean>(false);
  const [editedValue, setEditedValue] = useState<string>("");
  const [ID, setID] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const currentDate = new Date().toISOString().split("T")[0];
  const selectedDate = useAppSelector((state) => state.tasks.selectedDate);
  const filteredTasks = getFilteredTasks(tasks, selectedDate);

  const classes = useStyles();

  const onEditTask = (ID: string, date: string) => {
    if (date < currentDate) {
      setIsEdit(false);
    }
    setIsEdit(true);
    setID(ID);
    setIndex(tasks.findIndex((x) => x.id === ID));
  };
  const onSave = () => {
    if (editedValue) {
      dispatch(editTask({ id: ID, text: editedValue, index: index }));
      setIsEdit(false);
    }
    setIsEdit(false);
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
              {isedit && task.id === ID && task.date >= currentDate ? (
                <input
                  className={classes.inputField}
                  defaultValue={task.text}
                  onChange={onEdit}
                  autoFocus
                ></input>
              ) : (
                <p className={classes.inputField}>{task.text}</p>
              )}
              <span className={classes.newTaskDate}>{task.date}</span>
            </>
            <div className={classes.buttons}>
              {isedit && task.id === ID && task.date >= currentDate ? (
                <Button
                  variant="contained"
                  onClick={onSave}
                  className={classes.saveBtn}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => onEditTask(task.id, task.date)}
                  className={classes.editBtn}
                >
                  Edit
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => onDeleteTask(task.id)}
                className={classes.deleteBtn}
              >
                Delete
              </Button>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
};
