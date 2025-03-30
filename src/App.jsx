import React, { useEffect, useState } from "react";
import axios from "./services/axios.customize";
import "antd/dist/reset.css";
import FlashCard from "./components/FlashCard";

const URL_BACKEND = "/api/flashcards";
const App = () => {
  const [flashCards, setFlashCards] = useState([]);

  useEffect(() => {
    axios
      .get(URL_BACKEND) // Sử dụng biến môi trường
      .then((response) => setFlashCards(response.data))
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {flashCards.map((card) => (
        <FlashCard key={card._id} cardData={card} />
      ))}
    </div>
  );
};

export default App;
