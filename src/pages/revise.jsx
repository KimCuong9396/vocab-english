import React, { useState, useEffect } from "react";

const LEARNED_API_URL = "http://localhost:3007/api/words";

const Revise = () => {
  const [learnedWords, setLearnedWords] = useState([]);

  useEffect(() => {
    fetch(LEARNED_API_URL)
      .then((res) => res.json())
      .then((data) => setLearnedWords(data))
      .catch((err) => console.error("Lỗi tải từ đã học", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Danh sách từ đã học</h1>
      <ul className="grid grid-cols-2 gap-4">
        {learnedWords.map((word) => (
          <li key={word._id} className="border p-4 rounded-lg shadow">
            <img
              src={word.image}
              alt={word.word}
              className="w-16 h-16 mx-auto rounded"
            />
            <h2 className="text-lg font-bold mt-2">{word.word}</h2>
            <p className="text-gray-500">{word.pronunciation}</p>
            <p className="text-green-500">{word.meaning}</p>
            <p className="text-sm mt-2">{word.example}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Revise;
