import React from 'react';
import {GoogleLogin} from 'react-google-login'
import AuthAPI from '../../api/AuthAPI';

const LoginWithGoogle = () => {
    const handleLoginSuccess = (res) => {
        let info = {
            googleId: res.googleId,
            email: res.profileObj.email,
            familyName: res.profileObj.familyName,
            givenName: res.profileObj.givenName,
            photoUrl:  res.profileObj.imageUrl,
            accessToken: res.accessToken,
            id_token: res.tokenId
        }
        // console.log(info);
        AuthAPI.loginWithGoogle(info)
    }
    const handleLoginFailure = (res) => {
        console.log(res)
    }
    return (
        <div className='login-with-google'>
            <GoogleLogin
                clientId='518561649263-dus6m9u26oe7qeu5r3itp9iinn741g6l.apps.googleusercontent.com'
                buttonText='Login with google'
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginFailure}
                cookiePolicy={"single_host_origin"}   
            >
            </GoogleLogin>
        </div>
    );
};

export default LoginWithGoogle;