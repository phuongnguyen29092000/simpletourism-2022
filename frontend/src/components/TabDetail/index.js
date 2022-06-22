import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import PersonIcon from '@mui/icons-material/Person';
import FeedbackForm from 'components/Form/FeedbackForm';
import { getUser } from 'hooks/localAuth';
import DeleteIcon from 'assets/icons/delete-icon.svg'
import { useDispatch } from 'react-redux';
import { deleteFeedback } from 'redux/reducers/feedback/action';
import ConfirmModal from 'components/modal/ConfirmModal/ConfirmModal';
import { useState } from 'react';
import moment from 'moment';
// import FeedbackForm from  '../Forms/FeedbackForm'
const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75"
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47"
    }
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography variant="body1" component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Detail = ({ detail }) => {
    return (
        <div className='detail-tab' style={{ padding: '0 30px' }}>
            <h5 style={{ margin: '0', textAlign: 'left' }}>LỘ TRÌNH</h5>
            <Typography gutterBottom variant="body1" component="div" align='left'>
                {detail}
            </Typography>
        </div>
    );
}

const Feedback = ({ list, handleSendFeedback }) => {
    const dispatch = useDispatch()
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [fbDelete, setFbDelete] = useState(null)
    return (
        <div className='feedback-tab' style={{ padding: '0 30px' }}>
            {list.length === 0 ? <h2>HÃY LÀ NGƯỜI ĐẦU TIÊN ĐÁNH GIÁ!</h2> :
                list?.map((fb, index) => (
                    <Box key={index} style={{ marginBottom: '10px', padding: '10px',backgroundColor: '#f0ffffbd', borderRadius:'5px' }}>
                        <Typography gutterBottom variant="body1" component="div" align='left' style={{ margin: '0 0px', display: 'flex', color: '#106e99', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ display: 'flex', alignItems: 'center' }}>
                                <PersonIcon color='inherit' fontSize='large' />
                                <span style={{ marginLeft: '5px', fontSize:'16x' }}>{fb.customer.email}</span>
                            </span>
                            <span style={{display:'flex', alignItems:'center'}}>
                                {
                                    getUser()?.email === fb.customer.email && 
                                    <img width={20} style={{cursor:'pointer'}} src={DeleteIcon} alt="delete" onClick={() =>{
                                        setOpenConfirmModal(true)
                                        setFbDelete(fb._id)
                                    }}
                                    />
                                }
                            </span>
                        </Typography>
                        <div style={{fontSize:'13px', color:'black', textAlign:'left', marginLeft:'40px'}}>{moment(fb.updatedAt).format('LTS DD/MM/YYYY')}</div>
                        <Typography gutterBottom component="div" variant="body1" color="blueviolet" align="left" style={{ margin: '0 30px' }}>
                            <Rating
                                sx={{marginLeft:'5px'}}
                                name="customized-rating"
                                defaultValue={fb.rating}
                                max={5}
                                precision={0.1}
                                readOnly
                                size="small"
                            />
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div" align='left' style={{ margin: '0 40px', color: 'black' }}>
                            {fb.comment}
                        </Typography>
                        <Divider sx={{ marginTop: '10px' }} />
                    </Box>
                ))
            }
            <Box style={{ border: '2px solid orange', boxSizing: 'border-box', padding: '20px' }}>
                {getUser() ? <FeedbackForm handleSendFeedback={handleSendFeedback} /> :
                    <h3>ĐĂNG NHẬP ĐỂ ĐÁNH GIÁ!</h3>
                }
            </Box>
            <ConfirmModal
                openConfirmModal={openConfirmModal} 
                setOpenConfirmModal={setOpenConfirmModal} 
                handleAction={() => {
                    dispatch(deleteFeedback(fbDelete))
                    setOpenConfirmModal(false)
                }} 
                title="" 
                content="Bạn có muốn xóa đánh giá?" 
            />
        </div>
    );
}

export default function TabDetail({ detail, feedback, onHandleSendFeedback }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSendFeedback = (data) => {
        onHandleSendFeedback(data);
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="tab-detail">
                    <Tab label="CHI TIẾT" />
                    <Tab label="ĐÁNH GIÁ" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Detail detail={detail} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Feedback list={feedback} handleSendFeedback={handleSendFeedback} />
            </TabPanel>
        </Box>
    );
}
