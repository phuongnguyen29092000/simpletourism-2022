import { SearchOutlined } from '@mui/icons-material/SearchOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Drawer, Menu, MenuList, Paper, TextField, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_TOUR_DOMESTIC, ROUTE_TOUR_INTERNATIONAL } from '../../route/type'
import logo from '../../public/icon-logo.png';
import LoginWithGoogle from 'components/Login/LoginWithGoogle';
// import LogoutGoogle from 'components/Login/LogoutGoogle';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logoutGoogle } from 'redux/reducers/user/action';
import SearchBox from 'containers/SearchBox';
import TicketAPI from 'api/TicketAPI';
import { getUser } from 'hooks/localAuth';
import HistoryList from 'containers/HistoryList';

const pagesUser = [{
    title: 'TRANG CHỦ',
    path: '/'
}, {
    title: 'MIỀN BẮC',
    path: '/mien-bac'
}, {
    title: 'MIỀN TRUNG',
    path: '/mien-trung'
}, {
    title: 'MIỀN NAM',
    path: '/mien-nam'
},
{
    title: 'TIN TỨC',
    path: '/tin-tuc'
}];

let menuList = [{
    title: 'QUẢN LÍ TOUR',
    path: '/admin'
}];

const useStyles = makeStyles({
    root: {
        overflow: 'visible',
        transition: '0.4s'
    },
    activeTab: {
        color: 'orange'
    },
    item: {
        "&:hover": {
            color: 'orange !important',
        },
    },
    hiddenBox: {
        height: '0 !important',
        padding: '0 !important',
    },
    hiddenSideBar: {
        width: '0 !important',
    },
});
const paperStyle = {
    width: 250,
    maxWidth: '100%',
    position: 'absolute',
    top: '0',
    left: '-24px',
    backgroundColor: '#262929',
    transition: '0.4s',
    overflow: 'hidden',
    height: '100vh',
    borderRadius: '0',
    zIndex: 1000,
};
// highlight menu active
const getCurrentUrl = (url) => {
    const index_1 = url.indexOf("/", 8);
    let index_2 = url.indexOf("/", index_1 + 1);
    if (index_2 === -1) index_2 = url.indexOf("?", index_1 + 1);
    if (index_2 === -1) return url.slice(index_1);
    return url.slice(index_1, index_2);
}

const Header = () => {
    const classes = useStyles();
    const { search } = useLocation();
    // const navigate = useNavigate();
    const dispatch = useDispatch()
    const {account} = useSelector((store) => store.user)
    console.log(account)
    const [openSideBar, setOpenSideBar] = React.useState(false);
    const [openDrawerSearch, setOpenDrawerSearch] = React.useState(false);
    const [openDrawerHistory, setOpenDrawerHistory] = React.useState(false);
    const [searchBox, setSearchBox] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [nav, setNav] = React.useState({
        height: '90px',
    });
    menuList = [...pagesUser];

    let url = window.location.href;

    React.useEffect(() => {
        setOpenDrawerSearch(false)
        setOpenDrawerHistory(false)
    },[url])

    const handleOpenSearchField = () => {
        setSearchBox((searchBox) => !searchBox);
        document.getElementById('search-field').focus()
    };
    const handleClickCloseSearch = () => {
        setSearchBox(false);
    };
    const handleOpenSideBar = () => {
        setOpenSideBar(!openSideBar)
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="fixed" className={classes.root} style={{ minHeight: '50px', height: '50px', backgroundColor: 'rgb(0 0 0 / 26%)', paddingRight: '0 !important' }}>
            <Container maxWidth="xl" sx={{ display: 'flex' }}>
                <Box sx={{ height: '50px', justifyContent: 'center', minHeight: '50px', marginLeft: 'auto' }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', minHeight: '50px' }}>
                        <Link style={{ textDecoration: 'none' }} to='/'>
                            <Button
                                className={classes.item}
                                sx={{ color: '#fff', display: 'block', px: 1, mx: 1 }}
                            >
                                <span className='link-tab'>
                                    TRANG CHỦ
                                </span>
                            </Button>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={ROUTE_TOUR_DOMESTIC}>
                            <Button
                                className={classes.item}
                                sx={{ color: '#fff', display: 'block', px: 1, mx: 1 }}
                            >
                                <span className='link-tab'>
                                    TRONG NƯỚC
                                </span>
                            </Button>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to={ROUTE_TOUR_INTERNATIONAL}>
                            <Button
                                className={classes.item}
                                sx={{ color: '#fff', display: 'block', px: 1, mx: 1 }}
                            >
                                <span className='link-tab'>
                                    QUỐC TẾ
                                </span>
                            </Button>
                        </Link>
                        <Box >
                            <img src={logo} height={40} style={{ padding: '7px', borderRadius: '5px' }} />
                        </Box>
                        <Link style={{ textDecoration: 'none' }} to='/news'>
                            <Button
                                className={classes.item}
                                sx={{ color: '#fff', display: 'block', px: 1, mx: 1 }}
                            >
                                <span className='link-tab'>
                                    TIN TỨC
                                </span>
                            </Button>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to='/contact'>
                            <Button
                                className={classes.item}
                                sx={{ color: '#fff', display: 'block', px: 1, mx: 1 }}
                            >
                                <span className='link-tab'>
                                    LIÊN HỆ
                                </span>
                            </Button>
                        </Link>
                        <Button
                            className={classes.item}
                            sx={{ color: '#fff', display: 'block', px: 1, mx: 1 }}
                            onClick={() => setOpenDrawerSearch(true)}
                        >
                            <span className='link-tab'>
                                Tìm kiếm
                            </span>
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenSideBar}
                            color="inherit"
                        >
                            <MenuIcon style={{ color: 'black' }} />
                        </IconButton>
                        <Paper
                            sx={paperStyle}
                            className={!openSideBar ? classes.hiddenSideBar : ''}
                        >
                            <MenuList>
                                {menuList.map((page, index) => (
                                    // <Link style={{ textDecoration: 'none' }} to={page.path} key={index}>
                                    <MenuItem key={index} onClick={handleOpenSideBar}>
                                        <Typography textAlign="center" color="gray" component="div">{page.title}</Typography>
                                    </MenuItem>
                                    // </Link>
                                ))}
                            </MenuList>
                        </Paper>
                    </Box>
                </Box>
                {Object.keys(account).length == 0 ? 
                <Box className='login-wrapper' sx={{ marginLeft: 'auto', minWidth: '30px' }}>
                    <LoginWithGoogle />
                    <LoginIcon className='login-icon' fontSize='large' />
                </Box>
                :
                <Box className='profile-wrapper' sx={{ marginLeft: 'auto', minWidth: '30px', display: 'flex', alignItems: 'center' }}>
                    <Tooltip title={account?.givenName}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="avatar" src={account.photoUrl}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
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
                        <MenuItem onClick={() =>{
                            setOpenDrawerHistory(true)
                            handleCloseUserMenu()
                        }}>
                            <Typography textAlign="center">Tour của bạn</Typography>
                        </MenuItem>
                        <MenuItem onClick={() =>{
                            dispatch(logoutGoogle())
                            window.location.reload()
                        }}>
                            <Typography textAlign="center">Đăng xuất</Typography>
                        </MenuItem>
                    </Menu>
                </Box>}
            </Container>
            <Box
                component="div"
                sx={{
                    width: '100%',
                    height: '100vh',
                    position: 'absolute',
                    backgroundColor: '#00000078',
                    trasition: '0.1s',
                    zIndex: 10,
                    display: { xs: 'block', md: 'none' }
                }}
                className={!openSideBar ? classes.hiddenSideBar : ''}
                onClick={handleOpenSideBar}
            >
            </Box>
            <Drawer
                anchor='right'
                open={openDrawerSearch}
                onClose={()=>setOpenDrawerSearch(false)}
            >
                <SearchBox onClose={()=>setOpenDrawerSearch(false)}/>
            </Drawer>
            <Drawer
                anchor='right'
                open={openDrawerHistory}
                onClose={()=>setOpenDrawerHistory(false)}
                sx={{minWidth:'400px', width:'400px'}}
            >
                <HistoryList onClose={()=>setOpenDrawerHistory(false)}/>
            </Drawer>
        </AppBar>
    );
};
export default Header;