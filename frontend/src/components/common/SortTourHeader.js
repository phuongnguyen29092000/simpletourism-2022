import { Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { SORT_OPTIONS } from 'Constants/sortTour';
import { SortTour } from 'LogicResolve/TourList';
import React, { useEffect } from 'react';

function SortTourHeader({ dataSort, setDataTours, title }) {
    const [sortOption, setSortOption] = React.useState(SORT_OPTIONS[0].value);

    const handleChange = (e) => {
        setSortOption(e.target.value)
        const dataTem = SortTour(dataSort, e.target.value)
        setDataTours(dataTem)
    }
    useEffect(() => {
        const dataTem = SortTour(dataSort, SORT_OPTIONS[0].value)
        setDataTours(dataTem)
    },[dataSort])
    return (
        <div className='header-sort-tour'>
            <Container maxWidth='xl'>
                <Grid xs={12} container sx={{ maxWidth: '100%' }} className='header-sort-tour__content'>
                    <Grid xs={12}
                        item
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                        className='header-sort-tour__content__grid'
                    >
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="sort-tour"></InputLabel>
                            <Select
                                id="sort-tour-select"
                                value={sortOption}
                                onChange={handleChange}
                                sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                            >
                                {
                                    SORT_OPTIONS.map((option, index) => (
                                        <MenuItem value={option.value}>{option.label}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <div className='header-sort-tour__title'>
                            <h3 className='title'>{title}</h3>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default SortTourHeader;