import ListTourAPI from 'api/ListTourAPI';
import CarouselInstroduce from 'components/Carousel/CarouselInstroduce';
import FilterTour from 'components/FilterTour';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ListCard from '../../components/ListCard';
import SpinnerLoading from '../../components/SpinnerLoading';
import { filterTour } from '../../redux/reducers/listTour/action'

const TourResult = () => {
    const dispatch = useDispatch()
    const { listTourResult, loading } = useSelector((store) => store.listTour)
    const { search } = useLocation();
    const [dataResult, setDataResult] = useState([])
    let searchParagram = new URLSearchParams(search);
    useEffect(() => {
        let param = {}
        for (const [key, value] of searchParagram.entries()) {
            param[key] = value
        }
        console.log(param);
        if(Object.keys(param).length > 1){
            dispatch(filterTour(param))
            setDataResult(listTourResult)
        }else{
            ListTourAPI.searchTour(param)
                .then((rs) => {
                    if (rs.status === 200) {
                        setDataResult(rs.data.data)
                    } else {
                        setDataResult([])
                    }
                }).catch((error) => {
                    setDataResult([])
                })
        }
    }, [search])
    useEffect(() => {
        document.title = 'Simple Tourism | kết quả'
    }, [])

    return (
        <div className='tour-list tour-result'>
            {
                !loading ?
                    <>
                        <CarouselInstroduce />
                        <FilterTour />{
                            dataResult?.length > 0 ?
                                <ListCard data={dataResult} />
                                :
                                <h3 className='title-not-found'>Không tìm thấy tour phù hợp</h3>
                        }
                    </>
                    : <SpinnerLoading />
            }
        </div>
    );
};

export default TourResult;
