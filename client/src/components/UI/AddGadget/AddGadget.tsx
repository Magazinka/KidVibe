import { Box, Button, Card, TextField, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent/CardContent";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCreateGadgetMutation } from "../../../redux/slice/gadget.api.slice";
import { RootState } from "../../../redux/store";

interface FormData {
	id?: number;
	name: string;
	user_id: number;
	price: number;
	image?: File;
}

function AddGadget() {
	const [isVisible, setIsVisible] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>();
	const user_id = useSelector((state: RootState) => state.authSlicer.user?.id);
	console.log("userId: ", user_id);
	const [createGadget, { isLoading, isError, error }] = useCreateGadgetMutation();

	// const onSubmit = async (data: { id?: number; name: string; price: number; user_id: number }) => {
	// 	try {
	// 		const response = await createGadget({
	// 			...data,
	// 			user_id: user_id, // Обязательно передайте user_id
	// 		}).unwrap();
	// 		console.log("Gadget created successfully:", response);
	// 	} catch (err) {
	// 		console.error("Error creating gadget:", err);
	// 	}
	// };

	const onSubmit = async (data: FormData) => {
		try {
			let imageUrl = null;

			if (data.image) {
				const formData = new FormData();
				formData.append("file", data.image);
				formData.append("upload_preset", "your_upload_preset");

				const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/dlliagivo/image/upload`, {
					method: "POST",
					body: formData,
				}).then(res => res.json());

				imageUrl = cloudinaryResponse.secure_url;
			}

			const response = await createGadget({
				...data,
				user_id: user_id,
				image: imageUrl,
			}).unwrap();

			console.log("Gadget created successfully:", response);
		} catch (err) {
			console.error("Error creating gadget:", err);
		}
	};

	const toggleVisibility = () => {
		setIsVisible(prev => !prev);
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
				{isVisible ? "Закрыть форму" : "Добавить новый гаджет"}
			</Button>
			{isVisible && (
				<Card
					sx={{
						width: 400,
						padding: 2,
						backgroundColor: "#E3F2FD",
						display: "flex",
						flexDirection: "column",
						marginBottom: 2,
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
							</Box>

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
			)}
			<div></div>
		</div>
	);
}

export default AddGadget;
