import React, { useEffect, useState } from "react";
import axios from "../services/axios.customize";

const Revise = () => {
  const [words, setWords] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Bạn cần đăng nhập để xem từ vựng đã học!");
      return;
    }

    axios
      .get("/api/progress/update", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWords(res.data))
      .catch((err) => console.error("Lỗi tải danh sách từ vựng", err));
  }, [token]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">📚 Danh sách từ đã học</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index} className="p-2 border rounded">
            {word.word}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Revise;
