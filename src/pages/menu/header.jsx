import { SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../components/context/UserContext";
import conversationIcon from "./icon/conversation.png";
import reviseIcon from "./icon/revise.png";
import handBookIcon from "./icon/handBook.png";
import learnNewIcon from "./icon/learnNew.png";

const Header = () => {
  const [current, setCurrent] = useState("mail");
  const { username } = useUser(); // Lấy username từ Context

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    { label: <Link to="/">Rabbit Vocab</Link>, key: "vocab" },
    {
      label: <Link to="/revise">Ôn tập</Link>,
      key: "revise",
      icon: <img src={reviseIcon} style={{ width: 50 }} />,
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
    {
      label: username ? `Xin chào, ${username}` : "Người dùng",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        { type: "group", children: [{ label: "Đăng xuất", key: "logout" }] },
      ],
    },
  ];

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
