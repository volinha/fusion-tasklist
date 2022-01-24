import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import TagActions from "../../components/store/actions/tags";
import TaskActions from "../../components/store/actions/tasks";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ptbrLocale from "date-fns/locale/pt-BR";
import { useParams } from "react-router-dom";

const localeMap = {
  ptbr: ptbrLocale,
};

const NewTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tagsArray = useSelector((state) => state.tags);

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState(new Date());
  const [tag, setTag] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const [locale, setLocale] = useState("ptbr");

  useEffect(() => {
    dispatch(TagActions.ClearTagList());

    if (!id) return 0;
    var allTasks = JSON.parse(localStorage.getItem("persistantState")).tasks
      .items;
    const selectedTask = allTasks.filter((item) => {
      return id === item.id;
    });
    if (selectedTask.length !== 1) return "A busca não retornou resultado.";

    setTitle(selectedTask[0].title);
    setPriority(selectedTask[0].priority);
    setDate(selectedTask[0].date);
    setIsEdit(true);

    selectedTask[0].tags.forEach((item) => {
      loadTagList(item.id, item.value);
    });
    return 0;
  }, []);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlePriority = (e) => {
    setPriority(e.target.value);
  };

  const handleTag = (e) => {
    setTag(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  function handleAddTag() {
    if (!tag) return alert("Não é possível enviar uma tag vazia!");
    dispatch(TagActions.AddTagList(uuid(), tag));
    setTag("");
    document.getElementById("input-text-tag").focus();
  }

  function loadTagList(id, tag) {
    dispatch(TagActions.AddTagList(id, tag));
    setTag("");
  }

  function sendTask() {
    if (!title || !priority) return alert("Preencha todos os campos!");
    const task = {
      id: uuid(),
      title: title,
      status: "open",
      priority: priority,
      createdAt: Date.now(),
      tags: tagsArray.tags,
      date: date,
    };

    dispatch(TaskActions.AddTask(task));
    dispatch(TagActions.ClearTagList());
    setTitle("");
    setPriority("");
    setDate(new Date());
  }

  return (
    <Grid container columns={12} direction="row" style={{ margin: "16px" }}>
      <Grid item xs={4}>
        <Grid container columns={12} spacing={4} direction="column">
          <Grid item xs={4}>
            <TextField
              id="titulo-tarefa"
              label="Título"
              variant="standard"
              fullWidth
              onChange={handleTitle}
              value={title}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="id-select-prioridade">Prioridade</InputLabel>
              <Select
                labelId="id-select-prioridade"
                id="select-prioridade"
                value={priority}
                label="Age"
                variant="standard"
                onChange={handlePriority}
              >
                <MenuItem value={"normal"}>Normal</MenuItem>
                <MenuItem value={"importante"}>Importante</MenuItem>
                <MenuItem value={"urgente"}>Urgente</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={localeMap[locale]}
            >
              <DesktopDatePicker
                label="Data para finalizar"
                value={date}
                minDate={new Date()}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="input-text-tag">Tag</InputLabel>
              <Input
                id="input-text-tag"
                type="text"
                label="Tag"
                value={tag}
                onChange={handleTag}
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="add tag to list"
                      onClick={() => handleAddTag()}
                      id="add-tag-button"
                    >
                      <AddBoxIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          {tagsArray.tags.length !== 0 && (
            <Grid item xs={4}>
              <Paper elevation={6}>
                <Typography variant="h5" component="div">
                  Tags:
                </Typography>
                <Divider />
                <List>
                  {tagsArray.tags.map((item, index) => {
                    return (
                      <ListItem key={item.id}>
                        <ListItemText>
                          {index + 1 + " - " + item.value} <Divider />
                        </ListItemText>
                        <IconButton
                          edge="end"
                          aria-label="delete-tag"
                          onClick={() =>
                            dispatch(TagActions.RemoveTagList(item.id))
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Grid>
          )}
          <Grid item xs={4}>
            <Button variant="outlined" onClick={() => sendTask()}>
              Adicionar Tarefa
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTask;
