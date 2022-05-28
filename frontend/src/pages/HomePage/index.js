import React from 'react';
import CarouselInstroduce from '../../components/Carousel/CarouselInstroduce'
import FilterTour from '../../components/FilterTour'
import OutstandingTour from '../../containers/OutstandingTour';
import HotPlaces from '../../components/HotPlaces';

function HomePage() {
    return (
        <div>
            <CarouselInstroduce/>
            <FilterTour/>
            <OutstandingTour/>
            <HotPlaces/>
        </div>
    );
}

export default HomePage;