import React from 'react';
import IconAddTour from '../../assets/icons/icon-addtour.svg'
import IconListTour from '../../assets/icons/icon-list-tour.svg'
import IconTicket from '../../assets/icons/icon-ticket.svg'
import IconCustomer from '../../assets/icons/icon-customer.svg'
import IconAccount from '../../assets/icons/icon-account.svg'
import logo from '../../public/logoTest.png';
import { ROUTE_ADD_TOUR, ROUTE_LIST_CUSTOMER, ROUTE_LIST_TICKET, ROUTE_LIST_TOUR, ROUTE_OWNER_ACCOUNT } from '../../route/type';
import { Link } from 'react-router-dom';
function SideBar(props) {
    return (
        <div className='sidebar-section'>
            <div className='sidebar-wrapper'>
                <div className='logo'>
                    <img src={logo} />
                </div>
                <div className='menu-list-item'>
                    <Link to={ROUTE_ADD_TOUR}>
                        <div className='menu-item add-tour'>
                            <div className='menu-item__icon'>
                                <img src={IconAddTour} />
                                <div className='menu-item__title'>
                                    Add tour
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={ROUTE_LIST_TOUR}>
                        <div className='menu-item list-tour'>
                            <div className='menu-item__icon'>
                                <img src={IconListTour} />
                                <div className='menu-item__title'>
                                    List tour
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={ROUTE_LIST_TICKET}>
                        <div className='menu-item list-ticket'>
                            <div className='menu-item__icon'>
                                <img src={IconTicket} />
                                <div className='menu-item__title'>
                                    List ticket
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to={ROUTE_LIST_CUSTOMER}>
                        <div className='menu-item list-customer'>
                            <div className='menu-item__icon'>
                                <img src={IconCustomer} />
                                <div className='menu-item__title'>
                                    Customer
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
                                Account
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default SideBar;