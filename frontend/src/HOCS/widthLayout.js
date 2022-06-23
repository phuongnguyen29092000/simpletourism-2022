import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import CommonHeader from '../components/common/CommonHeader'

const WidthLayout = ({
    Component,
    showHeader = true,
    name,
    showHeaderSearch = true
}) => {
    const [keySearch, setKeySearch] = useState('')
    return (
        <div className='layout-app'>
            <SideBar/>
            <div className='component'>
                {
                    showHeader && (
                        <div>
                            <CommonHeader
                                keySearch = {keySearch}
                                setKeySearch = {setKeySearch}
                                name = {name}
                                isSearch = {showHeaderSearch}
                            />
                        </div>
                    )
                }
                <Component
                    Component = {Component}
                    showHeader = {showHeader}
                    name = {name}
                    showHeaderSearch = {showHeaderSearch}
                    keySearch = {keySearch}
            />
            </div>
        </div>
    );
}

export default WidthLayout;