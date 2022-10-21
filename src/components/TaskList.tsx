import React, { useState } from "react";
import "./TaskList.css";
import { useAppSelector } from "../hooks/hooks";
import { useAppDispatch } from "../hooks/hooks";
import { editTask, removeTask } from "../store/tasksSlice";
import { Task } from "../task.model";

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
    <ul id="task-div">
      {filteredTasks.map((task) => (
        <div key={task.id}>
          <li key={task.id}>
            <>
              {isedit && task.id === ID && task.date >= currentDate ? (
                <input
                  className="input-field"
                  defaultValue={task.text}
                  onChange={onEdit}
                  autoFocus
                ></input>
              ) : (
                <p className="input-field">{task.text}</p>
              )}
              <span id="new-task-date">{task.date}</span>
            </>
            <div id="buttons">
              {isedit && task.id === ID && task.date >= currentDate ? (
                <button id="save-btn" onClick={onSave}>
                  Save
                </button>
              ) : (
                <button
                  id="edit-btn"
                  onClick={() => onEditTask(task.id, task.date)}
                >
                  Edit
                </button>
              )}
              <button id="delete-btn" onClick={() => onDeleteTask(task.id)}>
                Delete
              </button>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
};
