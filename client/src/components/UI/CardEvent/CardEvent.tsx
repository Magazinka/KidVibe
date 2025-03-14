import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UseDispatch,useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";

function CardEvent() {
    const {event} = useSelector((state:RootState) => state.eventSlicer)
    console.log('event: ', event);
  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          backgroundColor: "#E3F2FD", // Пастельный голубой
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image="img" // Здесь укажите путь к изображению
          alt="event image"
          sx={{}} // Цвет фона для изображения
        />
        <CardContent>
          <Typography variant="h5" component="div" sx={{ color: "#441752" }}>
            Event
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#8174A0" }}
          >
            {/* {event.description} */}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "#8174A0" }}
          >
            Date event
          </Typography>
        </CardContent>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#441752",
            color: "#CFEBC7",
            "&:hover": {
              backgroundColor: "#8174A0", // Цвет кнопки при наведении
            },
            margin: "20px",
          }}
          startIcon={<MoreVertIcon />}
        >
          More
        </Button>
      </Card>
    </>
  );
}

export default CardEvent;
