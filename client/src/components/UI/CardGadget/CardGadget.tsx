import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGadget, getGadgetByCategory } from "../../../redux/slice/gadget.slice";
import { AppDispatch, RootState } from "../../../redux/store";

function CardGadget() {
	const { gadget, isLoading, error } = useSelector((state: RootState) => state.gadgetSlicer);
	const dispatch = useDispatch<AppDispatch>();
	const [category, setCategory] = useState<string>("All");

	const categories = ["All", "Smartphones", "Laptops", "Tablets", "Accessories"]; // Пример категорий

	useEffect(() => {
		if (category === "All") {
			dispatch(getGadget());
		} else {
			dispatch(getGadgetByCategory(category));
		}
	}, [category, dispatch]);

	const handleCategoryChange = (event: SelectChangeEvent) => {
		setCategory(event.target.value);
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<FormControl fullWidth sx={{ marginBottom: 2 }}>
				<InputLabel id='category-filter-label'>Категория</InputLabel>
				<Select labelId='category-filter-label' id='category-filter' value={category} label='Категория' onChange={handleCategoryChange}>
					{categories.map((cat) => (
						<MenuItem key={cat} value={cat}>
							{cat}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "10px",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{gadget?.map((g) => (
					<Card
						key={g.id}
						sx={{
							width: 350,
							height: 400,
							backgroundColor: "#E3F2FD",
							marginBottom: 2,
							display: "flex",
							flexDirection: "column",
						}}
					>
						<CardContent sx={{ flexGrow: 1 }}>
							{g.image && <img src={g.image} alt={g.name} style={{ width: "43%", marginTop: 10, borderRadius: 4 }} />}
							<Typography variant='h5' component='div' sx={{ color: "#441752" }}>
								{g.name}
							</Typography>
							<Typography component='div' sx={{ color: "#441752" }}>
								Цена: {g.price} руб.
							</Typography>
							<Typography component='div' sx={{ color: "#441752" }}>
								Категория: {g.category}
							</Typography>
						</CardContent>
						<Link to={`/gadget/${g.id}`} style={{ textDecoration: "none" }}>
							<Button
								variant='contained'
								sx={{
									backgroundColor: "#441752",
									color: "#CFEBC7",
									"&:hover": {
										backgroundColor: "#8174A0",
									},
									margin: "10px 20px",
									alignSelf: "flex-end",
								}}
							>
								More
							</Button>
						</Link>
					</Card>
				))}
			</div>
		</div>
	);
}

export default CardGadget;