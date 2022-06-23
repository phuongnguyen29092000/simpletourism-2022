import SearchIcon from '@mui/icons-material/Search';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';

const CommonHeader = ({
    keySearch,
    setKeySearch,
    name,
    isSearch
}) => {
    const [searchValue, setSearchValue] = useState('')

    const onChange =  useCallback(debounce((value) => {
        setKeySearch(value)
    },500),)
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
                                onChange={(e)=>{ 
                                    setSearchValue(e.target.value)
                                    onChange(e.target.value)
                                }}
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