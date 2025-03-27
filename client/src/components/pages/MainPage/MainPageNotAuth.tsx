import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEvent } from "../../../redux/slice/event.slice";
import { getGadget } from "../../../redux/slice/gadget.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import "./MainPage.css";

const MainPageNotAuth: React.FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const [loaded, setLoaded] = useState(false);
	const [showUnderline, setShowUnderline] = useState(false);

	const events = useSelector((state: RootState) => state.event.event);
	const gadgets = useSelector((state: RootState) => state.gadget.gadget);
	const isLoadingEvents = useSelector((state: RootState) => state.event.isLoading);
	const isLoadingGadgets = useSelector((state: RootState) => state.gadget.isLoading);
	const isAuthenticated = useSelector((state: RootState) => state.authSlicer.isAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			dispatch(getEvent());
			dispatch(getGadget());
		}
	}, [dispatch, isAuthenticated]);

	useEffect(() => {
		if (!isLoadingEvents && !isLoadingGadgets) {
			setTimeout(() => {
				setLoaded(true);
				setShowUnderline(true);
			}, 300);
		}
	}, [isLoadingEvents, isLoadingGadgets]);

	const animalImages = [
		"https://res.cloudinary.com/dlliagivo/image/upload/v1742475564/yepp6p1fzkqaydzodpce.webp",
		"https://res.cloudinary.com/dlliagivo/image/upload/v1742475564/ijzquujqf200q9ehavdo.webp",
		"https://res.cloudinary.com/dlliagivo/image/upload/v1742476902/xqg3r6xxt0lh2iqvbfz0.webp",
		"https://res.cloudinary.com/dlliagivo/image/upload/v1742641971/esqsjyfnwrwcyrhdrtzc.png",
		"https://res.cloudinary.com/dlliagivo/image/upload/v1742642372/ph4dabj592sqwwz2kw9r.png",
	];

	const getRandomAnimalImage = () => {
		return animalImages[Math.floor(Math.random() * animalImages.length)];
	};

	const getRandomSize = (index: number) => {
		const sizes = [
			{ gridRow: "span 1", gridColumn: "span 1", imgHeight: 140, contentHeight: 160, isTall: false },
			{ gridRow: "span 1", gridColumn: "span 2", imgHeight: 150, contentHeight: 180, isTall: false },
			{ gridRow: "span 2", gridColumn: "span 1", imgHeight: 200, contentHeight: 300, isTall: true },
			{ gridRow: "span 1", gridColumn: "span 1", imgHeight: 120, contentHeight: 180, isTall: false },
			{ gridRow: "span 2", gridColumn: "span 2", imgHeight: 220, contentHeight: 350, isTall: true },
		];
		return sizes[index % sizes.length];
	};

	const handleAllEventsClick = () => navigate("/event");
	const handleAllGadgetsClick = () => navigate("/gadget");
	const handleEventClick = (id: number) => navigate(`/event/${id}`);
	const handleGadgetClick = (id: number) => navigate(`/gadget/${id}`);
	const handleRegisterClick = () => navigate("/register");
	const handleLoginClick = () => navigate("/login");

	const renderPuzzleCard = (item: any, type: "event" | "gadget", onClick: (id: number) => void, index: number) => {
		const size = getRandomSize(index);
		const [animal1, animal2] = [getRandomAnimalImage(), getRandomAnimalImage()];

		return (
			<Box
				key={item.id}
				sx={{
					position: "relative",
					overflow: "visible",
					gridRow: size.gridRow,
					gridColumn: size.gridColumn,
					margin: "20px",
					"&:hover .animal-image": {
						animation: "spin-clockwise 2s linear infinite",
					},
					"&:hover .animal-image-2": {
						animation: "spin-counterclockwise 2s linear infinite",
					},
				}}
			>
				<Box
					component='img'
					src={animal1}
					alt='Зверушка'
					className='animal-image'
					sx={{
						position: "absolute",
						width: 60,
						height: 60,
						top: -15,
						left: -15,
						zIndex: 2,
						transition: "all 0.8s ease",
						opacity: loaded ? 1 : 0,
						transform: loaded ? "translateY(0)" : "translateY(20px)",
					}}
				/>
				<Box
					component='img'
					src={animal2}
					alt='Зверушка'
					className='animal-image-2'
					sx={{
						position: "absolute",
						width: 60,
						height: 60,
						bottom: -15,
						right: -15,
						zIndex: 2,
						transition: "all 0.8s ease",
						opacity: loaded ? 1 : 0,
						transform: loaded ? "translateY(0)" : "translateY(20px)",
					}}
				/>

				<Card
					className={`card-container ${loaded ? "appear" : ""}`}
					sx={{
						height: "100%",
						display: "flex",
						flexDirection: "column",
						borderRadius: "20px",
						overflow: "hidden",
						cursor: "pointer",
						backgroundColor: "#ffffff",
						color: "#333333",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
						transition: "all 0.4s ease",
						"&:hover": {
							transform: "translateY(-5px)",
							boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
						},
						fontFamily: "'Shantell Sans', sans-serif",
					}}
					onClick={() => onClick(item.id)}
				>
					<CardMedia
						component='img'
						sx={{
							height: type === "event" ? size.imgHeight * 0.9 : size.imgHeight,
							width: "100%",
							objectFit: "cover",
							flexShrink: 0,
						}}
						image={type === "event" ? item.img_url : item.image}
						alt={item.name}
					/>
					<CardContent
						sx={{
							flex: "1 1 auto",
							display: "flex",
							flexDirection: "column",
							p: 2,
							"&:last-child": { pb: 2 },
							overflow: "hidden",
						}}
					>
						<Box
							sx={{
								flex: size.isTall ? "1 1 auto" : "0 0 auto",
								display: "flex",
								flexDirection: "column",
								height: "100%",
								overflow: "hidden",
							}}
						>
							<Typography
								gutterBottom
								variant='h6'
								sx={{
									fontSize: "1rem",
									fontWeight: "bold",
									lineHeight: 1.2,
									mb: 1,
									display: "-webkit-box",
									WebkitLineClamp: 2,
									WebkitBoxOrient: "vertical",
									overflow: "hidden",
									fontFamily: "'Shantell Sans', sans-serif",
									color: "#333333",
								}}
							>
								{item.name}
							</Typography>

							<Typography
								variant='body2'
								sx={{
									fontSize: "0.8rem",
									lineHeight: 1.4,
									mb: 1,
									display: "-webkit-box",
									WebkitLineClamp: size.isTall ? 8 : 3,
									WebkitBoxOrient: "vertical",
									overflow: "hidden",
									flex: size.isTall ? "1 1 auto" : "0 0 auto",
									color: "#555555",
									fontFamily: "'Shantell Sans', sans-serif",
								}}
							>
								{item.description || "Описание отсутствует"}
							</Typography>

							{type === "event" && (
								<Box sx={{ mt: "auto", pt: 1 }}>
									<Typography
										variant='body2'
										sx={{
											fontSize: "0.75rem",
											fontFamily: "'Shantell Sans', sans-serif",
											color: "#555555",
										}}
									>
										{item.date}
									</Typography>
									<Typography
										variant='body2'
										sx={{
											fontSize: "0.75rem",
											display: "-webkit-box",
											WebkitLineClamp: 2,
											WebkitBoxOrient: "vertical",
											overflow: "hidden",
											fontFamily: "'Shantell Sans', sans-serif",
											color: "#555555",
										}}
									>
										{item.location}
									</Typography>
									<Typography
										variant='body2'
										sx={{
											fontSize: "0.9rem",
											fontWeight: "bold",
											mt: 1,
											textAlign: "center",
											fontFamily: "'Shantell Sans', sans-serif",
											color: "#333333",
										}}
									>
										{item.price} ₽
									</Typography>
								</Box>
							)}
						</Box>
					</CardContent>
				</Card>
			</Box>
		);
	};

	if (!isAuthenticated) {
		return (
			<Container
				sx={{
					maxWidth: "lg",
					py: 8,
					fontFamily: "'Shantell Sans', sans-serif",
					textAlign: "center",
				}}
			>
				<Box
					sx={{
						backgroundColor: "#f8f5ff",
						borderRadius: "20px",
						padding: "40px",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
						maxWidth: "800px",
						margin: "0 auto",
					}}
				>
					<Typography
						variant='h3'
						sx={{
							mb: 3,
							color: "#441752",
							fontFamily: "'Shantell Sans', sans-serif",
							fontWeight: "bold",
						}}
					>
						Добро пожаловать в KidVibe!
					</Typography>

					<Typography
						variant='h5'
						sx={{
							mb: 4,
							color: "#555555",
							fontFamily: "'Shantell Sans', sans-serif",
						}}
					>
						Здесь вы найдёте интересные мероприятия, полезные гаджеты и многое другое!
					</Typography>

					<Box
						component='img'
						src='https://res.cloudinary.com/dlliagivo/image/upload/v1742642372/ph4dabj592sqwwz2kw9r.png'
						alt='Приветственная зверушка'
						sx={{
							width: 200,
							height: 200,
							margin: "0 auto 30px",
							animation: "bounce 2s infinite alternate",
							"@keyframes bounce": {
								"0%": { transform: "translateY(0)" },
								"100%": { transform: "translateY(-20px)" },
							},
						}}
					/>

					<Typography
						variant='body1'
						sx={{
							mb: 4,
							fontSize: "1.1rem",
							color: "#555555",
							fontFamily: "'Shantell Sans', sans-serif",
						}}
					>
						Чтобы увидеть все возможности, пожалуйста, зарегистрируйтесь или войдите в систему
					</Typography>
				</Box>
			</Container>
		);
	}

	if (isLoadingEvents || isLoadingGadgets) {
		return (
			<Box className='loading-container' sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Container
			className='container'
			sx={{
				maxWidth: "lg",
				py: 4,
				fontFamily: "'Shantell Sans', sans-serif",
			}}
		>
			<Box sx={{ mb: 6 }}>
				<Box display='flex' justifyContent='space-between' alignItems='center' mb={3}>
					<Box sx={{ position: "relative", display: "inline-block" }}>
						<Typography
							variant='h4'
							sx={{
								fontFamily: "'Shantell Sans', sans-serif",
								position: "relative",
								display: "inline-block",
								paddingBottom: "8px",
								color: "#333333",
								"&::after": {
									content: '""',
									position: "absolute",
									width: showUnderline ? "200%" : "0%",
									height: "3px",
									bottom: "0",
									left: "0",
									backgroundColor: "#8174A0",
									transition: "width 0.5s ease",
									transform: "translateX(-25%)",
								},
							}}
						>
							Мероприятия
						</Typography>
					</Box>
					<Button
						variant='contained'
						onClick={handleAllEventsClick}
						sx={{
							backgroundColor: "#8174A0",
							color: "#ffffff",
							fontFamily: "'Shantell Sans', sans-serif",
							"&:hover": {
								backgroundColor: "#441752",
							},
						}}
					>
						Все мероприятия
					</Button>
				</Box>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
						gridAutoRows: "minmax(100px, auto)",
						gap: "40px",
					}}
				>
					{events.slice(0, 5).map((event, index) => renderPuzzleCard(event, "event", handleEventClick, index))}
				</Box>
			</Box>

			<Box sx={{ mt: 8, mb: 4 }}>
				<Box display='flex' justifyContent='space-between' alignItems='center' mb={3}>
					<Box sx={{ position: "relative", display: "inline-block" }}>
						<Typography
							variant='h4'
							sx={{
								fontFamily: "'Shantell Sans', sans-serif",
								position: "relative",
								display: "inline-block",
								paddingBottom: "8px",
								color: "#333333",
								"&::after": {
									content: '""',
									position: "absolute",
									width: showUnderline ? "200%" : "0%",
									height: "3px",
									bottom: "0",
									left: "0",
									backgroundColor: "#8174A0",
									transition: "width 0.5s ease 0.3s",
									transform: "translateX(-25%)",
								},
							}}
						>
							Гаджеты
						</Typography>
					</Box>
					<Button
						variant='contained'
						onClick={handleAllGadgetsClick}
						sx={{
							backgroundColor: "#8174A0",
							color: "#ffffff",
							fontFamily: "'Shantell Sans', sans-serif",
							"&:hover": {
								backgroundColor: "#441752",
							},
						}}
					>
						Все гаджеты
					</Button>
				</Box>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
						gridAutoRows: "minmax(100px, auto)",
						gap: "40px",
					}}
				>
					{gadgets.slice(0, 5).map((gadget, index) => renderPuzzleCard(gadget, "gadget", handleGadgetClick, index))}
				</Box>
			</Box>
		</Container>
	);
};

export default MainPageNotAuth;
