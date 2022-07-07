import React, { useEffect } from "react";
import { useRoutes } from "./routes";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth.context";
import { Navbar } from "./components/Navbar";

function App() {
  const { login, logout, token, userId, username, userRole } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(userRole);

  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, username, userRole, isAuthenticated }}
    >
      <BrowserRouter>
        <Navbar />
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
