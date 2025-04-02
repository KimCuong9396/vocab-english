// components/Revise.js
import React, { useState, useEffect } from "react";
import axios from "../services/axios.customize";
import { Volume2, RotateCw, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Revise = () => {
  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Lấy danh sách từ vựng đã học khi component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/api/vocabulary/history");
        setHistory(response.data.history || []);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Vui lòng đăng nhập để xem lịch sử ôn tập!");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setError(err.response?.data?.message || "Lỗi khi tải lịch sử");
        }
        console.error("Lỗi khi tải lịch sử", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [navigate]);

  // Hàm phát âm từ vựng
  const playAudio = (word) => {
    if (!word) return;
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  // Chuyển sang từ tiếp theo
  const nextWord = () => {
    setIsFlipped(false);
    if (index < history.length - 1) {
      setIndex(index + 1);
    } else {
      alert("🎉 Bạn đã hoàn thành ôn tập!");
      navigate("/"); // Điều hướng về trang chính hoặc trang khác
    }
  };

  // Xử lý trạng thái loading và lỗi
  if (loading) {
    return <h2 className="text-center mt-10">⏳ Đang tải...</h2>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">{error}</p>
        {error.includes("đăng nhập") && (
          <p className="text-gray-500">
            Đang chuyển hướng đến trang đăng nhập...
          </p>
        )}
      </div>
    );
  }

  if (!history.length) {
    return (
      <h2 className="text-center mt-10">Chưa có từ vựng nào để ôn tập!</h2>
    );
  }

  const currentWord = history[index].wordId; // Lấy thông tin từ wordId

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
        {index + 1} / {history.length}
      </p>
    </div>
  );
};

export default Revise;
