import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatisticPerYear } from 'redux/reducers/statistic/action';
import { Grid } from '@mui/material';
import { setActiveUrl } from 'redux/reducers/activeUrl/action';
// import ConfirmDialog from '../Notification/ConfirmDialog';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function OwnerStatistic({ list }) {
    const dispatch = useDispatch()
    useEffect(() => {
        document.title = 'Simple Tourism | Thống kê'
        dispatch(setActiveUrl('statistic'))
    }, [])

    const { statisticPerYear } = useSelector(store => store.statistic)
    const [dataChart, setDataChart] = useState({
        dataRevenue: {},
        dataTicketCustomer: {}
    })

    useEffect(() => {
        const month = new Date().getMonth() + 1
        if (!Object.keys(statisticPerYear).length) dispatch(getStatisticPerYear({ year: 2022 }))
        console.log({ statisticPerYear });
        if (statisticPerYear.length) {
            const _label = []
            const _data1 = []
            const _data2 = []
            const _data3 = []
            statisticPerYear.forEach(data => {
                if (data.month <= month) {
                    _label.push(`Tháng ${data.month}`)
                    _data1.push(data.numberPeople)
                    _data2.push(data.numberTicket)
                    _data3.push(data.totalPayment)
                }
            });
            const dataTicketCustomer = {
                labels: _label,
                datasets: [
                    {
                        label: 'Tổng số khách hàng',
                        data: _data1,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    },
                    {
                        label: 'Tổng số vé',
                        data: _data2,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                ],
            };
            const dataRevenue = {
                labels: _label,
                datasets: [
                    {
                        label: 'Tổng doanh thu',
                        data: _data3,
                        backgroundColor: 'rgba(100, 99, 132, 0.5)',
                    },
                ],
            };
            setDataChart({ dataTicketCustomer, dataRevenue })
        }
    }, [statisticPerYear])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'BIẾN ĐỘNG SỐ LƯỢNG KHÁCH VÀ SỐ LƯỢNG VÉ',
            },
        },
    }
    const options2 = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'TỔNG DOANH THU THEO TỪNG THÁNG',
            },
        },
    };

    return (
        <div className='list-manager' style={{ padding: '0 50px' }} >
            {
                Object.keys(dataChart.dataTicketCustomer).length > 0 && <Bar options={options} data={dataChart.dataTicketCustomer} />
            }
            {
                Object.keys(dataChart.dataRevenue).length > 0 && <Bar options={options2} data={dataChart.dataRevenue} />
            }

        </div >
    );
}


