import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';

const CommonHeader = ({
    keySearch,
    setKeySearch,
    name,
    isSearch
}) => {
    const [searchValue, setSearchValue] = useState('')

    const handleChange = (value) => {
        setSearchValue(value)
    }
    return (
        <div className='common-header'>
            <div className='page-name'>
                <h1 >{name}</h1>
            </div>
            {
                isSearch && (
                    <div className='common-header__search-box'>
                        <FormControl style={{ width: '250px'}} variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                value={searchValue}
                                onChange={(e)=>handleChange(e.target.value)}
                                endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
                                aria-describedby="outlined-searh"
                                inputProps={{
                                    'aria-label': 'Search',
                                }}
                            />
                        </FormControl>
                    </div>
                )
            }
        </div>
    );
};

export default CommonHeader