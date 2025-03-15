import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getEvent } from "../../../redux/slice/event.slice";
import { Link } from "react-router-dom";

function CardEvent() {
  const { event } = useSelector((state: RootState) => state.eventSlicer);
  console.log("event test: ", event);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getEvent());
  }, []);
  console.log("events: ", event);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {event?.map((e) => (
        <Card
          key={e.id}
          sx={{
            width: 350,
            height: 400,
            backgroundColor: "#E3F2FD",
            marginBottom: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            height="150"
            image={e.name}
            alt="event image"
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="div" sx={{ color: "#441752" }}>
              {e.name}
              {e.userId}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#8174A0", marginBottom: 1 }}
            >
              {e.description}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#8174A0" }}
            >
              {e.date}
            </Typography>
            <Typography component="div" sx={{ color: "#441752" }}>
              Стоимость: {e.price}
            </Typography>
            <Typography component="div" sx={{ color: "#441752" }}>
              Организатор: {e.user_id}
            </Typography>
          </CardContent>
          <Link to={`/event/${e.id}`} style={{ textDecoration: "none" }}>
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
              More
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default CardEvent;
