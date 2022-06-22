import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TourCard from "../../components/Cards/TourCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useDispatch, useSelector } from "react-redux";
import ConvertToImageURL from '../../LogicResolve/ConvertToImageURL';
import { Container } from "@mui/material";
import {getOutstandingTour} from '../../redux/reducers/listTour/action'

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
function OutstandingTour({tourlist}) {
    const dispatch = useDispatch();
    let {listOurstandingTour} = useSelector((store) => store.listTour)
    useEffect(()=>{
        if(listOurstandingTour.length === 0) dispatch(getOutstandingTour())
    },[])
    const settings = {
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
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
        ]
    };
    return (
        <div className="hot-tour-slide-wrapper">
            <Container maxWidth="lg">
                <div className="container-slide-hot-tour">
                    <h2 style={{color:"black"}}> TOUR ĐƯỢC ƯA THÍCH NHẤT</h2>
                    <h4 style={{color:"black"}}>ĐƠN GIẢN HÓA LỊCH TRÌNH KHÁM PHÁ</h4>
                    <Slider {...settings} style={{ padding: '30px'}}>
                        {
                            listOurstandingTour.map((tour, index) => (
                                <TourCard
                                    key={index}
                                    // link={`/tour/${info._id}`}
                                    _id = {tour._id}
                                    tourName = {tour.tourName}
                                    description = {tour.description}
                                    imageAvatar = {ConvertToImageURL(tour.imageAvatar)}
                                    rating = {tour.ratingsAverage}
                                    price = {tour.price}
                                    discount = {tour?.discount}
                                    companyName={tour?.owner?.companyName}
                                    active={tour?.owner?.active}
                                    timeStart={tour.timeStart}
                                />
                            ))
                        }
                    </Slider>
                </div>
            </Container>
        </div>
    );
}
export default OutstandingTour;