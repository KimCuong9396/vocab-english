import React from "react";
import { List, Card } from "antd";

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
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          📚 Chủ đề tiếng Anh
        </h2>
        <List
          itemLayout="horizontal"
          dataSource={topics}
          renderItem={(item) => (
            <List.Item className="flex justify-center">
              <Card className="w-full p-4 flex items-center shadow-md rounded-lg bg-white border border-gray-300">
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
