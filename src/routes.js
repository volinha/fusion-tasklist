import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NewTask from './pages/NewTask/NewTask';

const MainRoutes = () => {
    return(
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/new_task"
                element={<NewTask />}
            />
            <Route 
                path="/edit_task/:id"
                element={<NewTask />}
            />
        </Routes>
        )
}

export default MainRoutes;