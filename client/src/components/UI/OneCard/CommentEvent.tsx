import {
  Button,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import $api from "../../../shared/axios.instance";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface CommentType {
  id: number;
  user_id: number;
  event_id: number;
  text: string;
}

function CommentEvent() {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.authSlicer);
  const userId = user?.id;
  const { register, handleSubmit, reset } = useForm<CommentType>();
  const [comment, setComment] = useState<CommentType[]>([]);

  useEffect(() => {
    $api
      .get(`event/${id}/comment`, { params: { eventId: id, userId: userId } })
      .then((response) => {
        console.log("response get: ", response);
        setComment(response.data);
      });
  }, [id, userId, reset]);
  const onSubmit: SubmitHandler<CommentType> = (data) => {
    data.user_id = Number(user?.id);
    data.event_id = Number(id);
    $api
      .post(`/event/${id}/comment`, data)
      .then((response) => {
        console.log("RES DATA: ", response.data);
        // setComment(response.data);
        setComment((prev) => [...prev, response.data]);
        reset();
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  // `https://avatar.iran.liara.run/public
  console.log("comment: ", comment);
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
      {comment.map((com) => {
        return (
          <CardContent key={com.id} sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "#441752", marginBottom: 2, marginTop: 2 }}
            >
              {com.user_id}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "#441752", marginBottom: 2, marginTop: 2 }}
            >
              {com.text}
            </Typography>
          </CardContent>
        );
      })}
    </div>
  );
}

export default CommentEvent;
