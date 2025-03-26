import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";
import $api from "../../../shared/axios.instance";

interface GadgetType {
	id: number;
	name: string;
	price: string;
	image: string;
	user_id: number;
	description: string;
	group: string;
}

interface Signup {
	id: number;
	login: string;
	email: string;
}

function OneGadget() {
	const { id } = useParams();
	const navigate = useNavigate();
	const gadgetId = Number(id);
	const { user } = useSelector((state: RootState) => state.authSlicer);
	const userId = user?.id;
	const [isChange, setIsChange] = useState(false);
	const [signupArr, setSignupArr] = useState<Signup[]>([]);
	const [isUserSignedUp, setIsUserSignedUp] = useState(false);

	const [gadget, setGadget] = useState<GadgetType>({
		id: 0,
		name: "",
		price: "",
		image: "",
		user_id: 0,
		description: "",
		group: "",
	});

	const { register, handleSubmit, reset } = useForm<GadgetType>();

	useEffect(() => {
		$api.get(`gadget/${id}`).then(response => {
			setGadget(response.data);
			reset(response.data);
		});

		$api.get(`/gadget/${id}/signup`, {
			params: { gadgetId: id, userId: userId },
		})
			.then(response => {
				setSignupArr(response.data);
				const isSignedUp = response.data.some((signup: Signup) => signup.id === userId);
				setIsUserSignedUp(isSignedUp);
			})
			.catch(error => {
				console.log("Error fetching signups: ", error);
			});
	}, [id, userId, reset]);

	const onSubmit: SubmitHandler<GadgetType> = data => {
		$api.put(`/gadget/${gadget.id}`, data)
			.then(response => {
				setGadget(response.data);
				setIsChange(false);
			})
			.catch(error => {
				console.error("Error updating gadget:", error);
			});
	};

	function deleteHandler(id: number) {
		try {
			$api.delete("/gadget", { data: { id: id } }).then(response => {
				console.log("Delete: ", response.data);
				navigate("/gadget");
			});
		} catch (error) {
			console.log("error: ", error);
		}
	}

	function changeHandler() {
		setIsChange(!isChange);
	}

	async function signupHandler() {
		try {
			const response = await $api.post(`/gadget/${id}/signup`, {
				user_id: userId,
				gadget_id: gadget.id,
			});
			if (response.data) {
				setIsUserSignedUp(true);
				setSignupArr(response.data);
			}
		} catch (error) {
			console.log("error: ", error);
		}
	}

	async function unsubscribe() {
		try {
			const response = await $api.delete(`/gadget/${id}/signup`, {
				data: {
					user_id: userId,
					gadget_id: gadget.id,
				},
			});

			if (response.data) {
				setIsUserSignedUp(false);
				setSignupArr(prev => prev.filter(user => user.id !== userId));
			}
		} catch (error) {
			console.log("error: ", error);
		}
	}

	return (
		<Card
			sx={{
				maxWidth: 850,
				height: "auto",
				backgroundColor: "#E3F2FD",
				marginBottom: 2,
				display: "flex",
				flexDirection: "column",
				borderRadius: 2,
				justifyContent: "center",
				alignItems: "center",
				minHeight: "60vh",
			}}
		>
			{Number(userId) === gadget.user_id && !isChange && (
				<Button
					onClick={changeHandler}
					variant='contained'
					sx={{
						backgroundColor: "#441752",
						color: "#CFEBC7",
						"&:hover": {
							backgroundColor: "#8174A0",
						},
						margin: "5px 5px",
						alignSelf: "flex-end",
					}}
				>
					Редактировать
				</Button>
			)}
			{Number(userId) === gadget.user_id && !isChange && (
				<Button
					onClick={() => deleteHandler(gadget.id)}
					variant='contained'
					sx={{
						backgroundColor: "#441752",
						color: "#CFEBC7",
						"&:hover": {
							backgroundColor: "#8174A0",
						},
						margin: "5px 5px",
						alignSelf: "flex-end",
					}}
				>
					X
				</Button>
			)}
			{isChange ? (
				<Box
					sx={{
						maxWidth: 400,
						margin: "auto",
						padding: 3,
						display: "flex",
						flexDirection: "column",
						gap: 2,
						boxShadow: 3,
						borderRadius: 2,
						backgroundColor: "#F5F5F5",
					}}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<TextField
							{...register("name")}
							label='Название'
							type='text'
							variant='outlined'
							fullWidth
							required
							sx={{
								marginTop: 2,
							}}
						/>
						<TextField
							{...register("price")}
							label='Цена'
							type='text'
							variant='outlined'
							fullWidth
							required
							sx={{
								marginTop: 2,
							}}
						/>
						<TextField
							{...register("description")}
							label='Описание'
							type='text'
							variant='outlined'
							fullWidth
							sx={{
								marginTop: 2,
							}}
						/>
						<TextField
							{...register("image")}
							label='URL изображения'
							type='text'
							variant='outlined'
							fullWidth
							sx={{
								marginTop: 2,
							}}
						/>
						<TextField
							{...register("group")}
							label='Группа'
							type='text'
							variant='outlined'
							fullWidth
							sx={{
								marginTop: 2,
							}}
						/>
						<Button
							type='submit'
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
							Сохранить изменения
						</Button>
					</form>
				</Box>
			) : (
				<>
					<CardContent sx={{ flexGrow: 1 }}>
						<CardMedia
							component='img'
							className='card-media'
							sx={{
								margin: "0 auto",
								height: 300,
								width: "90%",
								objectFit: "cover",
							}}
							image={gadget.image}
							alt={gadget.name}
						/>
						<Typography variant='h5' component='div' sx={{ color: "#441752", marginBottom: 2, marginTop: 2 }}>
							{gadget.name}
						</Typography>
						<Typography variant='body2' color='text.secondary' sx={{ color: "#8174A0", marginBottom: 1 }}>
							{gadget.description}
						</Typography>
						<div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
							<Typography variant='body2' color='text.secondary' sx={{ color: "#441752" }}>
								Цена: {gadget.price} руб.
							</Typography>
							<Typography variant='body2' color='text.secondary' sx={{ color: "#441752" }}>
								Группа: {gadget.group}
							</Typography>
						</div>
					</CardContent>
				</>
			)}
			<Box>
				<div style={{ display: "flex" }}>
					<Link to={`/gadget`} style={{ textDecoration: "none" }}>
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
							Вернуться
						</Button>
					</Link>

					{isUserSignedUp ? (
						<Button
							onClick={unsubscribe}
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
							Отписаться
						</Button>
					) : (
						<Button
							onClick={signupHandler}
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
							Забронировать
						</Button>
					)}
				</div>
			</Box>
			<Box sx={{ padding: 2 }}>
				<Typography variant='h6' sx={{ color: "#441752", marginBottom: 1 }}>
					Забронировавшие гаджет:
				</Typography>
				{signupArr.length > 0 ? (
					<ul style={{ listStyleType: "none", paddingLeft: 0 }}>
						{signupArr.map((user: { id: number; login: string; email: string }) => (
							<li
								key={user.id}
								style={{
									backgroundColor: "#6A4F7D",
									position: "relative",
									paddingLeft: "20px",
								}}
							>
								<Typography variant='body2' sx={{ color: "#fff" }}>
									<span
										style={{
											position: "absolute",
											left: 0,
											top: "50%",
											transform: "translateY(-50%)",
											fontSize: "1.2em",
										}}
									>
										✨
									</span>
									Login: {user.login}, Email: ({user.email})
								</Typography>
							</li>
						))}
					</ul>
				) : (
					<Typography variant='body2' sx={{ color: "#441752" }}>
						Пока никто не забронировал.
					</Typography>
				)}
			</Box>
		</Card>
	);
}

export default OneGadget;
