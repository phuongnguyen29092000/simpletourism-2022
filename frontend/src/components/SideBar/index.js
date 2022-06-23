import React from 'react';
// import IconListTour from '../../assets/icons/icon-list-tour.svg'
import IconTypeplace from 'assets/icons/icon_moutain.svg'
import logo from '../../public/logo-spt.png';
import { ROUTE_LIST_CUSTOMER, ROUTE_LIST_TICKET, ROUTE_LIST_TOUR, ROUTE_OWNER_ACCOUNT, ROUTE_OWNER_NEWS, ROUTE_ADMIN_CUSTOMER, ROUTE_ADMIN_OWNER, ROUTE_ADMIN_STATISTIC, ROUTE_ADMIN_TYPE_PLACE, ROUTE_OWNER_STATISTIC } from '../../route/type';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem, Typography } from '@mui/material';
import { logoutGoogle } from 'redux/reducers/user/action';
import { useDispatch, useSelector } from 'react-redux';
import { resetTicket } from 'redux/reducers/listTicket/action';
import { getUser } from 'hooks/localAuth';
import { IconCustomer, IconListTicket, IconListTour, IconNews, IconStatistic } from 'assets/icons/icons';
// import 
function SideBar(props) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {activePage} = useSelector(store => store.activeUrl)
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const { account } = useSelector((store) => store.user)
    return (
        <div className='sidebar-section'>
            <div className='sidebar-wrapper'>
                <div className='logo'>
                    <img src={logo} />
                </div>
                {
                    account.role == "owner" && (
                        <div className='menu-list-item' style={{background: '#5584AC'}}>
                            <Link to={ROUTE_LIST_TOUR}>
                                <div className={`menu-item list-tour ${activePage === 'list-tour' ? 'active' : ''}`}>
                                    <div className='menu-item__icon'>
                                        <IconListTour/>
                                        <div className='menu-item__title'>
                                            TOUR
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to={ROUTE_LIST_TICKET}>
                                <div className={`menu-item list-ticket ${activePage === 'list-ticket' ? 'active' : ''}`} onClick={() => dispatch(resetTicket())}>
                                    <div className='menu-item__icon'>
                                        <IconListTicket/>
                                        <div className='menu-item__title'>
                                            VÉ
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to={ROUTE_LIST_CUSTOMER}>
                                <div className={`menu-item list-customer ${activePage === 'list-customer' ? 'active' : ''}`}>
                                    <div className='menu-item__icon'>
                                        <IconCustomer/>
                                        <div className='menu-item__title'>
                                            KHÁCH HÀNG
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to={ROUTE_OWNER_NEWS}>
                                <div className={`menu-item news ${activePage === 'news' ? 'active' : ''}`}>
                                    <div className='menu-item__icon'>
                                        <IconNews/>
                                        <div className='menu-item__title'>
                                            TIN TỨC
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to={ROUTE_OWNER_STATISTIC}>
                                <div className={`menu-item statistic ${activePage === 'statistic' ? 'active' : ''}`}>
                                    <div className='menu-item__icon'>
                                        <IconStatistic/>
                                        <div className='menu-item__title'>
                                            THỐNG KÊ
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                }
                {
                    account.role == "admin" && (
                        <div className='menu-list-item' style={{background: '#5584AC'}}>
                            <Link to={ROUTE_ADMIN_OWNER}>
                                <div className={`menu-item company ${activePage === 'company' ? 'active' : ''}`}>
                                    <div className='menu-item__icon'>
                                        <IconCustomer/>
                                        <div className='menu-item__title'>
                                            CÔNG TY
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to={ROUTE_ADMIN_CUSTOMER}>
                                <div className={`menu-item list-customer ${activePage === 'list-customer' ? 'active' : ''}`} onClick={() => dispatch(resetTicket())}>
                                    <div className='menu-item__icon'>
                                        <IconCustomer/>
                                        <div className='menu-item__title'>
                                            KHÁCH HÀNG
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to={ROUTE_ADMIN_TYPE_PLACE}>
                                <div className={`menu-item typeplace ${activePage === 'typeplace' ? 'active' : ''}`}>
                                    <div className='menu-item__icon'>
                                        <img src={IconTypeplace} />
                                        <div className='menu-item__title'>
                                            DANH MỤC
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to={ROUTE_ADMIN_STATISTIC}>
                                <div className={`menu-item statistic ${activePage === 'statistic' ? 'active' : ''}`}>
                                    <div className='menu-item__icon'>
                                        <IconStatistic/>
                                        <div className='menu-item__title'>
                                            THỐNG KÊ
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                }
                    <div className='menu-item account'>
                        <div className='menu-item__icon' onClick={handleOpenUserMenu} style={{cursor: 'pointer'}}>
                            <img src={account?.photoUrl} style={{borderRadius:'50%', width:'50px'}}/>
                            <div className='menu-item__title' style={{fontSize:'14px', width:'68px', maxWidth:'68px'}}>
                                {account?.givenName}
                            </div>
                            <Menu
                                sx={{ mt: '-35px' }}
                                id="menu-profile"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {["Tài khoản"].map((setting, index) => (
                                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                                <MenuItem onClick={() => {
                                    dispatch(logoutGoogle())
                                    navigate('/')
                                }}><Typography textAlign="center">Đăng xuất</Typography></MenuItem>
                            </Menu>
                        </div>
                        <Menu
                            sx={{ mt: '-35px' }}
                            id="menu-profile"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem>
                                <Typography textAlign="center" color="blue">{getUser.apply().givenName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                dispatch(logoutGoogle())
                                navigate('/')
                            }}><Typography textAlign="center">Đăng xuất</Typography></MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        // </div>
    );
}

export default SideBar;