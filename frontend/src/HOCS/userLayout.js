import Footer from 'containers/Footer';
import React from 'react';
import Header from '../containers/Header'

const userLayout = ({
    Component,
}) => {
    return (
        <div className='layout-user-app'>
            <Header/>
            <div className='component'>
                <Component/>
            </div>
            <Footer/>
        </div>
    );
}

export default userLayout;