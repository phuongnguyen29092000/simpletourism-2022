import React from 'react';
import {GoogleLogout} from 'react-google-login'
import AuthAPI from '../../api/AuthAPI';
// import { loginWithGoogle } from '../../ultis/authUtil'
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import {LogoutGoogle } from 'redux/reducers/user/action';

const LoginWithGoogle = () => {
    const dispatch = useDispatch()
    const handleLogOutSuccess = (res) => {
        // console.log(info);
        console.log("logout")
        dispatch(LogoutGoogle())
    }
    const handleLogOutFailure = (res) => {
        console.log(res)
    }

    return (
        <div className='login-with-google'>
            <GoogleLogout
                clientId='518561649263-dus6m9u26oe7qeu5r3itp9iinn741g6l.apps.googleusercontent.com'
                buttonText=''
                onSuccess={handleLogOutSuccess}
                onFailure={handleLogOutFailure}
                cookiePolicy={"single_host_origin"}
                // render={renderProps => (
                //     <input type='button' value="LOGOUT" onClick={renderProps.onClick} />)}
            >
            </GoogleLogout>
        </div>
    );
};

export default LoginWithGoogle;