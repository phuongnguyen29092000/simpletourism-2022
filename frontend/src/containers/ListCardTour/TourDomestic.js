import CarouselInstroduce from 'components/Carousel/CarouselInstroduce';
import SortTourHeader from 'components/common/SortTourHeader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from 'components/ListCard';
import SpinnerLoading from 'components/SpinnerLoading';
import { getAllTourDomestic } from 'redux/reducers/listTour/action'
import { setActiveUrl } from 'redux/reducers/activeUrl/action';

const TourDomestic = () => {
    const dispatch = useDispatch()
    const { listTourDomestic, loading } = useSelector((store) => store.listTour)
    const [dataTours, setDataTours] = useState([]);
    useEffect(() => {
        document.title = 'Simple Tourism | trong nước'
        dispatch(setActiveUrl('domestic'))
    }, [])

    const handleSortData = (data) => {
        setDataTours([...data])
    }

    useEffect(() => {
        if (listTourDomestic.length === 0) dispatch(getAllTourDomestic())
        setDataTours(listTourDomestic)
    }, [listTourDomestic])

    return (
        <div className='tour-list tour-domestic'>
            {
                !loading ?
                    dataTours && (
                        <>
                            <CarouselInstroduce />
                            <SortTourHeader
                                dataSort={listTourDomestic}
                                setDataTours={handleSortData}
                                title="TOUR TRONG NƯỚC"
                            />
                            <ListCard data={dataTours} />
                        </>
                    )
                    :
                    <SpinnerLoading />
            }
        </div>
    );
};

export default TourDomestic;
