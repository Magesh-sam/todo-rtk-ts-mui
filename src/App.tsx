import "./App.css";
import  { useState, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import { addTodo, removeTodo, setTodoStatus} from "./redux/todoSlice";

import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Stack } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [todoDescription, setTodoDescription] = useState("");
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);
  const [remove, setremove] = useState(false);

  const todoList = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddItem = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (todoDescription.length <= 0) {
      seterror(true);
    }
    todoDescription && (dispatch(addTodo(todoDescription)), setsuccess(true));
    setTodoDescription("");
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeTodo(id));
    setremove(true);
  };

  const handleTodoStatus = (id: string) => {
    dispatch(setTodoStatus(id));
  };

  const handleCloseError = () => seterror(false);
  const handleCloseSuccess = () => setsuccess(false);
  const handleCloseRemove = () => setremove(false);
  return (
    <Container sx={{ position: "relative" }} maxWidth="sm">
      <Typography align="center" variant="h5" p={3}>
        Todo App using Redux-TS-MUI
      </Typography>
      <Stack component="form" direction="row" spacing={3}>
        <TextField
          required
          value={todoDescription}
          variant="outlined"
          label="Todo Task"
          placeholder="Add your task..."
          fullWidth
          onChange={(e) => setTodoDescription(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          onClick={(e) => handleAddItem(e)}
          sx={{ width: "200px" }}
        >
          Add Task
        </Button>
      </Stack>
      <Snackbar
        sx={{ position: "absolute", top: "180px", marginLeft: "100px" }}
        open={error}
        autoHideDuration={1000}
        onClose={handleCloseError}
      >
        <Stack direction="row">
          <Alert variant="filled" severity="error">
            Add Item!
          </Alert>
          <IconButton onClick={handleCloseError}>
            <CloseIcon color="error" />
          </IconButton>
        </Stack>
      </Snackbar>
      <Snackbar
        sx={{ position: "absolute", top: "180px", marginLeft: "100px" }}
        open={success}
        autoHideDuration={1000}
        onClose={handleCloseSuccess}
      >
        <Stack direction="row">
          <Alert variant="filled" severity="success">
            Task Added Successfully!
          </Alert>
          <IconButton onClick={handleCloseSuccess}>
            <CloseIcon color="success" />
          </IconButton>
        </Stack>
      </Snackbar>
      <Snackbar
        sx={{ position: "absolute", top: "180px", marginLeft: "100px" }}
        open={remove}
        autoHideDuration={1000}
        onClose={handleCloseRemove}
      >
        <Stack direction="row">
          <Alert variant="filled" severity="info">
            Task Removed Successfully!
          </Alert>
          <IconButton onClick={handleCloseRemove}>
            <CloseIcon color="info" />
          </IconButton>
        </Stack>
      </Snackbar>

      <List>
        {todoList.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              sx={{
                textDecoration: todo.completed
                  ? "line-through 3px red"
                  : "none",
              }}
            >
              {todo.task}
            </ListItemText>
            <ListItemSecondaryAction>
              <Checkbox
                checked={todo.completed}
                onClick={() => handleTodoStatus(todo.id)}
              />
              <IconButton
                className="removebtn"
                onClick={() => handleRemoveItem(todo.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
