import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const items = [
    {
      label: <Link to="/">Vocab</Link>,
      key: "vocab",
      icon: (
        <img
          src="https://cbx-prod.b-cdn.net/COLOURBOX63786521.jpg?width=1200&height=1200&quality=70"
          style={{ width: 20 }}
        />
      ),
    },
    {
      label: <Link to="/revise">Ôn tập</Link>,
      key: "revise",
      icon: (
        <img
          src="https://cbx-prod.b-cdn.net/COLOURBOX63786521.jpg?width=1200&height=1200&quality=70"
          style={{ width: 20 }}
        />
      ),
      //disabled: true,
    },
    {
      label: <Link to="/learnNew">Học từ mới</Link>,
      key: "learnNew",
      icon: (
        <img
          src="https://cbx-prod.b-cdn.net/COLOURBOX63786521.jpg?width=1200&height=1200&quality=70"
          style={{ width: 20 }}
        />
      ),
    },
    {
      label: <Link to="/handBook">Sổ tay</Link>,
      key: "handbook",
      icon: (
        <img
          src="https://cbx-prod.b-cdn.net/COLOURBOX63786521.jpg?width=1200&height=1200&quality=70"
          style={{ width: 20 }}
        />
      ),
    },
    {
      label: <Link to="/conversation">Hội thoại</Link>,
      key: "conversation",
      icon: (
        <img
          src="https://cbx-prod.b-cdn.net/COLOURBOX63786521.jpg?width=1200&height=1200&quality=70"
          style={{ width: 20 }}
        />
      ),
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
