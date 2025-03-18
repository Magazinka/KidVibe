import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGadget } from "../../../redux/slice/gadget.slice";
import { AppDispatch, RootState } from "../../../redux/store";

function CardGadget() {
	const { gadget } = useSelector((state: RootState) => state.gadgetSlicer);
	console.log("gadget test: ", gadget);
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(getGadget());
	}, []);
	console.log("gadgets: ", gadget);

	return (
		<div
			style={{
				display: "flex",
				flexWrap: "wrap",
				gap: "10px",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{gadget?.map(g => (
				<Card
					key={g.id}
					sx={{
						width: 350,
						height: 200,
						backgroundColor: "#E3F2FD",
						marginBottom: 2,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<CardContent sx={{ flexGrow: 1 }}>
						<Typography variant='h5' component='div' sx={{ color: "#441752" }}>
							{g.name}
						</Typography>
						<Typography component='div' sx={{ color: "#441752" }}>
							Цена: {g.price} руб.
						</Typography>
						<Typography component='div' sx={{ color: "#441752" }}>
							Владелец: {g.user_id}
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
	);
}

export default CardGadget;
