import React from 'react';
import {GoogleLogin} from 'react-google-login'

const LoginWithGoogle = () => {
    const handleLoginSuccess = (res) => {
        console.log(res)
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