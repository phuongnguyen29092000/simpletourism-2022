import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ManageTicket from '../components/ManageTicket';
import ListTour from '../containers/ListTour';
import ListTicket from '../containers/ListTicket';
import WidthLayout from '../HOCS/widthLayout';
import { ROUTE_LIST_TICKET, ROUTE_LIST_TOUR, ROUTE_LIST_CUSTOMER, ROUTE_OWNER_NEWS, ROUTE_OWNER_STATISTIC } from './type';
import ListUserOwner from 'containers/ListUser/ListUserOwner';
import OwnerNews from 'containers/News/OwnerNews';
import OwnerStatistic from 'containers/Statistic/OwnerStatistic';
import { getUser } from 'hooks/localAuth';
import { setAccountInfo } from 'redux/reducers/user/action';
import { useDispatch } from 'react-redux';

function OwnerRoutes(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        let account = getUser();
        if(account) dispatch(setAccountInfo(account, () => {
          if(account.role === 'owner') navigate('/owner/list-tour')
        }))
        else navigate('/')
      },[])
    return (
        <Routes>
            <Route
                path={ROUTE_LIST_TOUR}
                exact
                element={WidthLayout({
                    Component: ListTour,
                    name: 'MANAGE TOUR',
                })}
            />
            <Route
                path={ROUTE_LIST_TICKET}
                exact
                element={WidthLayout({
                    Component: ListTicket,
                    name: 'MANAGE TICKER',
                })}
            />
            <Route
                path={ROUTE_LIST_CUSTOMER}
                exact
                element={WidthLayout({
                    Component: ListUserOwner,
                    name: 'MANAGE CUSTOMER',
                    showHeaderSearch: false
                })}
            />
             <Route
                path={ROUTE_OWNER_NEWS}
                exact
                element={WidthLayout({
                    Component: OwnerNews,
                    name: 'MANAGE NEWS',
                    showHeaderSearch: false
                })}
            />
             <Route
                path={ROUTE_OWNER_STATISTIC}
                exact
                element={WidthLayout({
                    Component: OwnerStatistic,
                    name: 'STATISTIC',
                    showHeaderSearch: false
                })}
            />
        </Routes>
    );
}

export default OwnerRoutes;