import { Backdrop, Box, Button, Card, Fade, Modal, TextField, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent/CardContent";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCreateGadgetMutation } from "../../../redux/slice/gadget.api.slice";
import { RootState } from "../../../redux/store";

interface Props {
	toggleModalVisible: () => void;
}

interface FormData {
	id?: number;
	name: string;
	user_id: number;
	price: string;
	image?: File; // Измените тип на File
	group: string;
	description: string;
}

function AddGadget({ toggleModalVisible }: Props) {
	const [isVisible, setIsVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>();

	const user_id = useSelector((state: RootState) => state.authSlicer.user?.id);
	const [createGadget, { isLoading, isError, error }] = useCreateGadgetMutation();

	const onSubmit = async (data: FormData) => {
		try {
			let imageUrl = null;

			// Проверяем, есть ли файл изображения
			if (data.image instanceof File) {
				const formData = new FormData();
				formData.append("file", data.image);
				formData.append("upload_preset", "upload_gadgets"); // Замените на ваш upload preset

				const controller = new AbortController();
  				// Устанавливаем таймаут 30 секунд (30000 мс)
				const timeoutId = setTimeout(() => controller.abort(), 30000);
				
				const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/dlliagivo/image/upload`, {
					method: "POST",
					body: formData,
					signal: controller.signal
				});

				if (!cloudinaryResponse.ok) {
					throw new Error("Image upload failed");
				}

				const result = await cloudinaryResponse.json();
				imageUrl = result.secure_url;
				console.log(result);
				
			}
			// Отправляем данные на сервер
			const gadgetData = {
				name: data.name,
				price: data.price.toString(), // Явное преобразование в строку
				user_id: user_id,
				image: imageUrl || "", // На случай если изображение не загружено
				group: data.group,
				description: data.description,
			};

			console.log("Sending to server:", gadgetData);
			const response = await createGadget(gadgetData).unwrap();

			console.log("Gadget created successfully:", response);
			setIsVisible(false);
			toggleModalVisible();
			setPreviewImage(null);
		} catch (err) {
			console.error("Error creating gadget:", err);
			// Здесь можно добавить уведомление для пользователя
		}
	};

	const toggleVisibility = () => {
		setIsVisible(prev => !prev);
		toggleModalVisible();
	};

	return (
		<div>
			<Button
				variant='contained'
				sx={{
					backgroundColor: "#441752",
					color: "#CFEBC7",
					"&:hover": {
						backgroundColor: "#8174A0",
					},
				}}
				onClick={toggleVisibility}
			>
				Добавить новый гаджет
			</Button>
			<Modal
				open={isVisible}
				onClose={toggleVisibility}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
					invisible: true,
				}}
			>
				<Fade in={isVisible}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							height: "100vh",
						}}
					>
						<Card
							sx={{
								width: 400,
								padding: 2,
								backgroundColor: "#E3F2FD",
								display: "flex",
								flexDirection: "column",
								borderRadius: 2,
							}}
						>
							<Typography variant='h5' sx={{ color: "#441752", marginBottom: 2 }}>
								Добавить новый гаджет
							</Typography>
							<CardContent sx={{ flexGrow: 1 }}>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Box sx={{ marginBottom: 2 }}>
										<TextField
											fullWidth
											label='Наименование'
											variant='outlined'
											placeholder='Введите название'
											{...register("name", {
												required: "Наименование обязательно",
											})}
											error={!!errors.name}
										/>
									</Box>

									<Box sx={{ marginBottom: 2 }}>
										<TextField
											fullWidth
											label='Цена'
											variant='outlined'
											type='number'
											placeholder='Введите цену'
											{...register("price", {
												required: "Цена обязательна",
												valueAsNumber: true,
											})}
											error={!!errors.price}
										/>
									</Box>
									<Box sx={{ marginBottom: 2 }}>
										<TextField
											fullWidth
											label='Категория'
											variant='outlined'
											placeholder='Введите категорию'
											{...register("group", {
												required: "Категория обязательна",
											})}
											error={!!errors.group}
										/>
									</Box>
									<Box sx={{ marginBottom: 2 }}>
										<TextField
											fullWidth
											label='Описание'
											variant='outlined'
											placeholder='Введите описание'
											{...register("description", {
												required: "Описание обязательно",
											})}
											error={!!errors.description}
										/>
									</Box>
									<Button sx={{ marginBottom: 2 }}>
										<input
											type='file'
											accept='image/*'
											onChange={e => {
												if (e.target.files && e.target.files[0]) {
													setValue("image", e.target.files[0]);
													setPreviewImage(URL.createObjectURL(e.target.files[0]));
												}
											}}
										/>
										{errors.image && <Typography color='error'>Изображение обязательно</Typography>}
									</Button>

									{previewImage && (
										<img src={previewImage} alt='Preview' style={{ width: "100%", marginBottom: 16, borderRadius: 4 }} />
									)}

									<Button
										fullWidth
										variant='contained'
										sx={{
											backgroundColor: "#441752",
											color: "#CFEBC7",
											"&:hover": {
												backgroundColor: "#8174A0",
											},
											marginTop: 2,
										}}
										type='submit'
										disabled={isLoading}
									>
										{isLoading ? "Загрузка..." : "Добавить гаджет"}
									</Button>
								</form>
							</CardContent>
						</Card>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

export default AddGadget;
