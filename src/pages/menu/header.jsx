import {
  AliwangwangOutlined,
  LoginOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../components/context/UserContext";
import conversationIcon from "./icon/conversation.png";
import reviseIcon from "./icon/revise.png";
import handBookIcon from "./icon/handBook.png";
import learnNewIcon from "./icon/learnNew.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Thêm useLocation để lấy URL hiện tại
  const [current, setCurrent] = useState("home");
  const { user, setUser } = useContext(AuthContext);

  // Cập nhật current dựa trên URL khi component mount hoặc URL thay đổi
  useEffect(() => {
    const path = location.pathname;
    const keyMap = {
      "/": "home",
      "/revise": "revise",
      "/learnNew": "learnNew",
      "/handBook": "handbook",
      "/conversation": "conversation",
      "/login": "login",
    };
    setCurrent(keyMap[path] || "home"); // Nếu không khớp thì mặc định là "home"
  }, [location.pathname]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setUser({
      username: "",
      id: "",
    });
    message.success("Logout thành công.");
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
