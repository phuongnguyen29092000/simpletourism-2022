import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import WidthLayout from '../HOCS/widthLayout';
import { ROUTE_ADMIN_CUSTOMER, ROUTE_ADMIN_OWNER, ROUTE_ADMIN_STATISTIC, ROUTE_ADMIN_TYPE_PLACE} from './type';
import ListTypePlace from 'containers/ListTypePlace';
import ListTicket from '../containers/ListTicket';
import ListCustomerAdmin from 'containers/ListUser/ListCustomerAdmin';
import ListOwnerAdmin from 'containers/ListUser/ListOwnerAdmin';
import { useDispatch } from 'react-redux';
import { setAccountInfo } from 'redux/reducers/user/action';
import { getUser } from 'hooks/localAuth';
import AdminStatistic from 'containers/Statistic/AdminStatistic';

function AdminRoutes(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        let account = getUser();
        if(account) dispatch(setAccountInfo(account, () => {
          if(account.role === 'admin') navigate('/admin/owner')
        }))
        else navigate('/')
      },[])
    return (
        <Routes>
            <Route
                path={ROUTE_ADMIN_OWNER}
                exact
                element={WidthLayout({
                    Component: ListOwnerAdmin,
                    name: 'MANAGE OWNER'
                })}
            />
            <Route
                path={ROUTE_ADMIN_CUSTOMER}
                exact
                element={WidthLayout({
                    Component: ListCustomerAdmin,
                    name: 'MANAGE CUSTOMER'
                })}
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
                    Component: AdminStatistic,
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
            />
        </Routes>
    );
}

export default AdminRoutes;