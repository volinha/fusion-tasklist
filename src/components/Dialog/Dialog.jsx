import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { useDispatch, useSelector } from "react-redux";
import { TaskComment, TaskPriority, TaskTagEdit } from "../Forms/Forms";

import DialogActionsRedux from "../store/actions/dialog.action";
import TaskActions from "../store/actions/tasks.action";
import TagActions from "../store/actions/tags.action";
import FormsActions from "../store/actions/forms.action";

export default function OpenDialog() {
  const dialogData = useSelector((state) => state.dialog.value[0]);
  const taskData = useSelector((state) => state.tasks.items);
  const comment = useSelector((state) => state.forms.comment);
  const tagText = useSelector((state) => state.forms.tag);
  const priority = useSelector((state) => state.forms.priority);

  const taskComment = taskData.filter((item) => {
    return item.id.includes(dialogData.id);
  });

  const dispatch = useDispatch();


  const handleDelete = (type) => {
    if (type === "task-delete") dispatch(TaskActions.RemoveTask(dialogData.id));
    else dispatch(TagActions.RemoveTag(dialogData.id));

    return dispatch(DialogActionsRedux.CloseDialog());
  };

  const handleFinish = () => {
    dispatch(TaskActions.FinishTask(dialogData.id, comment));
    dispatch(DialogActionsRedux.CloseDialog());
    dispatch(FormsActions.UpdateState({ form: "RESET" }));
  };

  const handleEditTag = (taskId, tagId, text) => {
    dispatch(TaskActions.EditTag(taskId, tagId, text));
    dispatch(DialogActionsRedux.CloseDialog());
    dispatch(FormsActions.UpdateState({ form: "RESET" }));
  };

  const handleEditPriority = (taskId, title, priority) => {
    dispatch(TaskActions.EditPriority(taskId, title, priority));
    return dispatch(DialogActionsRedux.CloseDialog());
  };

  const handleCloseDialog = () => {
    dispatch(DialogActionsRedux.CloseDialog());
    dispatch(FormsActions.UpdateState({ form: "RESET" }));
  };

  return (
    <div>
      {dialogData.open && (
        <>
          <Dialog
            open={dialogData.open}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            {(dialogData.module === "tag-delete" ||
              dialogData.module === "task-delete") && (
              <>
                <DialogTitle id="alert-dialog-title">
                  {"Deseja remover '" + dialogData.title + "' ?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Confirme para remover a
                    {dialogData.module === "task-delete" ? " tarefa" : " tag"}.
                    <br />
                    Essa ação não pode ser revertida!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => dispatch(DialogActionsRedux.CloseDialog())}>
                    Não
                  </Button>
                  <Button
                    onClick={() => handleDelete(dialogData.module, comment)}
                    autoFocus>
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
                  <TaskComment />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => dispatch(DialogActionsRedux.CloseDialog())}>
                    Cancelar
                  </Button>
                  <Button onClick={() => handleFinish(dialogData.module)} autoFocus>
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
                  <TaskTagEdit />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => dispatch(DialogActionsRedux.CloseDialog())}>
                    Cancelar
                  </Button>
                  <Button
                    autoFocus
                    onClick={() =>
                      handleEditTag(dialogData.taskid, dialogData.id, tagText)
                    }>
                    Finalizar
                  </Button>
                </DialogActions>
              </>
            )}

            {dialogData.module === "priority-edit" && (
              <>
                <DialogTitle id="alert-dialog-title">
                  {"Editando prioridade da tarefa '" + dialogData.title + "':"}
                </DialogTitle>
                <DialogContent>
                  <TaskPriority />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => dispatch(DialogActionsRedux.CloseDialog())}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={() =>
                      handleEditPriority(dialogData.id, dialogData.title, priority)
                    }
                    autoFocus>
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
                    {taskComment[0].comments !== ""
                      ? taskComment[0].comments
                      : "Não há comentários."}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => dispatch(DialogActionsRedux.CloseDialog())}>
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
