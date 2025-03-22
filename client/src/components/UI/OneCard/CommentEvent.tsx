// import { Button, CardContent, TextField, Typography } from "@mui/material";
// import $api from "../../../shared/axios.instance";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// interface AuthorComment {
//   id: number;
//   login: string;
// }
// interface CommentType {
//   id: number;
//   user_id: number;
//   event_id: number;
//   text: string;
//   authorComment: AuthorComment;
// }

// function CommentEvent() {
//   const { id } = useParams();
//   const { user } = useSelector((state: RootState) => state.authSlicer);
//   const userId = user?.id;
//   const { register, handleSubmit, reset } = useForm<CommentType>();
//   const [comment, setComment] = useState<CommentType[]>([]);

//   useEffect(() => {
//     $api
//       .get(`event/${id}/comment`, { params: { eventId: id, userId: userId } })
//       .then((response) => {
//         console.log("response get: ", response);
//         setComment(response.data);
//       });
//   }, [id, userId]);

//   const onSubmit: SubmitHandler<CommentType> = (data) => {
//     data.user_id = Number(user?.id);
//     data.event_id = Number(id);
//     data.authorComment.login = user?.login;

//     $api
//       .post(`/event/${id}/comment`, data)
//       .then((response) => {
//         console.log("RES DATA: ", response.data);

//         setComment((prev) => [...prev, response.data]);

//         reset();
//       })
//       .catch((error) => {
//         console.error("Error posting comment:", error);
//       });
//   };

//   const buttonStyles = {
//     backgroundColor: "#441752",
//     color: "#CFEBC7",
//     "&:hover": {
//       backgroundColor: "#8174A0",
//     },
//     margin: "10px 20px",
//     alignSelf: "flex-end",
//   };

//   console.log("comment: ", comment);

//   return (
//     <div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           {...register("text")}
//           label="Комментарии"
//           type="text"
//           variant="outlined"
//           fullWidth
//           required
//           multiline
//           rows={4}
//           sx={{
//             marginTop: 2,
//           }}
//         />
//         <Button type="submit" variant="contained" sx={buttonStyles}>
//           Отправить
//         </Button>
//       </form>

//       {comment.map((com) => (
//         <CardContent key={com.id} sx={{ flexGrow: 1 }}>
//           {com.user_id && (
//             <img
//               src={`https://avatar.iran.liara.run/public`}
//               alt="Аватар"
//               style={{ width: 50, height: 50, borderRadius: "50%" }}
//             />
//           )}

//           <Typography
//             variant="h5"
//             component="div"
//             sx={{ color: "#441752", marginBottom: 2, marginTop: 2 }}
//           >
//             Пользователь:{" "}
//             {com.authorComment?.login || `ID: ${com.authorComment.login}`}
//           </Typography>

//           <Typography
//             variant="body1"
//             component="div"
//             sx={{ color: "#441752", marginBottom: 2, marginTop: 2 }}
//           >
//             {com.text}
//           </Typography>

//           {userId === com.user_id && (
//             <div>
//               <Button
//                 // onClick={handleEditComment}
//                 variant="contained"
//                 sx={buttonStyles}
//               >
//                 Отредактировать
//               </Button>
//               <Button
//                 // onClick={handleDeleteComment}
//                 variant="contained"
//                 sx={buttonStyles}
//               >
//                 Удалить
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       ))}
//     </div>
//   );
// }

// export default CommentEvent;

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
  avatar?: string; // Добавлено поле avatar
}

interface CommentType {
  id: number;
  user_id: number;
  event_id: number;
  text: string;
  authorComment: AuthorComment; // authorComment всегда определен
}

function CommentEvent() {
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.authSlicer);
  const userId = user?.id;
  const { register, handleSubmit, reset } = useForm<CommentType>();
  const [comment, setComment] = useState<CommentType[]>([]);
  const [editComment, setEditComment ] = useState('')


  useEffect(() => {
    $api
      .get(`event/${id}/comment`, { params: { eventId: id, userId: userId } })
      .then((response) => {
        console.log("response get: ", response);
        setComment(response.data);
      });
  }, [id, userId]);


  const onSubmit: SubmitHandler<CommentType> = (data) => {
    data.user_id = Number(user?.id);
    data.event_id = Number(id);
    data.authorComment = {
      id: Number(user?.id),
      login: user?.login || "Колючий Ёжик",
    };

    $api
      .post(`/event/${id}/comment`, data)
      .then((response) => {
        console.log("RES DATA: ", response.data);
        setComment((prev) => [...prev, response.data]);
        reset();
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  const buttonStyles = {
    backgroundColor: "#441752",
    color: "#CFEBC7",
    "&:hover": {
      backgroundColor: "#8174A0",
    },
    margin: "10px 20px",
    alignSelf: "flex-end",
  };

  console.log("comment: ", comment);

  return (
    <div>
      {/* Форма для добавления комментария */}
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
        <Button type="submit" variant="contained" sx={buttonStyles}>
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
            Пользователь: {com.authorComment?.login || "Загаддочная лиса"}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ color: "#441752", marginBottom: 2, marginTop: 2 }}
          >
            {com.text}
          </Typography>

          {userId === com.user_id && (
            <div>
              <Button
                // onClick={handleEditComment}
                variant="contained"
                sx={buttonStyles}
              >
                Отредактировать
              </Button>
              <Button
                // onClick={handleDeleteComment}
                variant="contained"
                sx={buttonStyles}
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

export default CommentEvent;
