import React from 'react';
import CarouselInstroduce from '../../components/Carousel/CarouselInstroduce'
import FilterTour from '../../components/FilterTour'
import OutstandingTour from '../../containers/OutstandingTour';

function HomePage() {
    return (
        <div>
            <CarouselInstroduce/>
            <FilterTour/>
            <OutstandingTour/>
        </div>
    );
}

export default HomePage;