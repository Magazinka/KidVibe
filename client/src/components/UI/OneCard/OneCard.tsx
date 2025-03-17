import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import $api from "../../../shared/axios.instance";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function OneCard() {
  const { id } = useParams();
  // console.log("cardId: ", id);
  const navigate = useNavigate();
  const cardId = Number(id);
  const { user } = useSelector((state: RootState) => state.authSlicer);
  const userId = user?.id;
  const [event, setEvent] = useState<{
    id: number;
    name: string;
    description: string;
    location: string;
    date: string;
    price: string;
    img_url: string;
    user_id: number;
  }>({});
  console.log("event create: ", event);
  useEffect(() => {
    $api.get(`event/${id}`).then((response) => {
      setEvent(response.data);
    });
  }, []);
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
  //   console.log("EVENT: ", event.name);
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
          {event.name},{event.user_id}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ color: "#8174A0", marginBottom: 1 }}
        >
          {event.description}
        </Typography>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
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
            {event.user_id}
            Вернуться
          </Button>
        </Link>
        {Number(userId) === event.user_id ? (
          <Button
            onClick={() => {
              deleteHandler(event.id);
            }}
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
            Удалить
          </Button>
        ) : (
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
            Записаться
          </Button>
        )}
      </div>
    </Card>
  );
}

export default OneCard;
