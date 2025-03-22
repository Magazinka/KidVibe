import { useState } from "react";
import AddGadget from "../../UI/AddGadget/AddGadget";
import CardGadget from "../../UI/CardGadget/CardGadget";

function GadgetPage() {
	const [modalVisible, setModalVisible] = useState(false);

	function toggleModalVisible() {
		setModalVisible(!modalVisible);
	}
	return (
		<>
			<AddGadget toggleModalVisible={toggleModalVisible} />
			<CardGadget />
		</>
	);
}

export default GadgetPage;
