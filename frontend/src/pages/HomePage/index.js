import React from 'react';
import CarouselInstroduce from '../../components/Carousel/CarouselInstroduce'
import FilterTour from '../../components/FilterTour'
import OutstandingTour from '../../containers/OutstandingTour';
import HotPlaces from '../../components/HotPlaces';
import { useSelector } from 'react-redux';
import SpinnerLoading from 'components/SpinnerLoading';
import AdvantageCard from 'components/AdvantageCard';

function HomePage() {
    const {loading} = useSelector((store) => store.listTour)
    return (
        <div className='home-page'>
        {
            loading ? <SpinnerLoading/> :
            <div>
                <CarouselInstroduce/>
                <FilterTour/>
                <OutstandingTour/>
                <HotPlaces/>
                <AdvantageCard/>
            </div>
        }
        </div>
    );
}

export default HomePage;