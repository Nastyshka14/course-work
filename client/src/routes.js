import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { RegPage } from "./pages/RegPage";
import { CollectionsPage } from "./pages/CollectionsPage";
import { HomePage } from "./pages/HomePage";
import { ModalCreate } from "./components/ModalCreate";
import { CollectionItem } from "./pages/CollectionItem";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/collections" element={<CollectionsPage />}></Route>
        <Route path="/modal" element={<ModalCreate />}></Route>
        <Route path="/detail/:id" element={<CollectionItem />}></Route>
        <Route path="/homepage" element={<HomePage />}></Route>
        <Route path="*" element={<Navigate to="/homepage" replace />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>
      <Route path="/reg" element={<RegPage />}></Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
