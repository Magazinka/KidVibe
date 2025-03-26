import {
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import $api from "../../../shared/axios.instance";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useForm, SubmitHandler } from "react-hook-form";
import CommentEvent from "./CommentEvent";

interface EventType {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  price: string;
  img_url: string;
  user_id: number;
}
interface Signup {
  id: number;
  login: string;
  email: string;
}
function OneCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cardId = Number(id);
  const { user } = useSelector((state: RootState) => state.authSlicer);
  const userId = user?.id;
  const [isChange, setIsChange] = useState(false);
  const [signupArr, setSignupArr] = useState<Signup[]>([]);
  const [isUserSignedUp, setIsUserSignedUp] = useState(false);

  const [event, setEvent] = useState<EventType>({
    id: 0,
    name: "",
    description: "",
    location: "",
    date: "",
    price: "",
    img_url: "",
    user_id: 0,
  });

  const { register, handleSubmit, reset } = useForm<EventType>();

  useEffect(() => {
    $api.get(`event/${id}`).then((response) => {
      setEvent(response.data);
      console.log("response.data one useEffect: ", response.data);
      reset(response.data);
    });

    $api
      .get(`/event/${id}/signup`, {
        params: { eventId: id, userId: userId },
      })
      .then((response) => {
        setSignupArr(response.data);

        const isSignedUp = response.data.some(
          (signup: Signup) => signup.id === userId
        );
        setIsUserSignedUp(isSignedUp);
      })
      .catch((error) => {
        console.log("Error fetching signups: ", error);
      });
  }, [id, userId, reset]);

  const onSubmit: SubmitHandler<EventType> = (data) => {
    $api
      .put(`/event/${event.id}`, data)
      .then((response) => {
        setEvent(response.data);
        setIsChange(false);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  function deleteHandler(id: number) {
    try {
      $api.delete("/event", { data: { id: id } }).then((response) => {
        console.log("Delete: ", response.data);
        navigate("/event");
      });
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function changeHandler() {
    setIsChange(!isChange);
  }

  async function signupHandler() {
    try {
      const response = await $api.post(`/event/${id}/signup`, {
        user_id: userId,
        event_id: event.id,
      });
      console.log(response.data);
      if (response.data) {
        setIsUserSignedUp(true);
        setSignupArr(response.data);
      }
      console.log(signupArr);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  async function unsubscribe() {
    try {
      const response = await $api.delete(`/event/${id}/signup`, {
        data: {
          user_id: userId,
          event_id: event.id,
        },
      });

      if (response.data) {
        setIsUserSignedUp(false);
        setSignupArr((prev) => prev.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 850,
        height: "auto",
        backgroundColor: "#E3F2FD",
        marginBottom: 2,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        fontFamily: "'Shantell Sans', sans-serif",
      }}
    >
      {Number(userId) === event.user_id && !isChange && (
        <Button
          onClick={changeHandler}
          variant="contained"
          sx={{
            backgroundColor: "#441752",
            color: "#CFEBC7",
            fontFamily: "'Shantell Sans', sans-serif",
            "&:hover": {
              backgroundColor: "#8174A0",
            },
            margin: "5px 5px",
            alignSelf: "flex-end",
          }}
        >
          Редактировать
        </Button>
      )}
      {Number(userId) === event.user_id && !isChange && (
        <Button
          onClick={() => deleteHandler(event.id)}
          variant="contained"
          sx={{
            backgroundColor: "#441752",
            color: "#CFEBC7",
            fontFamily: "'Shantell Sans', sans-serif",
            "&:hover": {
              backgroundColor: "#8174A0",
            },
            margin: "5px 5px",
            alignSelf: "flex-end",
          }}
        >
          X
        </Button>
      )}
      {isChange ? (
        <Box
          sx={{
            maxWidth: 400,
            margin: "auto",
            padding: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#F5F5F5",
            fontFamily: "'Shantell Sans', sans-serif",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name")}
              label="Заголовок"
              type="text"
              variant="outlined"
              fullWidth
              required
              sx={{
                marginTop: 2,
                fontFamily: "'Shantell Sans', sans-serif",
              }}
              InputProps={{
                style: { fontFamily: "'Shantell Sans', sans-serif" }
              }}
              InputLabelProps={{
                style: { fontFamily: "'Shantell Sans', sans-serif" }
              }}
            />
            <TextField
              {...register("description")}
              label="Описание"
              type="text"
              variant="outlined"
              fullWidth
              required
              sx={{
                marginTop: 2,
              }}
              InputProps={{
                style: { fontFamily: "'Shantell Sans', sans-serif" }
              }}
              InputLabelProps={{
                style: { fontFamily: "'Shantell Sans', sans-serif" }
              }}
            />
            <TextField
              {...register("location")}
              label="Локация"
              type="text"
              variant="outlined"
              fullWidth
              required
              sx={{
                marginTop: 2,
              }}
              InputProps={{
                style: { fontFamily: "'Shantell Sans', sans-serif" }
              }}
              InputLabelProps={{
                style: { fontFamily: "'Shantell Sans', sans-serif" }
              }}
            />
            <TextField
              {...register("price")}
              label="Стоимость"
              type="text"
              variant="outlined"
              fullWidth
              required
              sx={{
                marginTop: 2,
              }}
              InputProps={{
                style: { fontFamily: "'Shantell Sans', sans-serif" }
              }}
              InputLabelProps={{
                style: { fontFamily: "'Shantell Sans', sans-serif" }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#441752",
                color: "#CFEBC7",
                fontFamily: "'Shantell Sans', sans-serif",
                "&:hover": {
                  backgroundColor: "#8174A0",
                },
                margin: "10px 20px",
                alignSelf: "flex-end",
              }}
            >
              Сохранить изменения
            </Button>
          </form>
        </Box>
      ) : (
        <>
          <CardContent sx={{ flexGrow: 1 }}>
            <CardMedia
              component="img"
              className="card-media"
              sx={{
                margin: "0 auto",
                height: 300,
                width: "90%",
                objectFit: "cover",
              }}
              image={event.img_url}
              alt={event.name}
            />
            <Typography
              variant="h5"
              component="div"
              sx={{ 
                color: "#441752", 
                marginBottom: 2, 
                marginTop: 2,
                fontFamily: "'Shantell Sans', sans-serif",
              }}
            >
              {event.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ 
                color: "#8174A0", 
                marginBottom: 1,
                fontFamily: "'Shantell Sans', sans-serif",
              }}
            >
              {event.description}
            </Typography>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ 
                  color: "#441752",
                  fontFamily: "'Shantell Sans', sans-serif",
                }}
              >
                Где: {event.location}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ 
                  color: "#441752",
                  fontFamily: "'Shantell Sans', sans-serif",
                }}
              >
                Когда: {event.date}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ 
                  color: "#441752",
                  fontFamily: "'Shantell Sans', sans-serif",
                }}
              >
                Сколько: {event.price}
              </Typography>
            </div>
          </CardContent>
        </>
      )}
      <Box>
        <div style={{ display: "flex" }}>
          <Link to={`/event`} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#441752",
                color: "#CFEBC7",
                fontFamily: "'Shantell Sans', sans-serif",
                "&:hover": {
                  backgroundColor: "#8174A0",
                },
                margin: "10px 20px",
                alignSelf: "flex-end",
              }}
            >
              Вернуться
            </Button>
          </Link>

          {isUserSignedUp ? (
            <Button
              onClick={unsubscribe}
              variant="contained"
              sx={{
                backgroundColor: "#441752",
                color: "#CFEBC7",
                fontFamily: "'Shantell Sans', sans-serif",
                "&:hover": {
                  backgroundColor: "#8174A0",
                },
                margin: "10px 20px",
                alignSelf: "flex-end",
              }}
            >
              Отписаться
            </Button>
          ) : (
            <Button
              onClick={signupHandler}
              variant="contained"
              sx={{
                backgroundColor: "#441752",
                color: "#CFEBC7",
                fontFamily: "'Shantell Sans', sans-serif",
                "&:hover": {
                  backgroundColor: "#8174A0",
                },
                margin: "10px 20px",
                alignSelf: "flex-end",
              }}
            >
              Записаться
            </Button>
          )}
        </div>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            color: "#441752", 
            marginBottom: 1,
            fontFamily: "'Shantell Sans', sans-serif",
          }}
        >
          Подписавшиеся на событие:
        </Typography>
        {signupArr.length > 0 ? (
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            {signupArr.map(
              (user: { id: number; login: string; email: string }) => (
                <li
                  key={user.id}
                  style={{
                    backgroundColor: "#6A4F7D",
                    position: "relative",
                    paddingLeft: "20px",
                    fontFamily: "'Shantell Sans', sans-serif",
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: "#fff",
                      fontFamily: "'Shantell Sans', sans-serif",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "1.2em",
                      }}
                    >
                      ✨
                    </span>
                    Login: {user.login}, Email: ({user.email})
                  </Typography>
                </li>
              )
            )}
          </ul>
        ) : (
          <Typography 
            variant="body2" 
            sx={{ 
              color: "#441752",
              fontFamily: "'Shantell Sans', sans-serif",
            }}
          >
            Пока никто не подписался.
          </Typography>
        )}
      </Box>
      <CommentEvent />
    </Card>
  );
}

export default OneCard;