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
            <Typography gutterBottom variant="body1" component="div" align='left' style={{fontFamily:'Roboto Mono'}}>
                {detail}
            </Typography>
        </div>
    );
}

const Feedback = ({list, handleSendFeedback}) => {
    console.log({list});
    return (
        <div className='feedback-tab' style={{ padding: '0 30px' }}>
            {   list.length === 0 ? <h2>HÃY LÀ NGƯỜI ĐẦU TIÊN ĐÁNH GIÁ!</h2>:
                list?.map((fb, index) => (
                    <Box key={index} style={{ marginBottom:'10px',padding:'10px'}}>
                        <Typography gutterBottom variant="body1" component="div" align='left' style={{margin:'0 0px', display:'flex', fontSize:'larger', color:'#106e99'}}>
                           <PersonIcon color='inherit' fontSize='large'/> {fb.email}
                        </Typography>
                        <Typography gutterBottom component="div" variant="body1" color="blueviolet" align="left" style={{margin:'0 30px'}}>
                            <StyledRating
                                name="customized-color"
                                defaultValue={fb.rating}
                                getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                precision={0.1}
                                icon={<FavoriteIcon fontSize="inherit" style={{color:'red'}}/>}
                                emptyIcon={<FavoriteBorderIcon fontSize="inherit" style={{color:'red'}}/>}
                                readOnly
                                size="small"
                            />
                        </Typography>
                        <Typography gutterBottom variant="body1" component="div" align='left' style={{margin:'0 30px', color:'gray'}}>
                            {fb.comment}
                        </Typography>
                        <Divider sx={{marginTop:'10px'}}/>
                    </Box>
                ))
            }
        <Box style={{border:'2px solid orange',boxSizing:'border-box', padding:'20px'}}>
            <FeedbackForm handleSendFeedback={handleSendFeedback}/>
        </Box>
        </div>
    );
}

export default function TabDetail({ detail, feedback, onHandleSendFeedback }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSendFeedback = (data)=>{
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
                <Feedback list={feedback} handleSendFeedback={handleSendFeedback}/>
            </TabPanel>
        </Box>
    );
}
