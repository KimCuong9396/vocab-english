import React, { useState, useEffect } from "react";
import axios from "../../services/axios.customize";
import { Volume2, RotateCw, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Animals = () => {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/words")
      .then((res) => setWords(res.data))
      .catch((err) => console.error("Lỗi tải dữ liệu", err));
  }, []);

  const playAudio = (word) => {
    if (!word) return;
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const saveWord = () => {
    if (!words[index]) return;
    const token = localStorage.getItem("token");

    axios
      .post(
        "/api/progress/update",
        { word: words[index].word },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((err) => console.error("Lỗi lưu từ đã học", err));
  };

  const nextWord = () => {
    saveWord(); // Lưu từ vựng trước khi chuyển sang từ mới
    setIsFlipped(false);
    if (index < words.length - 1) {
      setIndex(index + 1);
    } else {
      alert("🎉 Bạn đã hoàn thành học từ vựng!");
      navigate("/revise");
    }
  };

  if (!words.length) {
    return <h2 className="text-center mt-10">⏳ Đang tải từ vựng...</h2>;
  }

  const currentWord = words[index];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="w-80 h-48 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {isFlipped ? (
          <p className="text-lg">{currentWord.example}</p>
        ) : (
          <>
            {currentWord.image && (
              <img
                src={currentWord.image}
                alt={currentWord.word}
                className="w-40 h-40 rounded-md"
              />
            )}
            <h2 className="text-xl font-bold mt-2">{currentWord.word}</h2>
            <p className="text-gray-500">{currentWord.pronunciation}</p>
            <p className="text-green-500">{currentWord.meaning}</p>
          </>
        )}
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => playAudio(currentWord.word)}
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

      <div className="mt-4">
        <button
          onClick={nextWord}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg flex items-center"
        >
          Tiếp tục <ArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Animals;
