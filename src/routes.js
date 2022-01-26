import { CircularProgress } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "./components/Header/Header";

const Home = lazy(() => import("./pages/Home/Home"));
const NewTask = lazy(() => import("./pages/NewTask/NewTask"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const MainRoutes = () => (
  <BrowserRouter>
    <Header />
    <Suspense
      fallback={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/new_task" element={<NewTask />} />
        <Route exact path="/edit_task/:id" element={<NewTask />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default MainRoutes;
