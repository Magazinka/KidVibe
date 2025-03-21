import React, { useEffect, useState } from "react";
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
  const { event } = useSelector((state: RootState) => state.eventSlicer);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("all"); 
  const [categories, setCategories] = useState<string[]>([]); 

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  
  useEffect(() => {
    if (event) {
      const uniqueCategories = [...new Set(event.map((e) => e.group))];
      setCategories(["all", ...uniqueCategories]); 
    }
  }, [event]);

  
  const filteredEvents = selectedCategory === "all"
    ? event
    : event?.filter((e) => e.group === selectedCategory);

  return (
    <Box sx={{ display: "flex" }}>
      
      <Box className="category-list">
        <List>
          {categories.map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                className={`category-button ${selectedCategory === category ? "selected" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      
      <Box className="event-container">
        {filteredEvents?.map((e) => (
          <Card key={e.id} className="event-card">
            <CardMedia
              component="img"
              className="event-media"
              image={e.name}
              alt="event image"
            />
            <CardContent className="event-content">
              <Typography variant="h5" className="event-title">
                {e.name}
                {e.userId}
              </Typography>
              <Typography variant="body2" className="event-description">
                {e.description}
              </Typography>
              <Typography variant="body2" className="event-date">
                {e.date}
              </Typography>
              <Typography className="event-price">
                Стоимость: {e.price}
              </Typography>
              <Typography className="event-organizer">
                Организатор: {e.user_id}
              </Typography>
            </CardContent>
            <Link to={`/event/${e.id}`} style={{ textDecoration: "none" }}>
              <Button className="more-button">
                More
              </Button>
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CardEvent;