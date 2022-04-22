import React, { useState } from 'react';
import SideBar from '../components/SideBar';

const WidthLayout = ({
    Component,
    showHeader = true,
    name,
    showHeaderSearch = true
}) => {
    const [keySearch, setKeySearch] = useState('')
    return (
        <div className='App'>
            <SideBar/>
            <div className='component'>
                {
                    showHeader && (
                        <div>COMMON HEADER
                            <CommonHeder
                                keySearch = {keySearch}
                                setKeySearch = {setKeySearch}
                                name = {name}
                                isSearch = {showHeaderSearch}
                            />
                        </div> //bo sung
                    )
                }
                <Component
                    Component = {Component}
                    showHeader = {showHeader}
                    name = {name}
                    showHeaderSearch = {showHeaderSearch}
                    keySearch = {keySearch}
                    setKeySearch = {setKeySearch}
            />
            </div>
        </div>
    );
}

export default WidthLayout;