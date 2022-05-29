import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';
import ListCard from '../../components/ListCard';
import SpinnerLoading from '../../components/SpinnerLoading';
import {filterTour} from '../../redux/reducers/listTour/action'

const TourResult = () => {
    const dispatch = useDispatch()
    const {listTourResult, loading} = useSelector((store) => store.listTour)
    const { search } = useLocation();
    
    useEffect(()=>{
        let searchParagram = new URLSearchParams(search);
        let param = {}
        for (const [key, value] of searchParagram.entries()) {
            param[key] = value
        }
        dispatch(filterTour(param))
    },[])
    useEffect(() => {
        document.title = 'Simple Tourism | kết quả'
    },[])
    console.log(listTourResult)
    return (
        <div className='tour-list tour-result'>
            {
                !loading ? 
                listTourResult &&
                 <ListCard data = {listTourResult}/>
                 : <SpinnerLoading/>
            }
        </div>
    );
};

export default TourResult;
