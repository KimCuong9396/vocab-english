// components/Animals.js
import React, { useState, useEffect } from "react";
import axios from "../../services/axios.customize";
import { Volume2, RotateCw, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Animals = () => {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Lấy danh sách từ vựng khi component mount
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await axios.get("/api/words");
        setWords(response.data.words);
      } catch (err) {
        setError("Lỗi khi tải danh sách từ vựng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, []);

  // Hàm phát âm từ vựng
  const playAudio = (word) => {
    if (!word) return;
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  // Hàm lưu từ vựng đã thuộc
  const saveLearnedWord = async () => {
    const currentWord = words[index];
    if (!currentWord) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vui lòng đăng nhập để lưu tiến trình!");
      return;
    }

    try {
      await axios.post(
        "/api/vocabulary/save",
        { wordId: currentWord._id, status: "learned" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`Đã lưu từ "${currentWord.word}" vào danh sách ôn tập`);
    } catch (err) {
      setError("Lỗi khi lưu từ vựng");
      console.error(err);
    }
  };

  // Chuyển sang từ tiếp theo
  const nextWord = () => {
    setIsFlipped(false);
    if (index < words.length - 1) {
      setIndex(index + 1);
    } else {
      alert("🎉 Bạn đã hoàn thành bộ từ vựng!");
      navigate("/revise"); // Điều hướng đến trang ôn tập
    }
  };

  // Xử lý trạng thái loading và lỗi
  if (loading) {
    return <h2 className="text-center mt-10">⏳ Đang tải từ vựng...</h2>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!words.length) {
    return <h2 className="text-center mt-10">Không có từ vựng nào để học!</h2>;
  }

  const currentWord = words[index];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Flashcard */}
      <div
        className={`w-96 h-64 bg-white border border-gray-300 rounded-xl shadow-lg flex flex-col items-center justify-center p-6 cursor-pointer transform transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: "1000px" }}
      >
        <div
          className="w-full h-full flex flex-col items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          {isFlipped ? (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">Ví dụ:</p>
              <p className="text-base mt-2">{currentWord.example}</p>
            </div>
          ) : (
            <>
              {currentWord.image && (
                <img
                  src={currentWord.image}
                  alt={currentWord.word}
                  className="w-32 h-32 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-gray-800">
                {currentWord.word}
              </h2>
              <p className="text-gray-500 text-sm">
                {currentWord.pronunciation}
              </p>
              <p className="text-green-600 font-medium mt-1">
                {currentWord.meaning}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Nút điều khiển */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => playAudio(currentWord.word)}
          className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          title="Phát âm"
        >
          <Volume2 size={20} />
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
          title="Lật thẻ"
        >
          <RotateCw size={20} />
        </button>
        <button
          onClick={saveLearnedWord}
          className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          title="Đã thuộc"
        >
          <Check size={20} />
        </button>
      </div>

      {/* Nút tiếp theo */}
      <div className="mt-6">
        <button
          onClick={nextWord}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          Tiếp theo <ArrowRight className="ml-2" size={20} />
        </button>
      </div>

      {/* Tiến trình */}
      <p className="mt-4 text-gray-600">
        {index + 1} / {words.length}
      </p>
    </div>
  );
};

export default Animals;
