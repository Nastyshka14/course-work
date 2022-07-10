import React, { useEffect } from "react";
import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth.context";
import { Navbar } from "./components/Navbar";
import {toggleTheme, getTheme, setTheme} from "./shared/setThemeHelper";

function App() {
  const { login, logout, token, userId, username, userRole } = useAuth();
   const isAuthenticated = !!token;
  const routes = useRoutes(userRole);
  useEffect(() => setTheme(getTheme()), [])

  return (
    <AuthContext.Provider value={{ login, logout, token, userId, username, userRole, isAuthenticated }}>
      <BrowserRouter>
        <Navbar toggleTheme={toggleTheme} />
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
