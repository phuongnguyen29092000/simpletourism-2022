import React from 'react';
import { Route, Routes } from 'react-router-dom';
import userLayout from '../HOCS/userLayout';
import HomePage from '../pages/HomePage'
import { ROUTE_HOME, ROUTE_USER_DOMESTIC } from './type';

const userRoutes = () => {
    return (
        <Routes>
            {/* <Route
                path={ROUTE_USER_DOMESTIC}
                exact
                element={userLayout({
                    Component: ,
                    name: 'MANAGE TOUR'
                })}
            /> */}
            <Route
                path={ROUTE_HOME}
                exact
                element = {userLayout({
                    Component: HomePage
                })}
            />
        </Routes>
    );
};

export default userRoutes;