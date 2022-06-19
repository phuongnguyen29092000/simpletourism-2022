import React, {useState} from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import useNotification from 'hooks/notification';
import TicketAPI from 'api/TicketAPI';
import { getUser } from 'hooks/localAuth';
import moment from 'moment';
import TourCardMini from 'components/Cards/TourCardMini';
import ConvertToImageURL from 'LogicResolve/ConvertToImageURL';
import RegardPrice from 'LogicResolve/RegardPrice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import PaymentModal from 'components/modal/PaymentModal';

export default function HistoryList({onClose}) {
    const [histories, setHistories] = React.useState([])
    const navigate = useNavigate()
    const [showPayment, setShowPayment] = useState(false)
    const [dataPayment, setDataPayment] = useState(false)
    React.useEffect(() => {
        TicketAPI.getHistoryTicket(getUser()._id)
            .then(rs => {
                if (rs.status === 200) {
                    setHistories(rs.data.tickets)
                }
                else {
                    useNotification.Error("Lỗi!", "Server Error!")
                }
            })
    }, [])

    return (
        <div style={{width: '493px', overflowX:'hidden'}}>
            <h3 style={{ padding: '20px', textAlign: 'center' }}>TOUR CỦA BẠN</h3>
            {histories?.length > 0 ?
                <Timeline position="right">
                    {
                        histories.map((item, index) => (
                            <TimelineItem key={index}>
                                <TimelineOppositeContent sx={{maxWidth:'130px', color:'#cc2f2f'}}>
                                    {moment(item?.createdAt).format('YYYY-MM-DD LTS')}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ color: 'gray', fontSize:'14px', marginBottom:'20px' }}>
                                    <Box  onClick={() => navigate(`/tour-chi-tiet/${item.idTour}`)}>
                                        <TourCardMini
                                            name={item.tourName}
                                            img={ConvertToImageURL(item.imageAvatar)}
                                            rating={item.ratingsAverage}
                                            _id={item._id}
                                        />
                                    </Box>
                                    <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                        <div>
                                            <div>Số lượng: {item.numberPeople}</div>
                                            <div>Tổng tiền: ₫{RegardPrice(item.numberPeople * item.paymentPrice)}</div>
                                        </div>
                                        {
                                            item.status == 0 ?
                                                <Button 
                                                    sx={{fontSize:'16px', fontSize: '12px', padding: '0 5px', height: '30px'}} 
                                                    variant='contained' 
                                                    color='success'
                                                    onClick={() => {
                                                        setDataPayment({
                                                            idTicket: item._id,
                                                            cost: item.paymentPrice*item.numberPeople,
                                                            tourName: item.tourName
                                                        })
                                                        setShowPayment(true)
                                                    }}
                                                >
                                                    Thanh toán
                                                </Button>
                                                : <Button sx={{
                                                        fontSize:'16px',
                                                        fontSize: '12px',
                                                        padding: '0 5px',
                                                        height: '30px',
                                                    }}
                                                    style={{
                                                        backgroundColor:'#0044ff9e',
                                                        color:'#fff'
                                                    }}
                                                    variant="contained"
                                                    disabled
                                                    >
                                                    Đã thanh toán
                                                </Button>

                                        }
                                    </Box>
                                </TimelineContent>
                            </TimelineItem>
                        ))
                    }
                </Timeline>
                : <h5>BẠN CHƯA ĐẶT TOUR NÀO :D</h5>
            }
            {
                dataPayment && <PaymentModal open={showPayment} handleClose={()=>setShowPayment(false)} infoPayment={dataPayment} onClose={onClose}/>
            }
        </div>
    );
}