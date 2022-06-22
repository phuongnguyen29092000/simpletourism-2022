import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WidthLayout from '../HOCS/widthLayout';
import { ROUTE_ADMIN_CUSTOMER, ROUTE_ADMIN_OWNER, ROUTE_ADMIN_STATISTIC, ROUTE_ADMIN_TYPE_PLACE} from './type';
import ListTypePlace from 'containers/ListTypePlace';
import ListTicket from '../containers/ListTicket';
import ListCustomerAdmin from 'containers/ListUser/ListCustomerAdmin';
import ListOwnerAdmin from 'containers/ListUser/ListOwnerAdmin';

function AdminRoutes(props) {
    return (
        <Routes>
            <Route
                path={ROUTE_ADMIN_OWNER}
                exact
                element={WidthLayout({
                    Component: ListOwnerAdmin,
                    name: 'MANAGE OWNER'
                })}
                showHeaderSearch={false}
            />
            <Route
                path={ROUTE_ADMIN_CUSTOMER}
                exact
                element={WidthLayout({
                    Component: ListCustomerAdmin,
                    name: 'MANAGE CUSTOMER'
                })}
                showHeaderSearch={false}
            />
            <Route
                path={ROUTE_ADMIN_TYPE_PLACE}
                exact
                element={WidthLayout({
                    Component: ListTypePlace,
                    name: 'MANAGE TYPE PLACE',
                    showHeaderSearch:false
                })}
            />
            <Route
                path={ROUTE_ADMIN_STATISTIC}
                exact
                element={WidthLayout({
                    Component: ListCustomerAdmin,
                    name: 'MANAGE STATSTIC',
                    showHeaderSearch: false
                })}
            />
            <Route
                path={ROUTE_ADMIN_STATISTIC}
                exact
                element={WidthLayout({
                    Component: ListCustomerAdmin,
                    name: 'CONTACT'
                })}
                showHeaderSearch={false}
            />
        </Routes>
    );
}

export default AdminRoutes;