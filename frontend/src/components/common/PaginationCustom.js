import React from 'react';
import { Grid, Pagination, Stack } from '@mui/material';
const PaginationCustom = ({total, limit, page, onChange}) => {
    return (
        <Grid item xs={12}>
            <Stack spacing={2} sx={{ marginTop: '40px' }}>
                <Pagination count={Math.ceil(total / limit)} page={page} onChange={onChange} sx={{ display: 'flex', justifyContent: 'center' }} />
            </Stack>
        </Grid>
    );
};

export default PaginationCustom;