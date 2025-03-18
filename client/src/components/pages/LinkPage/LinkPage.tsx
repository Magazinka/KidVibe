import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { getLink } from '../../../redux/slice/link.slice'; // Импортируем Thunk для получения ссылок
import { Card, CardContent, Typography, CircularProgress, Container, Box } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import './LinkPage.css'; // Стили для страницы ссылок

const LinkPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Получаем данные из Redux store
  const links = useSelector((state: RootState) => state.link.link);
  const isLoadingLinks = useSelector((state: RootState) => state.link.isLoading);

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    dispatch(getLink());
  }, [dispatch]);

  // Отображаем загрузку, если данные еще не загружены
  if (isLoadingLinks) {
    return (
      <Box className="loading-container">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container className="container">
      {/* Секция ссылок */}
      <Box mb={2}>
        <Typography variant="h4" className="section-title">
          Ссылки
        </Typography>
      </Box>
      <Grid2 container spacing={3}>
        {links.map((link) => (
          <Grid2 key={link.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="card">
              <CardContent className="card-content">
                <Typography gutterBottom variant="h5" component="div">
                  {link.title}
                </Typography>
                <Typography variant="body2">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url}
                  </a>
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default LinkPage;