import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListTour from '../components/ListTour';
import ManageTicket from '../components/ManageTicket';
import WidthLayout from '../HOCS/widthLayout';
import { ROUTE_ADD_TOUR, ROUTE_LIST_TICKET, ROUTE_LIST_TOUR } from './type';

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
                    Component: ManageTicket,
                    name: 'MANAGE TICKER'
                })}
                showHeaderSearch={false}
            />
        </Routes>
    );
}

export default OwnerRoutes;