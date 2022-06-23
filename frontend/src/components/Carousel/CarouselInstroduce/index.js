import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
    slider: {
        "& .slick-list": {
            height: '100%'
        },
    },
    slickdotsCustom: {
        bottom: '20px !important',
    },
});

const imageSlide = [{
    title: 'MÙA THU HÀN QUỐC',
    content: 'Mùa của những chiếc lá vàng',
    image: 'https://images.pexels.com/photos/8975713/pexels-photo-8975713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: "/tour-chi-tiet/6285ec1a86b9ea85c3d94028"
},
{
    title: 'DU THUYỀN VỊNH HẠ LONG',
    content: 'Kỳ quan thiên nhiên thế giới',
    image: 'https://images.pexels.com/photos/7276806/pexels-photo-7276806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: "/tour-chi-tiet/625d8c50db8900fc8a7fb236",
},
{
    title: 'VẺ ĐẸP ĐẤT NƯỚC Ý',
    content: 'Thiên đường tại châu Âu',
    image: 'https://images.pexels.com/photos/1365607/pexels-photo-1365607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    url: "/tour-chi-tiet/625fc68369060684f465bfb1",

}
]

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
const Slides = ({ index, image, title, content, url }) => {
    return (
        <div className='slide-root' style={{ width: '100%', height: '100%' }}>
            <img src={image} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}></img>
            <div className={`text-introduce-${index}`}>
                <h1>{title}</h1>
                <h3>{content}</h3>
                <Link to={url}>
                    <Button variant='contained' color='info'>Khám phá</Button>
                </Link>
            </div>
        </div>
    )
}

function CarouselInstroduce(props) {
    const classes = useStyle();
    const [size, setSize] = useState(window.innerWidth * 2 / 5);
    useEffect(() => {
        const updateSize = () => {
            setSize(window.innerWidth * 2 / 5)
        }
        window.addEventListener("resize", updateSize);
        return () => {
            window.removeEventListener("resize", updateSize);
        }
    });
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
        prevArrow: <PreArrow />
    };
    return (
        <div style={{ width: '100%', height: `${size}px` }} className='slide-box'>
            <Slider {...settings} style={{ height: '100%' }}>
                {
                    imageSlide.map((img, index) => (
                        <Slides image={img.image} key={index} index={index} title={img.title} content={img.content} url={img.url}/>
                    ))
                }
            </Slider>
        </div>
    );
}
export default CarouselInstroduce;