import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getStatisticPerMonth, getStatisticPerYear } from 'redux/reducers/statistic/action';
import { Grid } from '@mui/material';
// import ConfirmDialog from '../Notification/ConfirmDialog';

export default function OwnerStatistic({list}) {
    const dispatch = useDispatch()
    // const [dataStatistic, setDataStatistic] = useState(list.data);
    // const [totalPrice, setTotalPrice] = useState(list.totalPrice);
    const { statisticPerMonth, loading, statisticPerYear } = useSelector((store) => store.statistic)
    // useEffect(async () => {
        // setDataStatistic(list.data);
        // setTotalPrice(list.totalPrice);
    // }, [list])
    useEffect(() => {
        if(!Object.keys(statisticPerMonth).length) dispatch(getStatisticPerMonth({year: 2022, month: 5}))
        if(!Object.keys(statisticPerYear).length) dispatch(getStatisticPerYear({year: 2022}))
    },[statisticPerMonth, statisticPerYear])
    
    return (
        <div className='list-manager' style={{ padding: '0 50px' }}>
            <Grid>

            </Grid>
        </div>
    );
}