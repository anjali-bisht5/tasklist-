import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import { itemTypes } from "../task.model";
import { onDrop } from "../store/tasksSlice";
import { useAppDispatch } from "../hooks/hooks";

interface CompletedTaskProps {
  children: React.ReactNode;
}

interface ITEM {
  id: string;
}

export const CompletedTask: React.FC<CompletedTaskProps> = (
  props: CompletedTaskProps
) => {
  const dispatch = useAppDispatch();

  const markAsDone = (id: string) => {
    dispatch(onDrop(id));
  };

  const { children } = props;
  const [, drop] = useDrop(() => ({
    accept: itemTypes.TASK,
    drop: (item: ITEM, monitor) => markAsDone(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <Box
      style={{ backgroundColor: "lightcyan" }}
      ref={drop}
      sx={{
        height: 500,
        minHeight: "200px",
        rounded: "md",
        w: "90%",
        p: 1,
        margin: 1,
      }}
    >
      {children}
    </Box>
  );
};
