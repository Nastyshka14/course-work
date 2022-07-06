import React, { useEffect } from "react";
import { useRoutes } from "./routes";
import { BrowserRouter, useNavigate} from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth.context";
import { Navbar } from "./components/Navbar";

function App() {
  const { login, logout, token, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated}}>
    <BrowserRouter>
    {isAuthenticated && <Navbar />}
   <div className="container">
    {routes}
   </div>
   </BrowserRouter>
   </AuthContext.Provider>
  );
}

export default App;
