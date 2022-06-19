import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BgContact from 'assets/icons/bg-contact.svg'
import CarouselInstroduce from 'components/Carousel/CarouselInstroduce';
import AdvantageCard from 'components/AdvantageCard';

const Contact = () => {
    return (
        <div className='contact-component'>
            {/* <CarouselInstroduce /> */}
            <Box className='contact-infor'>
                <Typography className='slogan' variant='h4' component='div'>
                    "Luôn luôn lắng nghe, luôn luôn thấu hiểu"
                </Typography>
                <div className='contact-infor__body'>
                    <div className='contact-infor__body--wrapper'>
                    <div className='infor-wrapper'>
                        <div className='icon-infor'><LocationOnIcon color='warning' /></div>
                        <div className='title-infor'>Đại học Bách Khoa Đà Nẵng</div>
                    </div>
                    <div className='infor-wrapper'>
                        <div className='icon-infor'><LocalPhoneIcon color='warning' /></div>
                        <div className='title-infor'>0909.999.999</div>
                    </div>
                    <div className='infor-wrapper'>
                        <div className='icon-infor'><MailOutlineIcon color='warning' /></div>
                        <div className='title-infor'>simple_tourism@gmail.com</div>
                    </div>
                    </div>
                    <div className='bg-image'>
                        <img src={BgContact} />
                    </div>
                </div>
            </Box>
            <AdvantageCard/>
            <Box className='map-location'>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12} alignItems="center">
                        <iframe width="100%" height="100%" style={{minHeight:'400px', borderRadius:'10px'}} id="gmap_canvas" src="https://maps.google.com/maps?q=%C4%90%E1%BA%A1i%20h%E1%BB%8Dc%20b%C3%A1ch%20khoa%20-%20%C4%91%E1%BA%A1i%20h%E1%BB%8Dc%20%C4%90%C3%A0%20N%E1%BA%B5ng&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography className='slogan1' variant='h5' component='div'>
                            "Vì có là một con đom đóm hay trở nên sáng như sao
                                Thì ta cũng có một thanh xuân đẹp trước khi ngày tháng hư hao..."
                        </Typography>
                    </Grid>
                </Grid> 
            </Box>
        </div>
    );
};

export default Contact;