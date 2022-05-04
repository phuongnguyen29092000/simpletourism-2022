import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageTicket from '../components/ManageTicket';
import ListTour from '../containers/ListTour';
import ListTicket from '../containers/ListTicket';
import WidthLayout from '../HOCS/widthLayout';
import { ROUTE_LIST_TICKET, ROUTE_LIST_TOUR } from './type';

function OwnerRoutes(props) {
    return (
        <Routes>
            <Route
                path={ROUTE_LIST_TOUR}
                exact
                element={WidthLayout({
                    Component: ListTour,
                    name: 'MANAGE TOUR'
                })}
                showHeaderSearch={false}
            />
            <Route
                path={ROUTE_LIST_TICKET}
                exact
                element={WidthLayout({
                    Component: ListTicket,
                    name: 'MANAGE TICKER'
                })}
                showHeaderSearch={false}
            />
        </Routes>
    );
}

export default OwnerRoutes;