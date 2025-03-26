import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getEvent } from "../../../redux/slice/event.slice";
import { Link } from "react-router-dom";
import "./CardEvent.css";

function CardEvent() {
  const { event } = useSelector((state: RootState) => state.event);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [overlayVisibility, setOverlayVisibility] = useState<{ [key: number]: boolean }>({});
  const descriptionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const categoryListRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Получаем данные событий
  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  // Инициализация категорий и состояния
  useEffect(() => {
    if (event) {
      const uniqueCategories = [...new Set(event.map((e) => e.group))];
      setCategories(["all", ...uniqueCategories.sort()]);

      const initialVisibility = event.reduce((acc, e) => {
        acc[e.id] = true;
        return acc;
      }, {} as { [key: number]: boolean });
      setOverlayVisibility(initialVisibility);

      setTimeout(() => {
        event.forEach(e => {
          if (descriptionRefs.current[e.id]) {
            checkScroll(e.id);
          }
        });
      }, 100);
    }
  }, [event]);

  // Фиксируем размер контейнера при первой загрузке
  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          entry.target.style.minWidth = `${width}px`;
          entry.target.style.minHeight = `${height}px`;
        }
      });
      
      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const checkScroll = (id: number) => {
    const element = descriptionRefs.current[id];
    if (!element) return;

    const hasScroll = element.scrollHeight > element.clientHeight;
    const isAtBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

    setOverlayVisibility(prev => ({
      ...prev,
      [id]: hasScroll && !isAtBottom
    }));
  };

  const handleScroll = (id: number) => (e: React.UIEvent<HTMLDivElement>) => {
    checkScroll(id);
  };

  const filteredEvents = selectedCategory === "all" 
    ? event 
    : event?.filter((e) => e.group === selectedCategory);

  return (
    <Box 
      ref={containerRef}
      sx={{ 
        display: "flex", 
        height: "100vh",
        overflow: "hidden",
        position: "relative", 
        fontFamily: "'Shantell Sans', sans-serif"
      }}
    >
      {/* Список категорий */}
      <Box 
        ref={categoryListRef}
        sx={{
          fontFamily: "'Shantell Sans', sans-serif",
          width: "250px",
          flexShrink: 0,
          borderRight: "1px solid rgba(0,0,0,0.12)",
          overflowY: "auto",
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#8174A0',
            borderRadius: '3px',
          }
        }}
      >
        <List sx={{ py: 0 }}>
          {categories.map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  fontFamily: "'Shantell Sans', sans-serif",
                  width: "100%",
                  transition: "background-color 0.2s",
                  bgcolor: selectedCategory === category ? "#441752" : "inherit",
                  color: selectedCategory === category ? "#CFEBC7" : "inherit",
                  '&:hover': {
                    backgroundColor: "rgba(68, 23, 82, 0.1)",
                  }
                }}
              >
                <ListItemText 
                  primary={category}  
                  primaryTypographyProps={{ fontFamily: "'Shantell Sans', sans-serif" }}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: "0.9rem",
                      fontWeight: selectedCategory === category ? "600" : "400",
                    }
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Контейнер карточек */}
      <Box 
        sx={{
          fontFamily: "'Shantell Sans', sans-serif"
          flexGrow: 1,
          overflowY: "auto",
          p: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "20px",
          alignContent: "flex-start",
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#8174A0',
            borderRadius: '3px',
          }
        }}
      >
        {filteredEvents?.map((e) => (
          <Card 
            key={e.id}
            sx={{
              fontFamily: "'Shantell Sans', sans-serif",
              width: "100%",
              height: "610px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#E3F2FD",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
              }}
              image={e.img_url}
              alt={e.name}
            />
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" sx={{ fontSize: "1.25rem", color: "#441752", mb: 1 }}
              sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
                {e.name}
              </Typography>
              <Typography sx={{ fontSize: "1rem", color: "#441752", mb: 1 ,
                 fontFamily: "'Shantell Sans', sans-serif" 
              }}>
                Цена: {e.price} руб.
              </Typography>
              <Typography sx={{ fontSize: "1rem", color: "#441752", mb: 1 , fontFamily: "'Shantell Sans', sans-serif" }}>
                Дата: {e.date}
              </Typography>
              <Box sx={{ position: "relative", flexGrow: 1 }}>
                <Typography
                  ref={(el) => (descriptionRefs.current[e.id] = el)}
                  onScroll={handleScroll(e.id)}
                  sx={{
                    fontFamily: "'Shantell Sans', sans-serif" ,
                    fontSize: "1rem",
                    color: "#441752",
                    height: "100%",
                    overflowY: "auto",
                    pr: "5px",
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#8174A0',
                      borderRadius: '2px',
                    }
                  }}
                >
                  {e.description}
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50px",
                    background: "linear-gradient(to bottom, rgba(227, 242, 253, 0), rgba(227, 242, 253, 0.8) 20%, rgba(227, 242, 253, 1))",
                    display: overlayVisibility[e.id] ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    pb: "5px",
                  }}
                >
                  <Box sx={{ color: "#441752", fontSize: "20px" }}>▼</Box>
                </Box>
              </Box>
            </CardContent>
            <Box sx={{ p: 2 }}>
              <Link to={`/event/${e.id}`} style={{ textDecoration: "none" }}>
                <Button 
                  sx={{
                    fontFamily: "'Shantell Sans', sans-serif",
                    backgroundColor: "#441752",
                    color: "#CFEBC7",
                    '&:hover': {
                      backgroundColor: "#8174A0",
                    }
                  }}
                >
                  Подробнее
                </Button>
              </Link>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CardEvent;