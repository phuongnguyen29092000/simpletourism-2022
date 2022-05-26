import { SearchOutlined } from '@mui/icons-material/SearchOutlined';
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
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE_TOUR_DOMESTIC, ROUTE_TOUR_INTERNATIONAL } from '../../route/type'
import logo from '../../public/icon-logo.png';

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
    });
    menuList = [...pagesUser];

    let url = window.location.href;

    // React.useEffect(() => {
    //     const setNavigation = () => {
    //         if (window.pageYOffset > 100) {
    //             setNav({
    //                 height: '50px',
    //             });
    //         }
    //         if (window.pageYOffset <= 100) {
    //             setNav({
    //                 height: '50px',
    //             });
    //         }
    //     }
    //     window.addEventListener("scroll", setNavigation)
    //     return () => {
    //         window.removeEventListener("scroll", setNavigation);
    //     }
    // }, []);

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
        <AppBar position="fixed" className={classes.root} style={{minHeight: '50px' , height: '50px', backgroundColor: 'rgb(0 0 0 / 26%)' }}>
            <Container maxWidth="xl">
                <Box sx={{ height: '50px', justifyContent: 'center', minHeight: '50px' }}>
                    <Box sx={{display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', minHeight: '50px'}}>
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
                        <Link style={{ textDecoration: 'none' }} to='/'>
                            <Button
                                className={classes.item}
                                sx={{ color: '#fff', display: 'block', px: 1, mx: 1 }}
                            >
                                <span className='link-tab'>
                                    Tìm kiếm
                                </span>
                            </Button>
                        </Link>
                    </Box>
                    <Box sx={{display: { xs: 'flex', md: 'none' } }}>
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