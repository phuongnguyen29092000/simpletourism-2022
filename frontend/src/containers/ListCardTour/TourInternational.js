import CarouselInstroduce from 'components/Carousel/CarouselInstroduce';
import SortTourHeader from 'components/common/SortTourHeader';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListCard from 'components/ListCard';
import {getAllTourInternational} from 'redux/reducers/listTour/action'

const TourDomestic = () => {
    const dispatch = useDispatch()
    const {listTourInternational} = useSelector((store) => store.listTour)
    const [dataTours, setDataTours] = useState([]);
    
    // useEffect(()=>{
    //     if(listTourInternational.length === 0) dispatch(getAllTourInternational())
    // },[listTourInternational])

    useEffect(() => {
        document.title = 'Simple Tourism | quốc tế'
    },[])

    useEffect(()=>{
        if(listTourInternational.length === 0) dispatch(getAllTourInternational())
        setDataTours(listTourInternational)
    },[listTourInternational])

    const handleSortData = (data) => {
        setDataTours([...data])
    }
    return (
        <div className='tour-list tour-international'>
            {
                dataTours && (
                    <>
                        <CarouselInstroduce/>
                        <SortTourHeader
                            dataSort={listTourInternational}
                            setDataTours={handleSortData}
                            title="TOUR QUỐC TẾ"
                        />
                        <ListCard data = {dataTours}/>
                    </>
                )
            }
        </div>
    );
};

export default TourDomestic;
