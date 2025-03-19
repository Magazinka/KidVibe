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

function OneCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cardId = Number(id);
  const { user } = useSelector((state: RootState) => state.authSlicer);
  const userId = user?.id;
  const [isChange, setIsChange] = useState(false);

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
      reset(response.data);
    });
  }, [id, reset]);

  const onSubmit: SubmitHandler<EventType> = (data) => {
    $api
      .put(`/event/${event.id}`, data)
      .then((response) => {
        setEvent(response.data);
        setIsChange(false);
        console.log("Event updated:", response.data);
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

  function signupHandler(){
    try {
      
    } catch (error) {
      console.log('error: ', error);
      
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
      }}
    >
      {Number(userId) === event.user_id && !isChange && (
        <Button
          onClick={changeHandler}
          variant="contained"
          sx={{
            backgroundColor: "#441752",
            color: "#CFEBC7",
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
              Сохранить изменения
            </Button>
          </form>
        </Box>
      ) : (
        <>
          <CardMedia
            component="img"
            height="150"
            image={event.img_url}
            alt="event image"
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "#441752", marginBottom: 1 }}
            >
              {event.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#8174A0", marginBottom: 1 }}
            >
              {event.description}
            </Typography>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ color: "#441752" }}
              >
                Где: {event.location}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ color: "#441752" }}
              >
                Когда: {event.date}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ color: "#441752" }}
              >
                Сколько: {event.price}
              </Typography>
            </div>
          </CardContent>
        </>
      )}

      <div style={{ display: "flex" }}>
        <Link to={`/event`} style={{ textDecoration: "none" }}>
          <Button
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
            Вернуться
          </Button>
        </Link>

        {Number(userId) === event.user_id && !isChange ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#441752",
              color: "#CFEBC7",
              "&:hover": {
                backgroundColor: "#8174A0",
              },
              margin: "10px 20px",
              display: "none",
              alignSelf: "flex-end",
            }}
          ></Button>
        ) : (
          <Button
            onClick={signupHandler}
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
            Записаться
          </Button>
        )}
      </div>
    </Card>
  );
}

export default OneCard;
