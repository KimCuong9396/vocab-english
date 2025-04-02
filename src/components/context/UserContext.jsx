import { createContext, useState } from "react";

export const AuthContext = createContext({
  username: "",
  id: "",
});

export const AuthWrapper = (props) => {
  const [user, setUser] = useState({ username: "", id: "" });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
