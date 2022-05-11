import { SearchOutlined } from '@mui/icons-material/SearchOutlined';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import LoginIcon from '@mui/icons-material/Login';
// import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuList, Paper, TextField } from '@mui/material';
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
// import axios from 'axios';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import APIClient from '../../APIs/APIClient';
// import { actions, useStore } from '../../store';
import logo from '../../public/logoTest.png';

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
    // const navigate = useNavigate();
    const [openSideBar, setOpenSideBar] = React.useState(false);
    const [searchBox, setSearchBox] = React.useState(false);
    const [nav, setNav] = React.useState({
        height: '90px',
        color: 'transparent'
    });
    menuList = [...pagesUser];

    let url = window.location.href;

    React.useEffect(() => {
        const setNavigation = () => {
            if (window.pageYOffset > 100) {
                setNav({
                    height: '70px',
                    color: 'white'
                });
            }
            if (window.pageYOffset <= 100) {
                setNav({
                    height: '90px',
                    color: 'transparent'
                });
            }
        }
        window.addEventListener("scroll", setNavigation)
        return () => {
            window.removeEventListener("scroll", setNavigation);
        }
    }, []);

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
    const search = (e) => {
    }

    return (
        <AppBar position="fixed" className={classes.root} style={{ height: `${nav.height}`, backgroundColor: `${nav.color}` }}>
            <Container maxWidth="xl">
                <Toolbar sx={{ height: `${nav.height}` }}>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* <Link style={{ textDecoration: 'none' }} to='/'> */}
                            <img src={logo} height={nav.height} />
                        {/* </Link> */}
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', minHeight: '60px' }}>
                            <Link style={{ textDecoration: 'none' }} to='/'>
                                <Button
                                    className={classes.item}
                                    sx={{ color: 'darkslateblue', display: 'block', px: 1, mx: 1, fontFamily: "cursive", fontWeight: 'bold' }}
                                >
                                    <span className= 'link-tab'>
                                        TRANG CHỦ
                                    </span>
                                </Button>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to='/news'>
                                <Button
                                    className={classes.item}
                                    sx={{ color: 'darkslateblue', display: 'block', px: 1, mx: 1, fontFamily: "cursive", fontWeight: 'bold' }}
                                >
                                    <span className= 'link-tab'>
                                        TIN TỨC
                                    </span>
                                </Button>
                            </Link>
                            <Link style={{ textDecoration: 'none' }} to='/contact'>
                                <Button
                                    className={classes.item}
                                    sx={{ color: 'darkslateblue', display: 'block', px: 1, mx: 1, fontFamily: "cursive", fontWeight: 'bold' }}
                                >
                                    <span className= 'link-tab'>
                                        LIÊN HỆ
                                    </span>
                                </Button>
                            </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
                        {/* <Link style={{ textDecoration: 'none' }} to='/'> */}
                            <img src={logo} height={nav.height} />
                        {/* </Link> */}
                    </Box>
                    <ClickAwayListener onClickAway={handleClickCloseSearch}>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end', position: 'relative', width: '50px' }}>
                            <TextField
                                id='search-field'
                                component="div"
                                onKeyDown={search}
                                variant="standard"
                                placeholder='Tìm kiếm...'
                                className={!searchBox ? classes.hiddenBox : ''}
                                style={{
                                    padding: '5px',
                                    height: '35px',
                                    width: '200px',
                                    transition: '0.4s',
                                    position: 'absolute',
                                    top: '65px',
                                    backgroundColor: 'white',
                                    borderRadius: '3px',
                                    overflow: 'hidden',
                                }}

                            />
                        </Box>
                    </ClickAwayListener>
                </Toolbar>
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
        </AppBar>
    );
};
export default Header;