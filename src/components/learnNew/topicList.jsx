import React from "react";
import { List, Card } from "antd";
import { useNavigate } from "react-router-dom";

const topics = [
  { title: "Animals", image: "https://source.unsplash.com/100x100/?animals" },
  { title: "Food & Drink", image: "https://source.unsplash.com/100x100/?food" },
  { title: "Sports", image: "https://source.unsplash.com/100x100/?sports" },
  { title: "Travel", image: "https://source.unsplash.com/100x100/?travel" },
  {
    title: "Technology",
    image: "https://source.unsplash.com/100x100/?technology",
  },
  { title: "Health", image: "https://source.unsplash.com/100x100/?health" },
  { title: "Fashion", image: "https://source.unsplash.com/100x100/?fashion" },
  {
    title: "Education",
    image: "https://source.unsplash.com/100x100/?education",
  },
];

const TopicList = () => {
  const navigate = useNavigate();
  // Hàm xử lý khi click vào một card
  const handleTopicClick = (topic) => {
    console.log("Clicked on topic:", topic.title);
    navigate(`/learnNew/${topic.title}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-blue p-3 text-2xl">📚 Topic</h1>
        <List
          itemLayout="horizontal"
          dataSource={topics}
          renderItem={(item) => (
            <List.Item className="flex justify-center">
              <Card
                className="w-full p-4 flex items-center shadow-md rounded-lg bg-white border border-gray-300 cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => handleTopicClick(item)} // Gắn sự kiện onClick
              >
                <img
                  alt={item.title}
                  src={item.image}
                  className="w-20 h-20 rounded-lg object-cover mr-6"
                />
                <span className="text-xl font-semibold">{item.title}</span>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default TopicList;
