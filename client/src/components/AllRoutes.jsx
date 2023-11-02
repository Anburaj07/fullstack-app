import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Board from "../pages/Board";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/signin" element={<Login />} />
      <Route
        path="/board"
        element={
          <PrivateRoute>
            <Board />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
