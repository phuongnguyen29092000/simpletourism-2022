import React, { useEffect } from 'react';
import CarouselInstroduce from '../../components/Carousel/CarouselInstroduce'
import FilterTour from '../../components/FilterTour'
import OutstandingTour from '../../containers/OutstandingTour';
import HotPlaces from '../../components/HotPlaces';
import { useDispatch, useSelector } from 'react-redux';
import SpinnerLoading from 'components/SpinnerLoading';
import AdvantageCard from 'components/AdvantageCard';
import { setActiveUrl } from 'redux/reducers/activeUrl/action';

function HomePage() {
    const {loading} = useSelector((store) => store.listTour)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setActiveUrl('home'))
    },[])
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