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

  const animalImages = [
    "https://res.cloudinary.com/dlliagivo/image/upload/v1742475564/yepp6p1fzkqaydzodpce.webp",
    "https://res.cloudinary.com/dlliagivo/image/upload/v1742475564/ijzquujqf200q9ehavdo.webp",
    "https://res.cloudinary.com/dlliagivo/image/upload/v1742476902/xqg3r6xxt0lh2iqvbfz0.webp",
    "https://res.cloudinary.com/dlliagivo/image/upload/v1742641971/esqsjyfnwrwcyrhdrtzc.png",
    "https://res.cloudinary.com/dlliagivo/image/upload/v1742642372/ph4dabj592sqwwz2kw9r.png",
  ];

  const getRandomAnimalImage = () => {
    return animalImages[Math.floor(Math.random() * animalImages.length)];
  };

  const getRandomSize = (index: number) => {
    const sizes = [
      { gridRow: "span 1", gridColumn: "span 1", imgHeight: 140, contentHeight: 160, isTall: false },
      { gridRow: "span 1", gridColumn: "span 2", imgHeight: 150, contentHeight: 180, isTall: false },
      { gridRow: "span 2", gridColumn: "span 1", imgHeight: 200, contentHeight: 300, isTall: true },
      { gridRow: "span 1", gridColumn: "span 1", imgHeight: 120, contentHeight: 180, isTall: false },
      { gridRow: "span 2", gridColumn: "span 2", imgHeight: 220, contentHeight: 350, isTall: true },
    ];
    return sizes[index % sizes.length];
  };

  const handleAllEventsClick = () => navigate("/event");
  const handleAllGadgetsClick = () => navigate("/gadget");
  const handleEventClick = (id: number) => navigate(`/event/${id}`);
  const handleGadgetClick = (id: number) => navigate(`/gadget/${id}`);

  const renderPuzzleCard = (item: any, type: "event" | "gadget", onClick: (id: number) => void, index: number) => {
    const size = getRandomSize(index);
    const [animal1, animal2] = [getRandomAnimalImage(), getRandomAnimalImage()];
    
    return (
      <Box
        key={item.id}
        sx={{
          position: "relative",
          overflow: "visible",
          gridRow: size.gridRow,
          gridColumn: size.gridColumn,
          margin: "20px",
          '&:hover .animal-image': { animation: "spin-clockwise 2s linear infinite" },
          '&:hover .animal-image-2': { animation: "spin-counterclockwise 2s linear infinite" },
        }}
      >
        <Box
          component="img"
          src={animal1}
          alt="Зверушка"
          className="animal-image"
          sx={{
            position: "absolute",
            width: 60,
            height: 60,
            top: -15,
            left: -15,
            zIndex: 2,
            transition: "transform 0.8s ease",
          }}
        />
        <Box
          component="img"
          src={animal2}
          alt="Зверушка"
          className="animal-image-2"
          sx={{
            position: "absolute",
            width: 60,
            height: 60,
            bottom: -15,
            right: -15,
            zIndex: 2,
            transition: "transform 0.8s ease",
          }}
        />
        
        <Card
          className={`card-container ${loaded ? "appear" : ""}`}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            overflow: "hidden",
            cursor: "pointer",
            backgroundColor: "#8174a0",
            color: "#cfebc7",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transition: "transform 0.4s ease, background 0.4s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              background: "linear-gradient(135deg, #ffffff, #f9f3d0)",
            },
            fontFamily: "'Shantell Sans', sans-serif",
          }}
          onClick={() => onClick(item.id)}
        >
          <CardMedia
            component="img"
            sx={{
              height: type === "event" ? size.imgHeight * 0.9 : size.imgHeight,
              width: "100%",
              objectFit: "cover",
              flexShrink: 0,
            }}
            image={type === "event" ? item.img_url : item.image}
            alt={item.name}
          />
          <CardContent 
            sx={{ 
              flex: "1 1 auto",
              display: "flex",
              flexDirection: "column",
              p: 2,
              '&:last-child': { pb: 2 },
              overflow: "hidden",
            }}
          >
            <Box sx={{ 
              flex: size.isTall ? "1 1 auto" : "0 0 auto",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflow: "hidden",
            }}>
              <Typography 
                gutterBottom 
                variant="h6" 
                sx={{ 
                  fontSize: "1rem",
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  mb: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontFamily: "'Shantell Sans', sans-serif",
                }}
              >
                {item.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.8rem",
                  lineHeight: 1.4,
                  mb: 1,
                  display: "-webkit-box",
                  WebkitLineClamp: size.isTall ? 8 : 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  flex: size.isTall ? "1 1 auto" : "0 0 auto",
                  color: type === "event" ? "#e0e0e0" : "#cfebc7",
                  fontFamily: "'Shantell Sans', sans-serif",
                }}
              >
                {item.description || "Описание отсутствует"}
              </Typography>
              
              {type === "event" && (
                <Box sx={{ mt: "auto", pt: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: "0.75rem",
                      fontFamily: "'Shantell Sans', sans-serif",
                    }}
                  >
                    {item.date}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: "0.75rem",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontFamily: "'Shantell Sans', sans-serif",
                    }}
                  >
                    {item.location}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: "0.9rem", 
                      fontWeight: "bold", 
                      mt: 1,
                      textAlign: "right",
                      fontFamily: "'Shantell Sans', sans-serif",
                    }}
                  >
                    {item.price} ₽
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };

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

  return (
    <Container 
      className="container" 
      sx={{ 
        maxWidth: "lg", 
        py: 4,
        fontFamily: "'Shantell Sans', sans-serif",
      }}
    >
      <Box sx={{ mb: 6 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gridAutoRows: "minmax(100px, auto)",
            gap: "40px",
          }}
        >
          {events.slice(0, 5).map((event, index) => renderPuzzleCard(event, "event", handleEventClick, index))}
        </Box>
      </Box>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gridAutoRows: "minmax(100px, auto)",
            gap: "40px",
          }}
        >
          {gadgets.slice(0, 5).map((gadget, index) => renderPuzzleCard(gadget, "gadget", handleGadgetClick, index))}
        </Box>
      </Box>
    </Container>
  );
};

export default MainPage;