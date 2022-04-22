import React from 'react';
import CarouselInstroduce from '../../components/Carousel/CarouselInstroduce'
import FilterTour from '../../components/FilterTour'

function HomePage(props) {
    return (
        <div>
            <CarouselInstroduce/>
            <FilterTour/>
        </div>
    );
}

export default HomePage;