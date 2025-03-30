import React, { useState, useEffect } from "react";
import { Volume2, RotateCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const words = [
  {
    word: "Elephant",
    meaning: "Con voi",
    image: "https://source.unsplash.com/200x200/?elephant",
    pronunciation: "/ˈɛl.ɪ.fənt/",
    example: "The elephant is the largest land animal.",
  },
  {
    word: "Tiger",
    meaning: "Con hổ",
    image: "https://source.unsplash.com/200x200/?tiger",
    pronunciation: "/ˈtaɪ.ɡɚ/",
    example: "The tiger is a strong predator.",
  },
  // Thêm nhiều từ khác...
];

const Animals = () => {
  const [learnedWords, setLearnedWords] = useState(() => {
    return JSON.parse(localStorage.getItem("learnedWords")) || [];
  });

  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("learnedWords", JSON.stringify(learnedWords));
  }, [learnedWords]);

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
    const newLearnedWords = [...learnedWords, words[index]];
    setLearnedWords(newLearnedWords);
    nextWord();
  };

  if (learnedWords.length === words.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          🎉 Hoàn thành! Bạn đã học hết từ!
        </h1>
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
              className="w-24 h-24 rounded-md"
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
