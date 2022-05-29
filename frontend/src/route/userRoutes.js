import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TourDomestic from '../containers/ListCardTour/TourDomestic';
import TourInternational from '../containers/ListCardTour/TourInternational';
import TourResult from '../containers/ListCardTour/TourResult';
import TourDetail from '../containers/TourDetail';
import userLayout from '../HOCS/userLayout';
import HomePage from '../pages/HomePage'
import NewsList from 'containers/ListNews';
import { ROUTE_HOME, ROUTE_TOUR_DETAIL, ROUTE_TOUR_DOMESTIC, ROUTE_TOUR_FILTER, ROUTE_TOUR_INTERNATIONAL, ROUTE_USER_NEWS} from './type';

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
            <Route
                path={ROUTE_TOUR_DOMESTIC}
                exact
                element = {userLayout({
                    Component: TourDomestic
                })}
            />
            <Route
                path={ROUTE_TOUR_INTERNATIONAL}
                exact
                element = {userLayout({
                    Component: TourInternational
                })}
            />
            <Route
                path={ROUTE_TOUR_FILTER}
                element = {userLayout({
                    Component: TourResult
                })}
            />
            
            <Route
                path={ROUTE_TOUR_DETAIL}
                element = {userLayout({
                    Component: TourDetail
                })}
            />

            <Route
                path={ROUTE_USER_NEWS}
                element = {userLayout({
                    Component: NewsList
                })}
            />
        </Routes>
    );
};

export default userRoutes;