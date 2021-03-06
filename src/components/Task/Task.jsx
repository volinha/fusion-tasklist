import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DialogActionsRedux from "../store/actions/dialog.action";

import { Chip, Grid, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";

import styled from "styled-components";

const CardStyle = {
  backgroundColor: 'var(--grey)',
}

const CardButtons = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  margin: 4px -4px !important;

  font-family: "Roboto", Helvetica !important;
`;

export default function Task({ task, done }) {
  const dispatch = useDispatch();

  const colorSelector = (priority) => {
    if (priority === "urgente") return "#f44336";
    if (priority === "importante") return "#ff9800";
    if (priority === "normal") return "#4caf50";
  };

  return (
    <Box style={{ marginTop: "8px" }}>
      <Card sx={CardStyle} variant="outlined">
        <Grid container columns={12}>
          <Grid item xs={8}>
            <CardContent>
              <Typography variant="h5" component="div">
                {task.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <Button
                  variant="outlined"
                  disabled={task.status === "done"}
                  onClick={() => dispatch(DialogActionsRedux.OpenDialog(task.id,task.title,'priority-edit'))}
                  sx={{
                    color: `${colorSelector(task.priority) + "99"}`,
                    borderColor: `${colorSelector(task.priority) + "99"}`,
                    height: "1.5em",
                    minWidth: "1.5em",
                    textTransform: "lowercase",
                    "&:hover": {
                      color: `${colorSelector(task.priority)}`,
                      borderColor: `${colorSelector(task.priority)}`,
                    },
                  }}
                >
                  {task.priority}
                </Button>
                {done
                  ? ""
                  : " - at?? " +
                    new Date(task.date).toLocaleString().slice(0, 10)}
              </Typography>
              {task.tags.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    label={item.value}
                    onClick={() => 
                      dispatch(
                        DialogActionsRedux.OpenDialogTag(
                          item.id,
                          item.value,
                          task.id,
                          "tag-edit"
                        )
                      )
                    }
                    icon={<ArrowRightIcon fontSize="small" />}
                    style={{ marginTop: "2px" }}
                    disabled={task.status === "done"}
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
                            "comment-view"
                          )
                        )
                      }
                    />
                  ) : (
                    <Tooltip
                      arrow
                      title={
                        task.edit
                          ? "??ltima edi????o: " +
                            new Date(task.edit).toLocaleString()
                          : "N??o possui hist??rico de edi????o."
                      }
                    >
                      <Link to={`/edit_task/${task.id}`}>
                        <EditIcon />
                      </Link>
                    </Tooltip>
                  )}
                </Button>
              </Grid>
              <Grid item>
                {done ? (
                  <>
                    <CardButtons color="info" sx={{ cursor: "default" }}>
                      <CheckIcon />
                      <div>Finalizada</div>
                    </CardButtons>
                    <CardButtons
                      variant="contained"
                      color="error"
                      onClick={() =>
                        dispatch(
                          DialogActionsRedux.OpenDialog(
                            task.id,
                            task.title,
                            "task-delete"
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
                            "task-finish"
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
                            "task-delete"
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
