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
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { setActiveUrl } from 'redux/reducers/activeUrl/action';
ChartJS.register(ArcElement, Tooltip, Legend);

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
    const [dataTable, setDataTable] = useState([]);
    const [dataChart, setDataChart] = useState({})

    useEffect(() => {
        document.title = 'Simple Tourism | Thống kê'
        dispatch(setActiveUrl('statistic'))
    },[])

    useEffect(() => {
        document.title = "SimpleTourism | Thống kê Admin";
        if(!Object.keys(statisticAdminPerMonth).length) dispatch(getStatisticAdminPerMonth(2022, Number(month)+ 1, (res)=>{
            setDataTable(res.tour)
            setDataChart(covertToDataChart(res))}))
        dispatch(getStatisticAdminPerYear(2022,(res)=> {
            setData(res)
            setTotalTicket(caculateTicket(res))
        })      
        )
    },[statisticAdminPerMonth])
    
    const [month, setMonth] = useState(new Date().getMonth());
    const [totalTicket, setTotalTicket] = useState(0)

    const handleChangeMonth = (e) => {
        setMonth(e.target.value)
        dispatch(getStatisticAdminPerMonth(2022, Number(e.target.value) + 1, (res)=> {
            setDataTable(res.tour)
            const rs = covertToDataChart(res)
            setDataChart(rs)
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
                    <div className='ticket-manager__listticket' style={{marginTop:'30px',padding:'10px 20px 0px 20px', borderTop:' 3px solid #858585'}}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                            <h4 style={{ margin:0, color: 'cornflowerblue'}}>BẢNG THỐNG KÊ CÔNG TY THEO:  </h4>
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
                        <table>
                            <thead>
                                <th className='th-2'>Ảnh đại diện</th>
                                <th className='th-2'>Tên công ty</th>
                                <th className='th-2'>Tên người đại diện</th>
                                <th className='th-2'>Email</th>
                                <th className='th-1'>Danh sách tour</th>
                                <th className='th-2'>Tổng vé đã bán</th>
                                <th className='th-2'>Số lượng người</th>
                                <th className='th-2'>Doanh thu (VND)</th>
                                {/* <th className='th-2'></th> */}
                            </thead>
                            <tbody>
                                {
                                   dataTable &&
                                   dataTable?.map((item, index) =>(
                                        <tr key={index} style={{borderBottom:'5px solid white'}}>
                                            <td className='td-2' style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
                                                <img style={{width:'70px', height:'70px'}}src={item?.infoCompany.photoUrl} alt=''/>
                                            </td>
                                            <td className='td-2'>{item?.infoCompany.companyName}</td>
                                            <td className='td-2'>{item?.infoCompany?.familyName}{' '}{item?.infoCompany?.givenName}</td>
                                            <td className='td-1'>{item?.infoCompany?.email}</td>
                                            <td className='td-3'>{item?.totalTours?.map((tour)=>(
                                                <div style={{margin:'3px 0px'}}>{tour}</div>
                                            ))}</td>
                                            <td className='td-2' style={{textAlign:'center'}}>{item?.totalTours.length}</td>
                                            <td className='td-2' style={{textAlign:'center'}}>{item?.totalTickets}</td>
                                            <td className='td-3' style={{textAlign:'right'}}>{item?.totalPrice.toLocaleString().split(',').join('.')} đ</td>
                                           
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <Box sx={{ maxWidth: '400px', margin: '0 auto' }}>
                        <h2 style={{ margin:'20px 0 0', color: 'cornflowerblue', padding: '10px 0' }}>BIỂU ĐỒ THEO SỐ LƯỢNG VÉ</h2>
                        <Doughnut data={{
                            maintainAspectRatio: true,
                            responsive: false,
                            labels: dataChart.label,
                            datasets: [
                                {
                                    data: dataChart.data,
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
                                legend: {
                                    display: true,
                                    position: 'right',
                                    labels: {
                                      fontColor: "#000080",
                                    }
                                  },
                                //   scales: {
                                //     yAxes: [{
                                //       ticks: {
                                //         beginAtZero: true
                                //       }
                                //     }]
                                //   }
                            }}
                        />
                    </Box>
                </div>
            }
            
            {/* <Statistic
                list={data}
            /> */}
        </div>
    );
}