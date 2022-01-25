import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "../../components/Container/Container";
import Task from "../../components/Task/Task";

import TagActions from "../../components/store/actions/tags.action";
import DialogActionsRedux from '../../components/store/actions/dialog.action';

import { useDispatch } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
  background: var(--primary);
`

const Home = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const searchValue = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  const filteredTasks = !!searchValue
    ? tasks.filter((task) => {
        return (
          task.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          task.status.toLowerCase().includes(searchValue.toLowerCase()) ||
          task.priority.toLowerCase().includes(searchValue.toLowerCase()) ||
          task.tags.some((item) => item.value.toLowerCase().includes(searchValue.toLowerCase()))
        );
      })
    : tasks;

  var openTasks = filteredTasks.filter((item) => {
    return item.status === "open";
  });

  var doneTasks = filteredTasks.filter((item) => {
    return item.status === "done";
  });

  useEffect(() => {
    dispatch(TagActions.ClearTagList());
    dispatch(DialogActionsRedux.CloseDialog());
  },[])

  return (
    <div>
      <Grid
        container
        spacing={12}
        columns={12}
        justifyContent="center"
        direction="row"
      >
        <Grid item xs={5}>
          <Container title="Abertas" quantity={openTasks.length}>
            {openTasks
              .slice(0)
              .reverse()
              .map((item) => {
                return <Task key={item.id} task={item} />;
              })}
          </Container>
        </Grid>
        <Grid item xs={5}>
          <Container title="Concluídas" quantity={doneTasks.length}>
            {doneTasks
              .slice(0)
              .reverse()
              .map((item) => {
                return <Task key={item.id} task={item} done />;
              })}
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
