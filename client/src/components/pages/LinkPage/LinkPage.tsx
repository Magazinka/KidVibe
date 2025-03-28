import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { getLink } from '../../../redux/slice/link.slice';
import {
  Typography,
  CircularProgress,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from '@mui/material';
import './LinkPage.css';

const LinkPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const links = useSelector((state: RootState) => state.link.link);
  const isLoadingLinks = useSelector((state: RootState) => state.link.isLoading);
  console.log('LINKS: ', links);

  useEffect(() => {
    dispatch(getLink());
  }, [dispatch]);

  if (isLoadingLinks) {
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
      sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
    >
      <Box mb={4}>
        <Typography 
          variant="h4" 
          className="section-title"
          sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
        >
          Полезные ссылки для молодых семей
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {links.map((link) => (
          <Grid item key={link.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              className="link-card"
              sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
            >
              <CardActionArea
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={link.img || 'https://res.cloudinary.com/dlliagivo/image/upload/v1742477841/wvtyoh2ysubjbrpo75kx.png'}
                  alt={link.name}
                  className="link-image"
                />
                <CardContent>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    className="link-name"
                    sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
                  >
                    {link.name}
                  </Typography>
                  {/* <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
                  >
                    {link.description || 'Описание отсутствует'}
                  </Typography> */}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default LinkPage;