import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Divider, Grid, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Slider from 'react-slick';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
// import PriceDiscount from '../components/RegardPrice/PriceDiscount'
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import ConvertToImageURL from '../../LogicResolve/ConvertToImageURL'
import { getTourById } from '../../redux/reducers/listTour/action';
import { getFeedbackForTour } from '../../redux/reducers/feedback/action';
import { makeStyles } from '@mui/styles';
import PriceDiscount from '../../LogicResolve/PriceDiscount';
import TourCard from '../../components/Cards/TourCard';
import TabDetail from '../../components/TabDetail';
import AuthAPI from '../../api/AuthAPI';
import StarIcon from '@mui/icons-material/Star';

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75"
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47"
    }
});
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
                ...style, zIndex: 10, overflow: 'hidden', left: '-5px', width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '20%',
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
                ...style, zIndex: 10, overflow: 'hidden', right: '-5px', width: '24px', height: '24px', backgroundColor: 'white', borderRadius: '20%',
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
    console.log(id)
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const {tourDetail, similarTour} = useSelector((store) => store.listTour)
    const {listFeedback} = useSelector((store) => store.feedback)
    // useEffect(async () => {
    //     document.title = "Bootcamp Travel | Chi tiết";
    //     dispatch(actions.setLoading(true));
    //     // const result = await APIClient.getTourDetail(id) 
    //     const result = await axios(`http://localhost:3001/tour/${id}`);
    //     setData(result.data);
    //     dispatch(actions.setLoading(false));
    //     console.log(result.data.similarTour)
    // }, [load]);
    console.log(listFeedback)

    useEffect(()=>{
        dispatch(getTourById(id))
    },[])
    useEffect(()=>{
        console.log('getFb')
        dispatch(getFeedbackForTour(id))
    },[])
    useEffect(()=>{
        setRating(tourDetail.ratingsAverage)
    },[listFeedback, tourDetail])
    const handleOnClick = (_id, name, price, discount) => {
        // dispatch(actions.setBookTour({
        //     id: _id,
        //     name,
        //     price,
        //     discount
        // }));
        // AuthAPI.loginWithGoogle()
    }
    console.log(tourDetail.ratingsAverage)
    const onHandleSendFeedback = async (data) => {
        // const dataSubmit = {
        //     ...data,
        //     idTour: id,
        // }
        // onLoad(!load);
        // const res = await APIClient.sendFeedback(id, dataSubmit);
        // console.log(res)
        // Alert("success", "Success! Cảm ơn đánh giá của bạn!");
    }
    const settings = {
        className: classes.sliderContainer,
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        slidesToScroll: 3,
        pauseOnHover: true,
        prevArrow: <PreArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 710,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
        ]
    };
    const settingSlideImage = {
        customPaging: function(i) {
            return (
              <a>
                <img className='image-dot-slide' src={ConvertToImageURL(tourDetail?.imageSlide[i])}/>
              </a>
            );
          },
          dots: true,
          dotsClass: "slick-dots slick-thumb",
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
    }
    return (
        <div className='tour-detail-wrapper'>
            {tourDetail &&
                <Container maxWidth="lg">
                    <Box sx={{ marginTop: '130px', paddingLeft: { md: '60px' }, paddingRight: { md: '60px' } }}>
                        <Grid container spacing={2}>
                            <Grid className='tour-slide-wrapper' item md={6} xs={12} style={{ position: "relative", marginBottom: '70px',}}>
                                {/* <img className={classes.avatar} src={ConvertToImageURL(tourDetail.imageAvatar)} />
                                {tourDetail.discount != '0' && <div style={{ position: 'absolute', zIndex: 100, top: '8px', left: '20px', height: '40px', lineHeight: '40px', width: '60px', backgroundColor: 'red', color: 'white' }}>
                                    -{new Number(tourDetail.discount) * 100}%
                                </div>} */}
                                <Slider {...settingSlideImage}>
                                    {   
                                        tourDetail?.imageSlide?.map((image, index)=>(
                                            <div key={index}>
                                                <img src={ConvertToImageURL(image)}/>
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </Grid>
                            <Grid item md={6} xs={12} className='tour-info-wrapper'>
                                <Typography gutterBottom variant="h4" component="div" align='left' style={{ fontFamily: 'Dosis' }}>
                                    {tourDetail.tourName}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left' color="secondary">
                                    <PriceDiscount valueDiscount={tourDetail.discount} valuePrice={tourDetail.price} />
                                </Typography>
                                <Typography gutterBottom component="div" variant="body1" align="left" style={{ display: 'flex', fontFamily: 'system-ui', color: 'gray' }}>
                                    {/* <StyledRating
                                        name="customized-color"
                                        value={tourDetail.ratingsAverage}
                                        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                        precision={0.1}
                                        icon={<FavoriteIcon fontSize="inherit" style={{ color: 'red' }} />}
                                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" style={{ color: 'red' }} />}
                                        readOnly
                                        size="medium"
                                    /> */}
                                    <Rating name="customized-rating" 
                                        defaultValue={tourDetail.ratingsAverage}
                                        value={rating}
                                        max={5}
                                        precision={0.1}
                                        readOnly
                                        size="medium"
                                    />
                                    {/* &nbsp;{`${parseFloat(tourDetail.ratingsAverage).toFixed(1)} | ${tourDetail.listFeedback.length} đánh giá`} */}
                                </Typography>
                                <Typography gutterBottom variant="body1" component="div" align='left' style={{ fontFamily: 'Roboto Mono' }}>
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
                                    <Button variant="contained" color="secondary"
                                        // disabled={(new Date().getTime() + 86400000 * 2) > (new Date(tourDetail.timeStart).getTime())}
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
                                                _id = {tour._id}
                                                tourName = {tour.tourName}
                                                description = {tour.description}
                                                imageAvatar = {ConvertToImageURL(tour.imageAvatar)}
                                                // rating
                                                price = {tour.price}
                                                discount = {tour?.discount}
                                                />
                                            ))
                                        }
                                    </Slider>
                                </div>
                            }
                        </Box>
                    </Box>
                </Container>
            }
        </div >
    );
}

export default TourDetail;