import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

import {
  Divider,
  FormControl,
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
  TextField,
  Typography,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from '@mui/icons-material/Delete';
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ptbrLocale from "date-fns/locale/pt-BR";

import TagActions from "../store/actions/tags.action";
import FormsActions from "../store/actions/forms.action";

const localeMap = {
  ptbr: ptbrLocale,
};

const TaskTitle = (id) => {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.forms.title);

  useEffect(() => {
    dispatch(FormsActions.UpdateState({ form: "RESET" }));
    if (!id) return 0;
    var allTasks = JSON.parse(localStorage.getItem("persistantState")).tasks.items;
    const selectedTask = allTasks.filter((item) => {
      return id === item.id;
    });

    if (selectedTask.length !== 1) return 0;

    dispatch(FormsActions.UpdateState({ form: "TITLE", value: selectedTask[0].title }));
    return 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TextField
      id="titulo-tarefa"
      label="Título"
      variant="standard"
      /* fullWidth */
      onChange={(e) =>
        dispatch(FormsActions.UpdateState({ form: "TITLE", value: e.target.value }))
      }
      value={title}
    />
  );
};

const TaskPriority = () => {
  const dispatch = useDispatch();
  const priority = useSelector((state) => state.forms.priority);

  return (
    <FormControl fullWidth>
      <InputLabel id="id-select-prioridade">Prioridade</InputLabel>
      <Select
        labelId="id-select-prioridade"
        id="select-prioridade"
        value={priority}
        label="Age"
        variant="standard"
        onChange={(e) =>
          dispatch(
            FormsActions.UpdateState({
              form: "PRIORITY",
              value: e.target.value,
            })
          )
        }>
        <MenuItem value={"normal"}>Normal</MenuItem>
        <MenuItem value={"importante"}>Importante</MenuItem>
        <MenuItem value={"urgente"}>Urgente</MenuItem>
      </Select>
    </FormControl>
  );
};

const TaskDate = () => {
  const locale = useState("ptbr");
  const dispatch = useDispatch();
  const date = useSelector((state) => state.forms.date);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap[locale]}>
      <DesktopDatePicker
        label="Data para finalizar"
        value={date}
        minDate={new Date()}
        onChange={(e) => dispatch(FormsActions.UpdateState({ form: "DATE", value: e }))}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

const TaskComment = () => {
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.forms.comment);

  return (
    <TextField
      id="texto-comentario-tarefa"
      label="Comentário"
      variant="standard"
      fullWidth
      onChange={(e) =>
        dispatch(FormsActions.UpdateState({ form: "COMMENT", value: e.target.value }))
      }
      value={comment}
    />
  );
};

const TaskTagEdit = () => {
  const dispatch = useDispatch();
  const tag = useSelector((state) => state.forms.tag);

  return (
    <TextField
      autoFocus
      margin="dense"
      id="comment"
      label="Nova descrição"
      type="text"
      fullWidth
      multiline
      variant="standard"
      value={tag}
      onChange={(e) =>
        dispatch(FormsActions.UpdateState({ form: "TAG", value: e.target.value }))
      }
    />
  );
};

const TaskTags = () => {
  const dispatch = useDispatch();
  const tag = useSelector((state) => state.forms.tag);

  function handleAddTag() {
    if (!tag) return alert("Não é possível enviar uma tag vazia!");
    dispatch(TagActions.AddTagList(uuid(), tag));
    dispatch(FormsActions.UpdateState({ form: "TAG_CLEAR" }));
    document.getElementById("input-text-tag").focus();
  }

  return (
    <FormControl sx={{ width: "100%" }} variant="standard">
      <InputLabel htmlFor="input-text-tag">Tag</InputLabel>
      <Input
        id="input-text-tag"
        type="text"
        label="Tag"
        value={tag}
        onChange={(e) =>
          dispatch(FormsActions.UpdateState({ form: "TAG", value: e.target.value }))
        }
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="add tag to list"
              onClick={() => handleAddTag()}
              id="add-tag-button">
              <AddBoxIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

const TagListLoad = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TagActions.ClearTagList());

    if (!id) return 0;

    var allTasks = JSON.parse(localStorage.getItem("persistantState")).tasks
      .items;
    const selectedTask = allTasks.filter((item) => {
      return id === item.id;
    });

    if (selectedTask.length !== 1) return 0;

    selectedTask[0].tags.forEach((item) => {
      loadTagList(item.id, item.value);
    });
    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadTagList = (id, tag) => {
      dispatch(TagActions.AddTagList(id, tag));
    }

    const tagsArray = useSelector((state) => state.tags);

  return (
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
                onClick={() => dispatch(TagActions.RemoveTagList(item.id))}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export { TaskPriority, TaskTitle, TaskDate, TaskComment, TaskTagEdit, TaskTags, TagListLoad };
