import { useState } from "react";
import { Card, Button } from "antd";
import { SwapOutlined, SoundOutlined } from "@ant-design/icons";
import "./FlashCard.css";

const FlashCard = ({ cardData }) => {
  const [flipped, setFlipped] = useState(false);

  const playAudio = (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan lên container flashcard
    if (cardData.audio) {
      const audio = new Audio(cardData.audio);
      audio.play();
    }
  };

  return (
    <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
      <div className={`flashcard ${flipped ? "flipped" : ""}`}>
        {/* Mặt trước */}
        <Card className="flashcard-front">
          <div className="content">{cardData.front}</div>
          <SwapOutlined className="icon" />
        </Card>

        {/* Mặt sau */}
        <Card className="flashcard-back">
          <div className="content">
            {cardData.back}
            {cardData.image && (
              <img
                src={cardData.image}
                alt="Flashcard"
                className="flashcard-image"
              />
            )}
            <Button
              type="primary"
              shape="circle"
              icon={<SoundOutlined />}
              onClick={playAudio}
            />
          </div>
          <SwapOutlined className="icon" />
        </Card>
      </div>
    </div>
  );
};

export default FlashCard;
