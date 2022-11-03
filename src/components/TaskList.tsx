import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { Task } from "../task.model";
import { Stack } from "@mui/material";
import { WIPTask } from "./WIPTask";
import { CompletedTask } from "./CompletedTask";

const getFilteredTasks = (tasks: Task[], selectedDate: string | null) => {
  if (!selectedDate) {
    return tasks;
  }
  return tasks.filter((task) => task.date === selectedDate);
};

export const TaskList: React.FC = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const selectedDate = useAppSelector((state) => state.tasks.selectedDate);
  const filteredTasks = getFilteredTasks(tasks, selectedDate);

  return (
    <Stack
      spacing={2}
      direction="row"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        sx={{
          width: 500,
          height: 550,
          border: "1px solid black",
          backgroundColor: "lightblue",
          margin: 2,
          textAlign: "center",
          padding: 2,
        }}
      >
        WIP Tasks
        {filteredTasks
          .filter((task) => task.status === "wip")
          .map((task) => (
            <WIPTask
              key={task.id}
              id={task.id}
              text={task.text}
              date={task.date}
              status={task.status}
            ></WIPTask>
          ))}
      </Stack>
      <Stack
        sx={{
          width: 500,
          height: 550,
          backgroundColor: "lightcyan",
          border: "1px solid black",
          margin: 2,
          textAlign: "center",
          padding: 2,
        }}
      >
        Completed Tasks
        <CompletedTask>
          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <WIPTask
                key={task.id}
                id={task.id}
                text={task.text}
                date={task.date}
                status={task.status}
              />
            ))}
        </CompletedTask>
      </Stack>
    </Stack>
  );
};
