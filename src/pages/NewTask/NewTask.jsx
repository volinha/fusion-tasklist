import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import TagActions from "../../components/store/actions/tags.action";

import { useParams } from "react-router-dom";
import {
  TagListLoad,
  TaskDate,
  TaskPriority,
  TaskTags,
  TaskTitle,
} from "../../components/Forms/Forms";

import TaskActions from "../../components/store/actions/tasks.action";
import FormsActions from "../../components/store/actions/forms.action";

const NewTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const title = useSelector((state) => state.forms.title);
  const priority = useSelector((state) => state.forms.priority);
  const date = useSelector((state) => state.forms.date);
  const tagsArray = useSelector((state) => state.tags);

  const [isEdit, setIsEdit] = useState(id ? true : false);
  const [invalidId, setInvalidId] = useState(false);

  function sendTask() {
    if (!title || !priority) return alert("Preencha todos os campos!");

    const task = {
      id: uuid(),
      title: title,
      status: "open",
      priority: priority,
      createdAt: Date.now(),
      /* edit: isEdit ? Date.now() : null, */
      tags: tagsArray.tags,
      date: date,
    };

    dispatch(TaskActions.AddTask(task));
    dispatch(FormsActions.UpdateState({ form: "RESET" }));
    dispatch(TagActions.ClearTagList());
  }

  return (
    <Grid container columns={12} direction="row" style={{ margin: "16px" }}>
      <Grid item xs={4}>
        <Typography variant="h4">
          {!isEdit
            ? "Adicionando nova tarefa: "
            : invalidId
            ? "Tarefa não encontrada."
            : "Editando tarefa '" + /* title */ +"':"}
        </Typography>
        <Grid container columns={12} spacing={4} direction="column">
          <Grid item xs={4}>
            <TaskTitle id={id ? id : ""} />
          </Grid>
          <Grid item xs={4}>
            <TaskPriority />
          </Grid>
          <Grid item xs={4}>
            <TaskDate />
          </Grid>
          <Grid item xs={4}>
            <TaskTags />
          </Grid>
            <Grid item xs={4}>
              <TagListLoad />
            </Grid>
          <Grid item xs={4}>
            <Button variant="outlined" onClick={() => sendTask()}>
              {isEdit ? "Editar Tarefa" : "Adicionar Tarefa"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewTask;
