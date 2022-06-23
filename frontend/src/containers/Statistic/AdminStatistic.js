import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getStatisticAdminPerMonth, getStatisticAdminPerYear } from 'redux/reducers/statistic/action';
import { FormControl, Grid, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Doughnut } from 'react-chartjs-2';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement);

const months = [
    {
        value: '1', label: 'Tháng 1'
    },
    {
        value: '2', label: 'Tháng 2'
    },
    {
        value: '3', label: 'Tháng 3'
    },
    {
        value: '4', label: 'Tháng 4'
    },
    {
        value: '5', label: 'Tháng 5'
    },
    {
        value: '6', label: 'Tháng 6'
    },
    {
        value: '7', label: 'Tháng 7'
    },
    {
        value: '8', label: 'Tháng 8'
    },
    {
        value: '9', label: 'Tháng 9'
    },
    {
        value: '10', label: 'Tháng 10'
    },
    {
        value: '11', label: 'Tháng 11'
    },
    {
        value: '12', label: 'Tháng 12'
    },
]

const styleCard = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eceff1',
    borderRadius: '5px',
    padding: '20px'
}

const styleTitle = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'start',
}

export default function AdminStatistic({list}) {
    const dispatch = useDispatch()
    const { statisticAdminPerMonth, loading, statisticAdminPerYear } = useSelector((store) => store.statistic)
    const [data, setData] = useState({});
    const [dataTable, setDataTable] = useState({});
    const [dataChart, setDataChart] = useState({})


    useEffect(() => {
        document.title = "SimpleTourism | Thống kê Admin";
        if(!Object.keys(statisticAdminPerMonth).length) dispatch(getStatisticAdminPerMonth(2022, 6))
        dispatch(getStatisticAdminPerYear(2022,(res)=> {
            setData(res)
            setTotalTicket(caculateTicket(res))
        })      
        )
    },[statisticAdminPerMonth, statisticAdminPerMonth])
    
    const [month, setMonth] = useState(new Date().getMonth());
    const [totalTicket, setTotalTicket] = useState(0)

    const handleChangeMonth = (e) => {
        setMonth(e.target.value)
        console.log(typeof e.target.value);
        dispatch(getStatisticAdminPerMonth(2022, Number(e.target.value) + 1, (res)=> {
            setDataTable(res)
            const rs = covertToDataChart(res)
            setDataChart(rs)
            console.log('xxxx',dataChart);
        }))
    }

    const caculateTicket = (arr) => {
        const totalTicket = arr.tour.reduce( (a, b) =>{
            return a + Number(b?.totalTickets);
        }, 0)
        return totalTicket
    }

    const covertToDataChart = (arr) =>{
        let data = arr.tour.map(item => item?.totalTickets)
        let label = arr.tour.map(item => item?.infoCompany.companyName)
        return { data : data, label: label}
    } 

    return (
        <div className='manage-statistic-wrapper'>
            {Object.keys(data) &&
                <div>
                    <Box sx={{ margin: '0 10px' }}>
                        <h2 style={{ margin: 0, color: 'cornflowerblue', padding: '10px 0' }}>THỐNG KÊ TRONG NĂM 2022  </h2>
                        <Grid container>
                            <Grid item sm={4} xs={12} style={{ padding: '10px' }}>
                                <div style={styleCard}>
                                    <div style={styleTitle}>
                                        <Typography variant='h4' component="div">{data.owners}</Typography>
                                        <Typography variant='h6' component="div">Công ty</Typography>
                                    </div>
                                    <HandshakeIcon fontSize='large' />
                                </div>
                            </Grid>
                            <Grid item sm={4} xs={12} style={{ padding: '10px' }}>
                                <div style={styleCard}>
                                    <div style={styleTitle}>
                                        <Typography variant='h4' component="body1">{data.customers}</Typography>
                                        <Typography variant='h6' component="body1">Khách hàng</Typography>
                                    </div>
                                    <AccessibilityNewIcon fontSize='large' />
                                </div>

                            </Grid>
                            <Grid item sm={4} xs={12} style={{ padding: '10px' }}>
                                <div style={styleCard}>
                                    <div style={styleTitle}>
                                        <Typography variant='h4' component="div">{totalTicket}</Typography>
                                        <Typography variant='h6' component="body1">Vé</Typography>
                                    </div>
                                    <AirplaneTicketIcon fontSize='large' />
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ maxWidth: '400px', margin: '0 auto' }}>
                        <h2 style={{ margin:'20px 0 0', color: 'cornflowerblue', padding: '10px 0' }}>BIỂU ĐỒ DOANH THU CÔNG TY:  </h2>
                        <Doughnut data={{
                            maintainAspectRatio: true,
                            responsive: false,
                            labels: ["Miền bắc", "Miền trung", "Miền Nam"],
                            datasets: [
                                {
                                    data: [1,2, 3],
                                    backgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(54, 162, 235)',
                                        'rgb(255, 205, 86)'
                                    ],
                                    hoverBackgroundColor: [
                                        'rgb(255, 99, 132)',
                                        'rgb(54, 162, 235)',
                                        'rgb(255, 205, 86)'
                                    ],
                                }
                            ],
                            borderWidth: 1,
                        }}
                            options={{
                                plugins: {
                                    legend: {
                                        position: 'right'
                                    },
                                },
                            }}
                        />
                    </Box>
                </div>
            }
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                <h4 style={{ margin:0, color: 'cornflowerblue'}}>BẢNG THỐNG KÊ DOANH THU THEO:  </h4>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ marginRight: '30px' }}>
                        <FormControl>
                            <Select
                                labelId="select-month-label"
                                id="demo-simple-select"
                                value={month}
                                label="Month"
                                onChange={handleChangeMonth}
                                style={{ width: '120px', fontSize: '13px', color: 'cornflowerblue', fontFamily: 'Roboto Mono' }}
                            >
                                {
                                    months.map((m, index) => (
                                        <MenuItem key={index} value={`${index}`}>{m.label.toLocaleUpperCase()}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                </Box>
            </div>
            {/* <Statistic
                list={data}
            /> */}
        </div>
    );
}