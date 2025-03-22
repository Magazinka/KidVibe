import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGadget } from "../../../redux/slice/gadget.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import "./CardGadget.css"; // Импорт CSS-файла

function CardGadget() {
  const { gadget } = useSelector((state: RootState) => state.gadgetSlicer);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getGadget());
  }, [dispatch]);

  useEffect(() => {
    if (gadget) {
      const uniqueCategories = [...new Set(gadget.map((g) => g.group))];
      setCategories(["all", ...uniqueCategories]);
    }
  }, [gadget]);

  const filteredGadgets =
    selectedCategory === "all"
      ? gadget
      : gadget?.filter((g) => g.group === selectedCategory);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Список категорий */}
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

      {/* Карточки гаджетов */}
      <Box className="gadget-container">
        {filteredGadgets?.map((g) => (
          <Card key={g.id} className="gadget-card">
            {g.image && (
              <CardMedia
                component="img"
                className="gadget-media"
                image={g.image}
                alt={g.name}
              />
            )}
            <CardContent className="gadget-content">
              <Typography variant="h5" className="gadget-title">
                {g.name}
              </Typography>
              <Typography className="gadget-price">
              Цена: {g.price} руб.
              </Typography>
              <Typography className="gadget-description">
                {g.description}
              </Typography>
              {/* <Typography className="gadget-owner">
                Владелец: {g.user_id}
              </Typography> */}
            </CardContent>
            <Link to={`/gadget/${g.id}`} style={{ textDecoration: "none" }}>
              <Button className="more-button">More</Button>
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CardGadget;
