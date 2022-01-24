import { useDispatch } from "react-redux";
import TaskActions from "../store/actions/tasks";
import DialogActionsRedux from "../store/actions/dialog";

import { Chip, Grid, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import styled from "styled-components";

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";

import OpenDialog from "../Dialog/Dialog";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CardButtons = styled(Button)`
  width: 100%;
  margin: 4px -4px !important;

  font-family: "Roboto", Helvetica !important;
  letter-spacing: 1px !important;
`;

export default function Task({ task, done }) {
  const dispatch = useDispatch();

  const colorSelector = (priority) => {
      if(priority === 'urgente') return '#f44336'
      if(priority === 'importante') return '#ff9800'
      if(priority === 'normal') return '#4caf50'
  } 

  return (
    <Box style={{ marginTop: "8px" }}>
      <OpenDialog type="delete-task" />
      <Card variant="outlined">
        <Grid container columns={12}>
          <Grid item xs={8}>
            <CardContent>
              <Typography variant="h5" component="div">
                {task.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <Button
                variant="outlined"
                disabled={task.status === 'done'}
                sx={{
                  color: `${colorSelector(task.priority) + "99"}`,
                  borderColor: `${colorSelector(task.priority) + "99"}`,
                  height: "1.5em",
                  minWidth: "1.5em",
                  textTransform: "lowercase",
                  '&:hover': {
                    color: `${colorSelector(task.priority)}`,
                    borderColor: `${colorSelector(task.priority)}`,
                  }
                }}
              >
                {task.priority}
              </Button>
                {done
                  ? ""
                  : " - até " +
                    new Date(task.date).toLocaleString().slice(0, 10)}
              </Typography>
              {task.tags.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    label={item.value}
                    onClick={() => console.log("click-tag-" + item.value)}
                    icon={<ArrowRightIcon fontSize="small" />}
                    style={{ marginTop: "2px" }}
                    disabled={task.status === 'done'}
                  />
                );
              })}
            </CardContent>
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              direction="column"
              alignItems="flex-end"
              spacing={6}
            >
              <Grid item>
                <Button>
                  {done ? (
                    <CommentIcon
                      onClick={() =>
                        dispatch(
                          DialogActionsRedux.OpenDialog(
                            task.id,
                            task.title,
                            "viewComment"
                          )
                        )
                      }
                    />
                  ) : (
                    <Link to={`/edit_task/${task.id}`}><EditIcon /></Link>
                  )}
                </Button>
              </Grid>
              <Grid item>
                {done ? (
                  <>
                    <CardButtons color="info" sx={{ cursor: "default" }}>
                      <CheckIcon />
                      Finalizada
                    </CardButtons>
                    <CardButtons
                      variant="contained"
                      color="error"
                      onClick={() =>
                        dispatch(
                          DialogActionsRedux.OpenDialog(
                            task.id,
                            task.title,
                            "task"
                          )
                        )
                      }
                    >
                      <DeleteIcon />
                      Remover
                    </CardButtons>
                  </>
                ) : (
                  <>
                    <CardButtons
                      variant="contained"
                      color="success"
                      onClick={() =>
                        dispatch(
                          DialogActionsRedux.OpenDialog(
                            task.id,
                            task.title,
                            "finishtask"
                          )
                        )
                      }
                    >
                      <CheckIcon />
                      Concluir
                    </CardButtons>
                    <CardButtons
                      variant="contained"
                      color="error"
                      onClick={() =>
                        dispatch(
                          DialogActionsRedux.OpenDialog(
                            task.id,
                            task.title,
                            "task"
                          )
                        )
                      }
                    >
                      <DeleteIcon />
                      Remover
                    </CardButtons>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <CardActions>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {done
              ? "Finalizado em: " + new Date(task.finishedAt).toLocaleString()
              : "Criado em: " + new Date(task.createdAt).toLocaleString()}
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
}
