import React, { useEffect } from "react";
import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth.context";
import { Navbar } from "./components/Navbar";
import {Spin} from "antd";
import {useHttp} from "./hooks/http.hook";

const stylesheets = {
  light: "https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.min.css",
  dark: "https://cdnjs.cloudflare.com/ajax/libs/antd/4.9.4/antd.dark.min.css"
}

const createStylesheetLink = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.id = 'antd-stylesheet'
  document.head.appendChild(link)
  return link
}

const getStylesheetLink = () => document.head.querySelector("#antd-stylesheet") || createStylesheetLink()

const systemTheme = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

const setTheme = (theme) => {
  localStorage.setItem('theme', theme)
  getStylesheetLink().href = stylesheets[theme]
}

const getTheme = () => (localStorage.getItem('theme')) || systemTheme()

const toggleTheme = () => setTheme(getTheme() === 'dark' ? 'light' : 'dark')

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
