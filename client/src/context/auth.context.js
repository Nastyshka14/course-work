import { createContext } from 'react';

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  username: null,
  userRole: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
  isRegistrated: false
});
