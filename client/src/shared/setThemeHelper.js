import {LS, STYLESHEETS, THEMES} from "./constants";

const createStylesheetLink = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.id = 'antd-stylesheet'
  document.head.appendChild(link)
  return link
}

const getStylesheetLink = () => document.head.querySelector('#antd-stylesheet') || createStylesheetLink()

export const setTheme = (theme) => {
  localStorage.setItem(LS.THEME, theme)
  getStylesheetLink().href = STYLESHEETS[theme]
}

export const getTheme = () => (localStorage.getItem(LS.THEME))

export const toggleTheme = () => setTheme(getTheme() === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)
