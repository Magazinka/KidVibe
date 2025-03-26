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
import { Link } from "react-router-dom";
import { getGadget } from "../../../redux/slice/gadget.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import "./CardGadget.css";
import { useDispatch, useSelector } from "react-redux";

function CardGadget() {
  const { gadget } = useSelector((state: RootState) => state.gadgetSlicer);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [overlayVisibility, setOverlayVisibility] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    dispatch(getGadget());
  }, [dispatch]);

  useEffect(() => {
    if (gadget) {
      const uniqueCategories = [...new Set(gadget.map((g) => g.group))];
      setCategories(["all", ...uniqueCategories]);

      const initialVisibility = gadget.reduce((acc, g) => {
        acc[g.id] = true;
        return acc;
      }, {} as { [key: number]: boolean });
      setOverlayVisibility(initialVisibility);
    }
  }, [gadget]);

  const handleScroll = (id: number) => (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const isAtBottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;

    setOverlayVisibility((prev) => ({
      ...prev,
      [id]: !isAtBottom,
    }));
  };

  const filteredGadgets =
    selectedCategory === "all"
      ? gadget
      : gadget?.filter((g) => g.group === selectedCategory);

  return (
    <Box sx={{ display: "flex", fontFamily: "'Shantell Sans', sans-serif" }}>
      <Box className="category-list" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
        <List>
          {categories.map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                className={`category-button ${selectedCategory === category ? "selected" : ""}`}
                onClick={() => setSelectedCategory(category)}
                sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
              >
                <ListItemText 
                  primary={category}
                  primaryTypographyProps={{ fontFamily: "'Shantell Sans', sans-serif" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box className="gadget-container" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
        {filteredGadgets?.map((g) => (
          <Card 
            style={{ backgroundColor: "rgba(227, 242, 253, 1)" }} 
            key={g.id} 
            className="gadget-card"
            sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
          >
            {g.image && (
              <CardMedia
                component="img"
                className="gadget-media"
                image={g.image}
                alt={g.name}
              />
            )}
            <CardContent style={{ paddingBottom: "0px" }} className="gadget-content">
              <Typography 
                variant="h5" 
                className="gadget-title"
                sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
              >
                {g.name}
              </Typography>
              <Typography 
                className="gadget-price"
                sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
              >
                Цена: {g.price} руб.
              </Typography>
              <Box className="gadget-description-container">
                <Typography
                  className="gadget-description"
                  onScroll={handleScroll(g.id)}
                  sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
                >
                  {g.description}
                </Typography>
                <div
                  className={`gadget-description-overlay ${
                    !overlayVisibility[g.id] ? "hidden" : ""
                  }`}
                >
                  <span className="arrow">▼</span>
                </div>
              </Box>
            </CardContent>
            <Link to={`/gadget/${g.id}`} style={{ textDecoration: "none" }}>
              <Button 
                style={{ paddingTop: "0px" }} 
                className="more-button"
                sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
              >
                Подробнее
              </Button>
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CardGadget;