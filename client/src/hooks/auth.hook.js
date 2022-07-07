import { useState, useCallback, useEffect } from "react";
const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const login = useCallback((token, userId, username, userRole) => {
    setToken(token);
    setUserId(userId);
    setUsername(username);
    setUserRole(userRole);    
    localStorage.setItem(
      storageName,
      JSON.stringify({ token, userId, username, userRole })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.username, data.userRole);
    }
  }, [login]);

  return { login, logout, token, userId, username, userRole };
};
