import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useDispatch, useSelector } from "react-redux";
import DialogActionsRedux from "../store/actions/dialog";
import TaskActions from "../store/actions/tasks";
import TagActions from "../store/actions/tags";
import { TextField } from "@mui/material";

export default function OpenDialog() {
  const dialogData = useSelector((state) => state.dialog.value[0]);
  const taskData = useSelector((state) => state.tasks.items);

  const taskComment = taskData.filter((item) => {
    return item.id.includes(dialogData.id);
  });

  const dispatch = useDispatch();

  const [comments, setComments] = useState("");
  const [tagText, setTagText] = useState("");

  const handleDelete = (type) => {
    if (type === "task-delete") dispatch(TaskActions.RemoveTask(dialogData.id));
    else dispatch(TagActions.RemoveTag(dialogData.id));

    return dispatch(DialogActionsRedux.CloseDialog());
  };

  const handleFinish = () => {
    dispatch(TaskActions.FinishTask(dialogData.id, comments));
    return dispatch(DialogActionsRedux.CloseDialog());
  };

  const handleComments = (e) => {
    setComments(e.target.value);
  };

  const handleTagsText = (e) => {
    setTagText(e.target.value);
  };

  const handleEditTag = (taskId, tagId, text) => {
    dispatch(TaskActions.EditTag(taskId, tagId, text));
    setTagText("");
    return dispatch(DialogActionsRedux.CloseDialog());
  }

  return (
    <div>
      {dialogData.open && (
        <>
          <Dialog
            open={dialogData.open}
            onClose={() => {
              dispatch(DialogActionsRedux.CloseDialog());
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {(dialogData.module === "tag-delete" || dialogData.module === "task-delete") && (
              <>
                <DialogTitle id="alert-dialog-title">
                  {"Deseja remover '" + dialogData.title + "' ?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Confirme para remover a
                    {dialogData.module === "task-delete" ? " tarefa" : " tag"}.<br />
                    Essa ação não pode ser revertida!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => dispatch(DialogActionsRedux.CloseDialog())}
                  >
                    Não
                  </Button>
                  <Button
                    onClick={() => handleDelete(dialogData.module)}
                    autoFocus
                  >
                    Sim
                  </Button>
                </DialogActions>
              </>
            )}

            {dialogData.module === "task-finish" && (
              <>
                <DialogTitle id="alert-dialog-title">
                  {"Concluindo tarefa '" + dialogData.title + "':"}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="comment"
                    label="Comentário"
                    type="text"
                    fullWidth
                    multiline
                    variant="standard"
                    value={comments}
                    onChange={handleComments}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => dispatch(DialogActionsRedux.CloseDialog())}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => handleFinish(dialogData.module)}
                    autoFocus
                  >
                    Finalizar
                  </Button>
                </DialogActions>
              </>
            )}

            {dialogData.module === "tag-edit" && (
              <>
                <DialogTitle id="alert-dialog-title">
                  {"Editando tag '" + dialogData.title + "':"}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="comment"
                    label="Nova descrição"
                    type="text"
                    fullWidth
                    multiline
                    variant="standard"
                    value={tagText}
                    onChange={handleTagsText}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => dispatch(DialogActionsRedux.CloseDialog())}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => handleEditTag(dialogData.taskid, dialogData.id, tagText)}
                    autoFocus
                  >
                    Finalizar
                  </Button>
                </DialogActions>
              </>
            )}

            {dialogData.module === "comment-view" && (
              <>
                <DialogTitle id="alert-dialog-view-comment">
                  {"Comentário da tarefa '" + dialogData.title + "':"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {taskComment[0].comments !== "" ? taskComment[0].comments : "Não há comentários."}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => dispatch(DialogActionsRedux.CloseDialog())}
                  >
                    Voltar
                  </Button>
                </DialogActions>
              </>
            )}
          </Dialog>
        </>
      )}
    </div>
  );
}
