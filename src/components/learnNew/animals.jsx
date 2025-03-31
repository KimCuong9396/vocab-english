import React, { useState, useEffect } from "react";
import axios from "../../services/axios.customize";
import { Volume2, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "/api/words";
//const LEARNED_API_URL = "/api/words";
const Animals = () => {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(BACKEND_URL)
      .then((res) => setWords(res.data))
      .catch((err) => console.error("Lỗi tải dữ liệu", err));
  }, []);

  const playAudio = (word) => {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const nextWord = () => {
    setIsFlipped(false);
    if (index < words.length - 1) {
      setIndex(index + 1);
    } else {
      alert("🎉 Bạn đã hoàn thành học từ vựng!");
      navigate("/learnNew");
    }
  };

  const markAsLearned = () => {
    axios
      .post(BACKEND_URL, words[index], {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => nextWord())
      .catch((err) => console.error("Lỗi lưu từ đã học", err));
  };

  if (!words.length) {
    return <h2 className="text-center mt-10">⏳ Đang tải từ vựng...</h2>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="w-80 h-48 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {isFlipped ? (
          <p className="text-lg">{words[index].example}</p>
        ) : (
          <>
            <img
              src={words[index].image}
              alt={words[index].word}
              className="w-40 h-40 rounded-md"
            />
            <h2 className="text-xl font-bold mt-2">{words[index].word}</h2>
            <p className="text-gray-500">{words[index].pronunciation}</p>
            <p className="text-green-500">{words[index].meaning}</p>
          </>
        )}
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => playAudio(words[index].word)}
          className="px-3 py-2 bg-gray-200 rounded-lg"
        >
          <Volume2 />
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-3 py-2 bg-gray-200 rounded-lg"
        >
          <RotateCw />
        </button>
      </div>

      <button
        onClick={nextWord}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
      >
        Tiếp tục
      </button>

      <button
        onClick={markAsLearned}
        className="mt-2 px-6 py-2 bg-green-500 text-white rounded-lg"
      >
        Mình đã thuộc từ này
      </button>
    </div>
  );
};

export default Animals;
