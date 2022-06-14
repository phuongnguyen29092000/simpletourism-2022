// import { Timeline } from '@mui/icons-material';
// import { TimelineConnector, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
// import TimelineContent from '@mui/lab/TimelineContent';
// import React from 'react';

// const HistoryList = () => {
//     return (
//         <div className='history-component'>
//             <React.Fragment>
//                 <Timeline position="alternate">
//                     <TimelineItem>
//                         <TimelineOppositeContent color="text.secondary">
//                             09:30 am
//                         </TimelineOppositeContent>
//                         <TimelineSeparator>
//                             <TimelineDot />
//                             <TimelineConnector />
//                         </TimelineSeparator>
//                         <TimelineContent>Eat</TimelineContent>
//                     </TimelineItem>
//                     <TimelineItem>
//                         <TimelineOppositeContent color="text.secondary">
//                             10:00 am
//                         </TimelineOppositeContent>
//                         <TimelineSeparator>
//                             <TimelineDot />
//                             <TimelineConnector />
//                         </TimelineSeparator>
//                         <TimelineContent>Code</TimelineContent>
//                     </TimelineItem>
//                     <TimelineItem>
//                         <TimelineOppositeContent color="text.secondary">
//                             12:00 am
//                         </TimelineOppositeContent>
//                         <TimelineSeparator>
//                             <TimelineDot />
//                             <TimelineConnector />
//                         </TimelineSeparator>
//                         <TimelineContent>Sleep</TimelineContent>
//                     </TimelineItem>
//                     <TimelineItem>
//                         <TimelineOppositeContent color="text.secondary">
//                             9:00 am
//                         </TimelineOppositeContent>
//                         <TimelineSeparator>
//                             <TimelineDot />
//                             <TimelineConnector />
//                         </TimelineSeparator>
//                         <TimelineContent>Repeat</TimelineContent>
//                     </TimelineItem>
//                 </Timeline>
//             </React.Fragment>
//         </div>
//     );
// };

// export default HistoryList;

import * as React from 'react';
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

export default function HistoryList() {
    const [histories, setHistories] = React.useState([])
    const navigate = useNavigate()
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
        <React.Fragment>
            <h3 style={{ padding: '20px', textAlign: 'center', width: '100%' }}>TOUR CỦA BẠN</h3>
            {histories?.length > 0 ?
                <Timeline position="right">
                    {
                        histories.map((item, index) => (
                            <TimelineItem key={index}>
                                <TimelineOppositeContent color="text.secondary">
                                    {moment(item?.createdAt).format('YYYY-MM-DD LTS')}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent sx={{ color: 'gray' }} onClick={() => navigate(`/tour-chi-tiet/${item.idTour}`)}>
                                    <TourCardMini
                                        name={item.tourName}
                                        img={ConvertToImageURL(item.imageAvatar)}
                                        rating={item.ratingsAverage}
                                        _id={item._id}
                                    />
                                    <div>Số lượng: {item.numberPeople}</div>
                                    <div>Tổng tiền: {RegardPrice(item.numberPeople * item.paymentPrice)}</div>
                                </TimelineContent>
                            </TimelineItem>
                        ))
                    }
                </Timeline>
                : <h5>BẠN CHƯA ĐẶT TOUR NÀO :D</h5>
            }
        </React.Fragment>
    );
}
