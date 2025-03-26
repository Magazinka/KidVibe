import { Button, CardContent, TextField, Typography } from "@mui/material";
import $api from "../../../shared/axios.instance";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface AuthorCommentGadget {
  id: number;
  login: string;
}

interface CommentType {
  id: number;
  user_id: number;
  gadget_id: number;
  text: string;
  authorCommentGadget: AuthorCommentGadget;
}

function CommentGadget() {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.authSlicer);
  const userId = user?.id;
  const login = user?.login;
  const { register, handleSubmit, reset } = useForm<CommentType>();
  const [comment, setComment] = useState<CommentType[]>([]);

  useEffect(() => {
    $api
      .get(`gadget/${id}/comment`, { params: { gadgetId: id, userId: userId } })
      .then((response) => {
        console.log("response get: ", response.data);
        setComment(response.data);
      });
  }, [id, userId]);

  const onSubmit: SubmitHandler<CommentType> = (data) => {
    data.user_id = Number(user?.id);
    data.gadget_id = Number(id);
    data.authorCommentGadget = {
      id: Number(user?.id),
      login: login || "Беспокойный Ёжик",
    };

    $api
      .post(`/gadget/${id}/comment`, data)
      .then((response) => {
        console.log("RES DATA: ", response.data);
        response.data.authorCommentGadget = { login: login };
        response.data.authorCommentGadget = { id: id };
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
      .delete(`/gadget/${id}/comment`, { data: { id: id, user_id } })
      .then((response) => {
        console.log("Delete: ", response.data);
        setComment((prev) => prev.filter((comment) => comment.id !== id));
      });
  }

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
      {comment.map((com) => (
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
            Пользователь: {com.authorCommentGadget?.login || "Загадочная лиса"}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ color: "#441752", marginBottom: 2, marginTop: 2 }}
          >
            {com.text}
          </Typography>

          {Number(userId) == com.authorCommentGadget.id && (
            <div>
              <Button
                onClick={() => deleteHandler(com.id, com.authorCommentGadget.id)}
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
            </div>
          )}
        </CardContent>
      ))}
    </div>
  );
}

export default CommentGadget;