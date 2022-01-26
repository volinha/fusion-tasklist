import { Button, Card, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import TagActions from "../../components/store/actions/tags.action";
import FormActions from "../../components/store/actions/forms.action";
import TaskActions from "../../components/store/actions/tasks.action";
import FormsActions from "../../components/store/actions/forms.action";

import styled from "styled-components";

import {
  TagListLoad,
  TaskDate,
  TaskPriority,
  TaskTags,
  TaskTitle,
} from "../../components/Forms/Forms";

const Wrapper = styled.div`
  background-color: var(--primary); 
  display: block;
  height: 90vh;
  box-sizing: border-box;
`


const NewTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const title = useSelector((state) => state.forms.title);
  const priority = useSelector((state) => state.forms.priority);
  const date = useSelector((state) => state.forms.date);
  const tagsArray = useSelector((state) => state.tags);

  const [isEdit, setIsEdit] = useState(id ? true : false);
  const [invalidId, setInvalidId] = useState(false);

  useEffect(() => {
    dispatch(TagActions.ClearTagList());
    setIsEdit(false);

    if (!id) return 0;
    setIsEdit(true);

    var allTasks = JSON.parse(localStorage.getItem("persistantState")).tasks.items;
    const selectedTask = allTasks.filter((item) => {
      return id === item.id;
    });

    if (selectedTask.length !== 1) return setInvalidId(true);

    dispatch(FormActions.UpdateState({ form: "TITLE", value: selectedTask[0].title }));
    dispatch(
      FormActions.UpdateState({ form: "PRIORITY", value: selectedTask[0].priority })
    );
    dispatch(FormActions.UpdateState({ form: "DATE", value: selectedTask[0].date }));

    selectedTask[0].tags.forEach((item) => {
      loadTagList(item.id, item.value);
    });

    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTagList = (id, tag) => {
    dispatch(TagActions.AddTagList(id, tag));
  };

  function sendTask() {
    if (!title || !priority) return alert("Preencha todos os campos!");

    const task = {
      id: isEdit ? id : uuid(),
      title: title,
      status: "open",
      priority: priority,
      createdAt: Date.now(),
      edit: isEdit ? Date.now() : null,
      tags: tagsArray.tags,
      date: date,
    };

    isEdit ? dispatch(TaskActions.EditTask(task)) : dispatch(TaskActions.AddTask(task));

    dispatch(FormsActions.UpdateState({ form: "RESET" }));
    dispatch(TagActions.ClearTagList());
  }

  return (
    <Wrapper>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        columns={12}>
        <Card variant="outlined" sx={{marginTop: '8px', padding: '4px 8px'}}>
          
          <Grid item xs={12}>
          
            <Grid
              container
              columns={12}
              spacing={4}
              direction="column"
              justifyContent="center"
              alignItems="flex-start">
              <Grid item xs={6}>
                <Typography variant="h4">
                  {!isEdit
                    ? "Adicionando nova tarefa: "
                    : invalidId
                    ? "Tarefa não encontrada."
                    : "Editando tarefa '" + title + "':"}
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TaskTitle id={id ? id : ""}/>
              </Grid>
              <Grid item xs={12} sx={{ width: "54%" }}>
                <TaskPriority />
              </Grid>
              <Grid item xs={12}>
                <TaskDate />
              </Grid>
              <Grid item xs={12}>
                <TaskTags />
              </Grid>
              <Grid item xs={12}>
                <TagListLoad />
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" onClick={() => sendTask()}>
                  {isEdit ? "Editar Tarefa" : "Adicionar Tarefa"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Wrapper>
  );
};

export default NewTask;
