import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { RegPage } from "./pages/RegPage";
import { CollectionsPage } from "./pages/CollectionsPage";
import { HomePage } from "./pages/HomePage";
import { ModalCreate } from "./components/ModalCreate";
import { CollectionItem } from "./pages/CollectionItem";
import { UsersPage } from "./pages/UsersPage";
import { ItemPage } from "./pages/ItemPage";

export const useRoutes = (userRole) => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>
      <Route path="/reg" element={<RegPage />}></Route>
      <Route path="/collections" element={<CollectionsPage />}></Route>
      <Route path="/modal" element={<ModalCreate />}></Route>
      <Route path="/detail/:id" element={<CollectionItem />}></Route>
      <Route path="/homepage" element={<HomePage />}></Route>
      <Route path="/users" element={<UsersPage />}></Route>
      <Route path="/item/:id" element={<ItemPage />}></Route>
      {userRole === 'Admin' ? <Route path="/userlist" element={<HomePage />}></Route> : null}
      <Route path="*" element={<Navigate to="/homepage" replace />} />
    </Routes>
  );
};
