import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    slider:{
        "& .slick-list":{
            height:'100%'
    },},
    slickdotsCustom: {
        bottom: '20px !important',
    },
});

const imageSlide = ['https://wall.vn//wp-content//uploads//2020/04//anh-dep-viet-nam-10.jpg',
    'https://wall.vn//wp-content//uploads//2020//04//cau-vang-ba-na-hills.jpg',
    'https://wall.vn//wp-content//uploads//2020//04//anh-dep-viet-nam-18.jpg',
]
function PrevArrow(props) {

    const { className, onClick, style } = props;
    return (
        <div
            className={className}
            onClick={onClick}
            style={{ ...style, zIndex: '1', left: '10px' }}
        />
    );
}
function NextArrow(props) {
    const { className, onClick, style } = props;
    return (
        <div
            className={className}
            onClick={onClick}
            style={{ ...style, zIndex: '1', right: '10px' }}
        />
    );
}
const Slides = (props) => {
    return (
        <div className='slide-root' style={{ width: '100%', height:'100%'}}>
            <img src={props.image} style={{ width: '100%', height:'100%', objectFit: 'cover'}}></img>
        </div>
    )
}

function CarouselInstroduce(props) {
    const classes = useStyle();
    const [size, setSize] = useState(window.innerWidth*6/12);
    useEffect(()=>{
        const updateSize= ()=>{
            setSize(window.innerWidth*6/12)
          }
        window.addEventListener("resize", updateSize);
        return()=>{
            window.removeEventListener("resize", updateSize);
        }
    },);
    const settings = {
        className: `${classes.slider}`,
        dots: true,
        autoplay: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        dotsClass: `slick-dots ${classes.slickdotsCustom}`,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
    return (
        <div style={{ width: '100%', height:`${size}px`}} className='slide-box'>
            <Slider {...settings} style={{height:'100%'}}>
                {
                    imageSlide.map((img,index) => (
                            <Slides image={img} key={index}/>
                    ))
                }
            </Slider>
        </div>
    );
}
export default CarouselInstroduce;