import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageTicket from '../components/ManageTicket';
import ListTour from '../containers/ListTour';
import ListTicket from '../containers/ListTicket';
import WidthLayout from '../HOCS/widthLayout';
import { ROUTE_LIST_TICKET, ROUTE_LIST_TOUR, ROUTE_LIST_CUSTOMER } from './type';
import ListUserOwner from 'containers/ListUser/ListUserOwner';

function OwnerRoutes(props) {
    console.log(ROUTE_LIST_CUSTOMER);
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
            <Route
                path={ROUTE_LIST_CUSTOMER}
                exact
                element={WidthLayout({
                    Component: ListUserOwner,
                    name: 'MANAGE CUSTOMER'
                })}
                showHeaderSearch={false}
            />
        </Routes>
    );
}

export default OwnerRoutes;