import React from 'react';
import IconAddTour from '../../assets/icons/icon-addtour.svg'
import IconListTour from '../../assets/icons/icon-list-tour.svg'
import IconTicket from '../../assets/icons/icon-ticket.svg'
import IconCustomer from '../../assets/icons/icon-customer.svg'
import IconAccount from '../../assets/icons/icon-account.svg'
import IconNews from '../../assets/icons/icon-news.svg'
import IconStatistic from '../../assets/icons/icon-statistic.svg'
import logo from '../../public/logoTest.png';
import { ROUTE_LIST_CUSTOMER, ROUTE_LIST_TICKET, ROUTE_LIST_TOUR, ROUTE_OWNER_ACCOUNT, ROUTE_OWNER_NEWS } from '../../route/type';
import { Link } from 'react-router-dom';
function SideBar(props) {
    return (
        <div className='sidebar-section'>
            <div className='sidebar-wrapper'>
                <div className='logo'>
                    <img src={logo} />
                </div>
                <div className='menu-list-item'>
                    <Link to={ROUTE_LIST_TOUR}>
                        <div className='menu-item list-tour'>
                            <div className='menu-item__icon'>
                                <img src={IconListTour} />
                                <div className='menu-item__title'>
                                    TOUR
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={ROUTE_LIST_TICKET}>
                        <div className='menu-item list-ticket'>
                            <div className='menu-item__icon'>
                                <img src={IconTicket} />
                                <div className='menu-item__title'>
                                    VÉ
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={ROUTE_OWNER_NEWS}>
                        <div className='menu-item list-customer'>
                            <div className='menu-item__icon'>
                                <img src={IconCustomer} />
                                <div className='menu-item__title'>
                                    KHÁCH HÀNG
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={ROUTE_OWNER_NEWS}>
                        <div className='menu-item account'>
                            <div className='menu-item__icon'>
                                <img src={IconNews} />
                                <div className='menu-item__title'>
                                    TIN TỨC
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={ROUTE_OWNER_NEWS}>
                        <div className='menu-item account'>
                            <div className='menu-item__icon'>
                                <img src={IconStatistic} />
                                <div className='menu-item__title'>
                                    THỐNG KÊ
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <Link to={ROUTE_OWNER_ACCOUNT}>
                    <div className='menu-item account'>
                        <div className='menu-item__icon'>
                            <img src={IconAccount} />
                            <div className='menu-item__title'>
                                TÀI KHOẢN
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SideBar;