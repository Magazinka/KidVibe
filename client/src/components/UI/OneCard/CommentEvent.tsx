import { Button, CardContent, TextField, Typography } from "@mui/material";
import $api from "../../../shared/axios.instance";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface AuthorComment {
  id: number;
  login: string;
}

interface CommentType {
  id: number;
  user_id: number;
  event_id: number;
  text: string;
  createdAt: string;
  authorComment: AuthorComment;
}

function CommentEvent() {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.authSlicer);
  const userId = user?.id;
  const login = user?.login;
  const { register, handleSubmit, reset } = useForm<CommentType>();
  const [comment, setComment] = useState<CommentType[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  useEffect(() => {
    $api
      .get(`event/${id}/comment`, { params: { eventId: id, userId: userId } })
      .then((response) => {
        console.log("response get: ", response.data);
        setComment(response.data);
      });
  }, [id, userId]);

  const onSubmit: SubmitHandler<CommentType> = (data) => {
    data.user_id = Number(user?.id);
    data.event_id = Number(id);
    data.authorComment = {
      id: Number(user?.id),
      login: login || "Беспокойный Ёжик",
    };

    $api
      .post(`/event/${id}/comment`, data)
      .then((response) => {
        console.log("RES DATA: ", response.data);
        response.data.authorComment = { login: login };
        response.data.authorComment = { id: id };
        console.log("RES DATA 2: ", response.data);
        setComment(response.data);
        reset();
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  function deleteHandler(id: number, user_id: number) {
    $api
      .delete(`/event/${id}/comment`, { data: { id: id, user_id } })
      .then((response) => {
        console.log("Delete: ", response.data);
        setComment((prev) => prev.filter((comment) => comment.id !== id));
      });
  }

  function startEditing(comment: CommentType) {
    setEditingCommentId(comment.id);
    setEditedText(comment.text);
  }

  function saveEdit(commentId: number) {
    $api
      .put(`/event/${id}/comment`, {
        id: commentId,
        text: editedText,
      })
      .then((response) => {
        console.log("response put: ", response);
        setComment((prev) =>
          prev.map((com) =>
            com.id === commentId ? { ...com, text: editedText } : com
          )
        );
        setEditingCommentId(null);
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  }

  const formatDate = (dateString: string | null) => {
    const date = dateString ? new Date(dateString) : new Date();

    const formattedDate = date.toLocaleDateString("ru-RU"); 
    const formattedTime = date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    }); 

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("text")}
          label="Комментарии"
          type="text"
          variant="outlined"
          fullWidth
          required
          multiline
          rows={4}
          sx={{
            marginTop: 2,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#441752",
            color: "#CFEBC7",
            "&:hover": {
              backgroundColor: "#8174A0",
            },
            margin: "10px 20px",
            alignSelf: "flex-end",
          }}
        >
          Отправить
        </Button>
      </form>

      {comment && comment.length > 0 ? (
        comment.map((com) => (
          <CardContent key={com.id} sx={{ flexGrow: 1 }}>
            <img
              src={`https://avatar.iran.liara.run/public`}
              alt="Аватар"
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "#441752", marginBottom: 2, marginTop: 2 }}
            >
              Пользователь: {com.authorComment?.login || "Загадочная лиса"}
            </Typography>

      
            {editingCommentId === com.id ? (
              <div>
                <TextField
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{
                    marginBottom: 2,
                    width: "100%",
                  }}
                />
                <Button
                  onClick={() => saveEdit(com.id)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#441752",
                    color: "#CFEBC7",
                    "&:hover": {
                      backgroundColor: "#8174A0",
                    },
                    marginRight: 2,
                  }}
                >
                  Сохранить
                </Button>
                <Button
                  onClick={() => setEditingCommentId(null)}
                  variant="outlined"
                  sx={{
                    color: "#441752",
                  }}
                >
                  Отменить
                </Button>
              </div>
            ) : (
              <>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ color: "#441752", marginBottom: 2, marginTop: 2 }}
                >
                  {com.text}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{
                    color: "#441752",
                    marginBottom: 2,
                    marginTop: 2,
                    fontSize: 10,
                  }}
                >
                  {formatDate(com.createdAt)
                    ? formatDate(com.createdAt)
                    : "только что"}
                </Typography>
              </>
            )}

            {Number(userId) === com.authorComment.id && (
              <div>
                <Button
                  onClick={() => deleteHandler(com.id, com.authorComment.id)}
                  sx={{
                    backgroundColor: "#441752",
                    color: "#CFEBC7",
                    "&:hover": {
                      backgroundColor: "#8174A0",
                    },
                    margin: "10px 20px",
                    alignSelf: "flex-end",
                  }}
                  variant="contained"
                >
                  Удалить
                </Button>
                <Button
                  onClick={() => startEditing(com)}
                  sx={{
                    backgroundColor: "#441752",
                    color: "#CFEBC7",
                    "&:hover": {
                      backgroundColor: "#8174A0",
                    },
                    margin: "10px 20px",
                    alignSelf: "flex-end",
                  }}
                  variant="contained"
                >
                  Редактировать
                </Button>
              </div>
            )}
          </CardContent>
        ))
      ) : (
        <Typography variant="body2" sx={{ color: "#441752", marginTop: 2 }}>
          Нет комментариев
        </Typography>
      )}
    </div>
  );
}

export default CommentEvent;
