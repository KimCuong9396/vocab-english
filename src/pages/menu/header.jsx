import {
  AliwangwangOutlined,
  LoginOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/context/UserContext";
import conversationIcon from "./icon/conversation.png";
import reviseIcon from "./icon/revise.png";
import handBookIcon from "./icon/handBook.png";
import learnNewIcon from "./icon/learnNew.png";

const Header = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home");
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser({
      username: "",
      id: "",
    });
    message.success("Logout thành công.");
    //redirect to home
    navigate("/");
  };
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    { label: <Link to="/">Rabbit Vocab</Link>, key: "home" },
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
    // {
    //   label: user.username ? `Xin chào, ${user.username}` : "Người dùng",
    //   key: "SubMenu",
    //   icon: <SettingOutlined />,
    //   children: [
    //     { type: "group", children: [{ label: "Đăng xuất", key: "logout" }] },
    //   ],
    // },
    ...(!user.id
      ? [
          {
            label: <Link to={"/login"}>Đăng nhập</Link>,
            key: "login",
            icon: <LoginOutlined />,
          },
        ]
      : []),
    ...(user.id
      ? [
          {
            label: `Welcome ${user.username}`,
            key: "welcome",
            icon: <AliwangwangOutlined />,
            children: [
              {
                label: (
                  <span
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Đăng xuất
                  </span>
                ),
                key: "logout",
              },
            ],
          },
        ]
      : []),
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
