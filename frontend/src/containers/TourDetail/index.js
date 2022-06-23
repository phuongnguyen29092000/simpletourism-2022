import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Rating from "@mui/material/Rating";
import { styled } from "@mui/material/styles";
import ConvertToImageURL from '../../LogicResolve/ConvertToImageURL'
import { getTourById } from '../../redux/reducers/listTour/action';
import { createFeedback, getFeedbackForTour } from '../../redux/reducers/feedback/action';
import { makeStyles } from '@mui/styles';
import PriceDiscount from '../../LogicResolve/PriceDiscount';
import TourCard from '../../components/Cards/TourCard';
import TabDetail from '../../components/TabDetail';
import SpinnerLoading from 'components/SpinnerLoading';
import { getUser } from 'hooks/localAuth';
import BookTourModal from 'components/modal/BookTourModal';
import _ from 'lodash';
import moment from 'moment';
import { setActiveUrl } from 'redux/reducers/activeUrl/action';

const useStyles = makeStyles({
    avatar: {
        positionSize: 'cover',
        width: '100%',
    },
    sliderContainer: {
        "& .slick-list": {
            paddingBottom: "10px",
        },
    },
});
const PreArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                ...style, zIndex: 10, overflow: 'hidden', left: '-5px', width: '24px', height: '24px',
            }}
        >
            <ArrowBackIosNewIcon
                color='action'
                sx={{
                    position: 'absolute',
                    zIndex: 10,
                    left: 0,
                    transition: '0.4s',
                    ":hover": {
                        color: 'black',
                        left: '-2px'
                    }
                }}
            />
        </div>
    );
}
const NextArrow = (props) => {
    const { className, style, onClick } = props
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                ...style, zIndex: 10, overflow: 'hidden', right: '-5px', width: '24px', height: '24px',
            }}
        >
            <ArrowForwardIosIcon
                color='action'
                sx={{
                    position: 'absolute',
                    zIndex: 10,
                    right: 0,
                    transition: '0.4s',
                    ":hover": {
                        color: 'black',
                        right: '-2px'
                    }
                }}
            />
        </div>
    );
}
function TourDetail() {

    const classes = useStyles();
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [slides, setSlides] = useState([]);
    const dispatch = useDispatch();
    const { loading, tourDetail, similarTour } = useSelector((store) => store.listTour)
    const { listFeedback } = useSelector((store) => store.feedback)
    const [isShowBookTourModal, setIsShowBookTourModal] = React.useState(false)
    const handleOnClick = () => {
        setIsShowBookTourModal(true);
    }

    const handleCloseModal = () => {
        setIsShowBookTourModal(false)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])
    useEffect(() => {
        dispatch(getTourById(id))
    }, [id])
    useEffect(() => {
        dispatch(getFeedbackForTour(id))
    }, [id])
    useEffect(() => {
        setRating(tourDetail.ratingsAverage)
    }, [listFeedback, tourDetail])
    useEffect(() => {
        let temp = []
        if(tourDetail?.imageSlide){
            temp = _.cloneDeep(tourDetail.imageSlide)
        }
        setSlides([tourDetail.imageAvatar,...temp])
    }, [tourDetail])
    
    useEffect(() => {
        dispatch(setActiveUrl(''))
        document.title = 'Simple Tourism | chi tiết'
    }, [])
    
    const onHandleSendFeedback = (data) => {
        dispatch(createFeedback({
            tour: id,
            customer: getUser()._id,
            comment: data.comment,
            rating: data.rating
        }))
    }
    const settings = {
        className: classes.sliderContainer,
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: true,
        prevArrow: <PreArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 710,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
        ]
    };
    const settingSlideImage = {
        customPaging: function (i) {
            return (
                <a>
                    {
                        slides.length > 0 && <img className='image-dot-slide' src={ConvertToImageURL(slides[i])} />

                    }
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreArrow />,
        nextArrow: <NextArrow />,
    }
    return (
        <div className='tour-detail-wrapper'>
            {loading ? <SpinnerLoading /> :
                (tourDetail &&
                    <Container maxWidth="lg">
                        <Box sx={{ paddingTop: '70px', paddingLeft: { md: '60px' }, paddingRight: { md: '60px' } }}>
                            <Grid container spacing={2}>
                                <Grid className='tour-slide-wrapper' item md={6} xs={12} style={{ position: "relative", marginBottom: '70px', }}>
                                    <Slider {...settingSlideImage}>
                                        {
                                            slides.map((image, index) => (
                                                <div key={index}>
                                                    <img src={ConvertToImageURL(image)} />
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                </Grid>
                                <Grid item md={6} xs={12} className='tour-info-wrapper'>
                                    <Typography gutterBottom variant="h4" component="div" align='left'>
                                        {tourDetail.tourName} 
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div" align='left' style={{display:'flex'}}>
                                        {tourDetail.owner?.companyName}{' '}{!tourDetail.owner?.active && <h4 style={{marginLeft:'10px',textDecoration:'line-through', color:"#858585"}}> Tạm ngừng hoạt động</h4>}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div" align='left' color="secondary">
                                        <PriceDiscount valueDiscount={tourDetail.discount} valuePrice={tourDetail.price} />
                                    </Typography>
                                    <Typography gutterBottom component="div" variant="body1" align="left" style={{ display: 'flex', fontFamily: 'system-ui', color: 'gray' }}>
                                        <Rating name="customized-rating"
                                            defaultValue={tourDetail.ratingsAverage}
                                            value={rating}
                                            max={5}
                                            precision={0.1}
                                            readOnly
                                            size="medium"
                                        />
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div" align='left'>
                                        {`"${tourDetail.description}"`}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div" align='left'>
                                        <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Thời gian: </span>
                                        {new Date(tourDetail?.timeStart?.slice(0, 10))?.toLocaleDateString("en-GB")} &#10137; {new Date(tourDetail?.timeEnd?.slice(0, 10))?.toLocaleDateString("en-GB")}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div" align='left'>
                                        <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Khách sạn: </span>{tourDetail.hotelName}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div" align='left'>
                                        <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Số lượng: </span>{tourDetail.amount}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div" align='left'>
                                        <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Số lượng còn: </span>{tourDetail?.remainingAmount}
                                    </Typography>
                                    <Typography gutterBottom variant="button" component="div" align='left'>
                                        <Button variant="contained" color="info"
                                            disabled={!getUser() || !tourDetail?.owner?.active || moment(tourDetail.timeStart).subtract(5, 'days').toDate().getTime() <  Date.now()}
                                            onClick={() => handleOnClick()}>
                                            Đặt Tour</Button>
                                    </Typography>
                                    <Divider style={{ margin: '10px 0' }} />
                                    <Typography gutterBottom variant="body1" component="div" align='left'>
                                        <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Danh mục: </span>
                                        {tourDetail?.typePlace?.name}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div" align='left'>
                                        <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Quốc gia: </span>
                                        {tourDetail?.countryName}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div" align='left'>
                                        <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Châu lục: </span>
                                        {tourDetail?.continent?.charAt(0)?.toUpperCase() + tourDetail?.continent?.slice(1)}
                                    </Typography>
                                    <Typography gutterBottom variant="body1" component="div" align='left' style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ color: 'darkblue', fontWeight: 'bold' }}>Share on: </span> <FacebookIcon fontSize="large" color="primary" /> <InstagramIcon fontSize="large" color="primary" /> <LinkedInIcon fontSize="large" color='primary' />
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Divider style={{ margin: '10px 0' }} />
                            <Grid>
                                <TabDetail detail={tourDetail?.schedule} feedback={listFeedback} onHandleSendFeedback={onHandleSendFeedback} />
                            </Grid>
                            <Divider style={{ margin: '10px 0' }} />
                            <Box sx={{ padding: '20px' }}>
                                {
                                    similarTour.length > 0 &&
                                    <div>
                                        <h2 style={{ margin: '20px 0', textAlign: 'center', fontFamily: 'monospace', color: 'darkblue' }}>CÓ THỂ BẠN ĐANG TÌM KIẾM</h2>

                                        <Slider {...settings} style={{ padding: '20px' }}>
                                            {
                                                similarTour.map((tour, index) => (
                                                    <TourCard
                                                        key={index}
                                                        _id={tour._id}
                                                        tourName={tour.tourName}
                                                        description={tour.description}
                                                        imageAvatar={ConvertToImageURL(tour.imageAvatar)}
                                                        rating={tour.ratingsAverage}
                                                        price={tour.price}
                                                        discount={tour?.discount}
                                                        companyName={tour?.owner?.companyName}
                                                        active={tour?.owner?.active}
                                                        timeStart={tour.timeStart}
                                                    />
                                                ))
                                            }
                                        </Slider>
                                    </div>
                                }
                            </Box>
                        </Box>
                        <BookTourModal
                            open={isShowBookTourModal}
                            handleClose={handleCloseModal}
                            tour={{
                                _id: tourDetail._id,
                                tourName: tourDetail.tourName,
                                price: tourDetail.price,
                                discount: tourDetail.discount
                            }}
                        />
                    </Container>
                )
            }
        </div >
    );
}

export default TourDetail;