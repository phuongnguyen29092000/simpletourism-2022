import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
    slider:{
        "& .slick-list":{
            height:'100%'
    },},
    slickdotsCustom: {
        bottom: '20px !important',
    },
});

const imageSlide = ['https://images.pexels.com/photos/3889991/pexels-photo-3889991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/7276806/pexels-photo-7276806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/2977432/pexels-photo-2977432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
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