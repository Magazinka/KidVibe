import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { getEvent } from "../../../redux/slice/event.slice";
import { getGadget } from "../../../redux/slice/gadget.slice";
import { Card, CardMedia, CardContent, Typography, CircularProgress, Container, Box, Button } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom'; 
import './MainPage.css'; 


const MainPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); 

  // Получаем данные из Redux store
  const events = useSelector((state: RootState) => state.event.event);
  const gadgets = useSelector((state: RootState) => state.gadget.gadget);
  const isLoadingEvents = useSelector((state: RootState) => state.event.isLoading);
  const isLoadingGadgets = useSelector((state: RootState) => state.gadget.isLoading);

  useEffect(() => {
    dispatch(getEvent());
    dispatch(getGadget());
  }, [dispatch]);

  if (isLoadingEvents || isLoadingGadgets) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  const lastFourEvents = events.slice(-4); 
  const lastFourGadgets = gadgets.slice(-4); 

  const handleAllEventsClick = () => {
    navigate('/events'); 
  };

  const handleAllGadgetsClick = () => {
    navigate('/gadgets'); 
  };

  return (
    <Container className="container">
      {/* Тут секция мероприятий */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" className="section-title">
          Мероприятия
        </Typography>
        <Button
          variant="contained"
          onClick={handleAllEventsClick}
          sx={{ backgroundColor: '#8174A0', color: '#CFEBC7', fontFamily: "'Shantell Sans', sans-serif" }}
        >
          Все мероприятия
        </Button>
      </Box>
      <Grid2 container spacing={3}>
        {lastFourEvents.map((event, index) => (
          <Grid2 key={event.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="card">
              
              <img
                src={`../../img/png${(index % 3) + 1}.png`} // Циклически используем png1, png2, png3
                alt="Зверушка"
                className="corner-image top-left"
              />
              
              <img
                src={`../../img/png${((index + 1) % 3) + 1}.png`} // Другое изображение для другого угла
                alt="Зверушка"
                className="corner-image bottom-right"
              />
              <CardMedia
                component="img"
                className="card-media"
                image={event.img_url}
                alt={event.name}
              />
              <CardContent className="card-content">
                <Typography gutterBottom variant="h5" component="div">
                  {event.name}
                </Typography>
                <Typography variant="body2">
                  Дата: {event.date}
                </Typography>
                <Typography variant="body2">
                  Место: {event.location}
                </Typography>
                <Typography variant="body2">
                  Цена: {event.price} руб.
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Тут секция гаджетов */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h4" className="section-title">
          Гаджеты
        </Typography>
        <Button
          variant="contained"
          onClick={handleAllGadgetsClick}
          sx={{ backgroundColor: '#8174A0', color: '#CFEBC7', fontFamily: "'Shantell Sans', sans-serif" }}
        >
          Все гаджеты
        </Button>
      </Box>
      <Grid2 container spacing={3}>
        {lastFourGadgets.map((gadget, index) => (
          <Grid2 key={gadget.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="card">
              
              <img
                src={`../../../img/animals/png${(index % 3) + 1}.png`} // Циклически используем png1, png2, png3
                alt="Зверушка"
                className="corner-image top-left"
              />
              
              <img
                src={`../../../img/animals/png${((index + 1) % 3) + 1}.png`} // Другое изображение для другого угла
                alt="Зверушка"
                className="corner-image bottom-right"
              />
              <CardMedia
                component="img"
                className="card-media"
                image={gadget.img_url}
                alt={gadget.name}
              />
              <CardContent className="card-content">
                <Typography gutterBottom variant="h5" component="div">
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