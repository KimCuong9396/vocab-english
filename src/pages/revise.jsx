import React, { useState, useEffect } from "react";
import { Volume2, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Revise = () => {
  const [learnedWords, setLearnedWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWords = JSON.parse(localStorage.getItem("learnedWords")) || [];
    setLearnedWords(storedWords);
  }, []);

  const playAudio = (word) => {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  const nextWord = () => {
    setIsFlipped(false);
    if (index < learnedWords.length - 1) {
      setIndex(index + 1);
    } else {
      alert("🎉 Bạn đã ôn tập hết từ vựng!");
      navigate("/learnNew");
    }
  };

  if (learnedWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">📖 Chưa có từ để ôn tập</h1>
        <p className="text-gray-500">Hãy học từ mới trước khi ôn tập!</p>
        <button
          onClick={() => navigate("/learnNew")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Quay lại học từ mới
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">📖 Ôn tập từ đã học</h1>

      <div
        className="w-80 h-48 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {isFlipped ? (
          <p className="text-lg">{learnedWords[index].example}</p>
        ) : (
          <>
            <img
              src={learnedWords[index].image}
              alt={learnedWords[index].word}
              className="w-24 h-24 rounded-md"
            />
            <h2 className="text-xl font-bold mt-2">
              {learnedWords[index].word}
            </h2>
            <p className="text-gray-500">{learnedWords[index].pronunciation}</p>
            <p className="text-green-500">{learnedWords[index].meaning}</p>
          </>
        )}
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => playAudio(learnedWords[index].word)}
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
    </div>
  );
};

export default Revise;
