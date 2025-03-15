import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import $api from "../../../shared/axios.instance";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OneCard() {
  const { id } = useParams();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    $api.get(`event/${id}`).then((response) => {
      //   console.log("Response oneCard: ", response.data);
      setEvent(response.data);
    });
  }, []);

  //   console.log("EVENT: ", event.name);
  return (
    <Card
      sx={{
        width: 850,
        height: "auto",
        backgroundColor: "#E3F2FD",
        marginBottom: 2,
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
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
          {event.name}
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
      <div style={{display: "flex"}}>
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
      </div>
    </Card>
  );
}

export default OneCard;
