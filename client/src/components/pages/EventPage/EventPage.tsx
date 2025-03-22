import { useState } from "react";
import AddCard from "../../UI/AddCard/AddCard";
import CardEvent from "../../UI/CardEvent/CardEvent";

function EventPage() {
  const [modalVisible, setModalVisible] = useState(false);

  function toggleModalVisable() {
    setModalVisible(!modalVisible);
  }
  return (
    <>
      <AddCard toggleModalVisable={toggleModalVisable} />
      <CardEvent modalVisable={modalVisible} />
    </>
  );
}

export default EventPage;
