import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({
  user: { username: "", id: "" },
  setUser: () => {},
});

export const AuthWrapper = (props) => {
  const [user, setUser] = useState({ username: "", id: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("AuthWrapper - check token on mount:", token);

    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("api/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response;
          console.log("AuthWrapper - API response:", response);

          // Kiểm tra và cập nhật user nếu dữ liệu hợp lệ
          if (userData && userData.username && userData.id) {
            setUser({
              username: userData.username,
              id: userData.id,
            });
          } else {
            throw new Error("Invalid user data format");
          }
        } catch (error) {
          console.error("AuthWrapper - Failed to fetch user data:", error);
          localStorage.removeItem("token"); // Xóa token nếu không hợp lệ
          setUser({ username: "", id: "" });
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false); // Không có token thì không cần fetch
    }
  }, []); // Chỉ chạy một lần khi mount

  console.log("AuthWrapper - current user:", user);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
