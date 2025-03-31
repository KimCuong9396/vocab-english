import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import conversationIcon from "./icon/conversation.png";
import reviseIcon from "./icon/revise.png";
import handBookIcon from "./icon/handBook.png";
import learnNewIcon from "./icon/learnNew.png";
const Header = () => {
  const items = [
    {
      label: (
        <Link
          to="/"
          className="text-xl font-bold text-blue-600 hover:text-blue-800 transition duration-300"
        >
          Rabbit Vocab
        </Link>
      ),
      key: "vocab",
      icon: (
        <img
          src="https://cbx-prod.b-cdn.net/COLOURBOX63786521.jpg?width=1200&height=1200&quality=70"
          style={{ width: 40 }}
        />
      ),
    },
    {
      label: <Link to="/revise">Ôn tập</Link>,
      key: "revise",
      icon: <img src={reviseIcon} style={{ width: 50 }} />,
      //disabled: true,
    },
    {
      label: <Link to="/learnNew">Học từ mới</Link>,
      key: "learnNew",
      icon: <img src={learnNewIcon} style={{ width: 50 }} />,
    },
    {
      label: <Link to="/handBook">Sổ tay</Link>,
      key: "handbook",
      icon: <img src={handBookIcon} style={{ width: 50 }} />,
    },
    {
      label: <Link to="/conversation">Hội thoại</Link>,
      key: "conversation",
      icon: <img src={conversationIcon} style={{ width: 50 }} />,
    },
  ];
  const [current, setCurrent] = useState("mail");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
export default Header;
