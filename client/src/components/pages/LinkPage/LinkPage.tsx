import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { getLink } from '../../../redux/slice/link.slice'; // Импортируем Thunk для получения ссылок
import { Typography, CircularProgress, Container, Box, List, ListItem, ListItemText } from '@mui/material';
import './LinkPage.css'; // Стили для страницы ссылок

const LinkPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Получаем данные из Redux store
  const links = useSelector((state: RootState) => state.link.link);
  const isLoadingLinks = useSelector((state: RootState) => state.link.isLoading);
  console.log("LINKS: ", links);

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

      {/* Вертикальный список ссылок */}
      <List className="link-list">
        {links.map((link) => (
          <ListItem
            key={link.id}
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-item"
          >
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default LinkPage;