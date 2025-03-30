import { React, useState } from "react";
import { Card, Button } from "antd";
import { RotateCw, Volume2 } from "lucide-react"; // Biểu tượng xoay và loa

const animalWords = [
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
    pronunciation: "/ˈtaɪ.ɡər/",
    example: "The tiger is a strong and powerful animal.",
  },
  {
    word: "Dolphin",
    meaning: "Cá heo",
    image: "https://source.unsplash.com/200x200/?dolphin",
    pronunciation: "/ˈdɑːl.fɪn/",
    example: "Dolphins are very intelligent creatures.",
  },
  {
    word: "Panda",
    meaning: "Gấu trúc",
    image: "https://source.unsplash.com/200x200/?panda",
    pronunciation: "/ˈpæn.də/",
    example: "Pandas eat a lot of bamboo.",
  },
];

const Animals = () => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    setFlipped(false); // Quay lại mặt trước khi đổi từ mới
    setIndex((prevIndex) => (prevIndex + 1) % animalWords.length);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const speakWord = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US"; // Giọng tiếng Anh
    speechSynthesis.speak(utterance);
  };

  const { word, meaning, image, pronunciation, example } = animalWords[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        🐾 Học từ vựng: Animals
      </h1>

      <Card
        className="w-96 p-6 rounded-xl shadow-lg bg-white border-gray-300 text-center relative cursor-pointer hover:shadow-xl transition duration-300"
        onClick={handleFlip}
      >
        {!flipped ? (
          // Mặt trước của Flashcard
          <div>
            <img
              src={image}
              alt={word}
              className="w-32 h-32 mx-auto mb-4 rounded-lg"
            />
            <h2 className="text-2xl font-bold text-gray-800">{word}</h2>
            <p className="text-gray-500 text-lg italic">{pronunciation}</p>
            <p className="text-gray-700 text-lg">{meaning}</p>

            {/* Biểu tượng loa phát âm thanh */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Ngăn click làm lật thẻ
                speakWord(word);
              }}
              className="absolute bottom-3 right-3 text-gray-600 hover:text-blue-600"
            >
              <Volume2 size={24} />
            </button>

            <RotateCw className="absolute top-3 right-3 text-gray-400" />
          </div>
        ) : (
          // Mặt sau của Flashcard (Ví dụ)
          <div>
            <h3 className="text-xl font-bold text-gray-800">Ví dụ:</h3>
            <p className="text-gray-600 italic mt-4">"{example}"</p>
            <RotateCw className="absolute top-3 right-3 text-gray-400" />
          </div>
        )}
      </Card>

      <Button
        type="primary"
        className="mt-6 px-6 py-2 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg"
        onClick={handleNext}
      >
        Tiếp tục ➡️
      </Button>
    </div>
  );
};

export default Animals;
