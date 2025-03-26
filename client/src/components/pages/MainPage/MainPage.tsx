import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { getEvent } from "../../../redux/slice/event.slice";
import { getGadget } from "../../../redux/slice/gadget.slice";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Box,
  Button,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const events = useSelector((state: RootState) => state.event.event);
  const gadgets = useSelector((state: RootState) => state.gadget.gadget);
  const isLoadingEvents = useSelector((state: RootState) => state.event.isLoading);
  const isLoadingGadgets = useSelector((state: RootState) => state.gadget.isLoading);

  useEffect(() => {
    dispatch(getEvent());
    dispatch(getGadget());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoadingEvents && !isLoadingGadgets) {
      setTimeout(() => setLoaded(true), 300);
    }
  }, [isLoadingEvents, isLoadingGadgets]);

  if (isLoadingEvents || isLoadingGadgets) {
    return (
      <Box 
        className="loading-container"
        sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const lastFourEvents = events.slice(-4);
  const lastFourGadgets = gadgets.slice(-4);

  const getRandomAnimalImage = () => {
    const animalImages = [
      "https://res.cloudinary.com/dlliagivo/image/upload/v1742475564/yepp6p1fzkqaydzodpce.webp",
      "https://res.cloudinary.com/dlliagivo/image/upload/v1742475564/ijzquujqf200q9ehavdo.webp",
      "https://res.cloudinary.com/dlliagivo/image/upload/v1742476902/xqg3r6xxt0lh2iqvbfz0.webp",
      "https://res.cloudinary.com/dlliagivo/image/upload/v1742641971/esqsjyfnwrwcyrhdrtzc.png",
      "https://res.cloudinary.com/dlliagivo/image/upload/v1742642372/ph4dabj592sqwwz2kw9r.png",
    ];
    const randomIndex = Math.floor(Math.random() * animalImages.length);
    return animalImages[randomIndex];
  };

  const handleAllEventsClick = () => navigate("/event");
  const handleAllGadgetsClick = () => navigate("/gadget");
  const handleEventClick = (id: number) => navigate(`/event/${id}`);
  const handleGadgetClick = (id: number) => navigate(`/gadget/${id}`);

  return (
    <Container 
      className="container"
      sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography 
          variant="h4" 
          className="section-title"
          sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
        >
          Мероприятия
        </Typography>
        <Button
          variant="contained"
          onClick={handleAllEventsClick}
          sx={{
            backgroundColor: "#8174A0",
            color: "#CFEBC7",
            fontFamily: "'Shantell Sans', sans-serif",
            "&:hover": {
              backgroundColor: "#441752",
            },
          }}
        >
          Все мероприятия
        </Button>
      </Box>
      <Grid2 container spacing={6}>
        {lastFourEvents.map((event) => (
          <Grid2 key={event.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className={`card-container ${loaded ? "appear" : ""}`}
              sx={{ 
                overflow: "visible",
                fontFamily: "'Shantell Sans', sans-serif",
              }}
              onClick={() => handleEventClick(event.id)}
            >
              <Box
                component="img"
                src={getRandomAnimalImage()}
                alt="Зверушка"
                className="corner-image top-left"
              />
              <Box
                component="img"
                src={getRandomAnimalImage()}
                alt="Зверушка"
                className="corner-image bottom-right"
              />
              <CardMedia
                component="img"
                height="140"
                image={event.img_url}
                alt={event.name}
              />
              <CardContent>
                <Typography 
                  gutterBottom 
                  variant="h5"
                  sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
                >
                  {event.name}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
                >
                  Дата: {event.date}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
                >
                  Место: {event.location}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
                >
                  Цена: {event.price} руб.
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography 
          variant="h4" 
          className="section-title"
          sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
        >
          Гаджеты
        </Typography>
        <Button
          variant="contained"
          onClick={handleAllGadgetsClick}
          sx={{
            backgroundColor: "#8174A0",
            color: "#CFEBC7",
            fontFamily: "'Shantell Sans', sans-serif",
            "&:hover": {
              backgroundColor: "#441752",
            },
          }}
        >
          Все гаджеты
        </Button>
      </Box>
      <Grid2 container spacing={6}>
        {lastFourGadgets.map((gadget) => (
          <Grid2 key={gadget.id} xs={12} sm={6} md={4} lg={3}>
            <Card
              className={`card-container ${loaded ? "appear" : ""}`}
              sx={{ 
                overflow: "visible",
                fontFamily: "'Shantell Sans', sans-serif",
              }}
              onClick={() => handleGadgetClick(gadget.id)}
            >
              <Box
                component="img"
                src={getRandomAnimalImage()}
                alt="Зверушка"
                className="corner-image top-left"
              />
              <Box
                component="img"
                src={getRandomAnimalImage()}
                alt="Зверушка"
                className="corner-image bottom-right"
              />
              <CardMedia
                component="img"
                height="140"
                image={gadget.image}
                alt={gadget.name}
              />
              <CardContent>
                <Typography 
                  gutterBottom 
                  variant="h5"
                  sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
                >
                  {gadget.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default MainPage;