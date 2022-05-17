import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListCard from '../../components/ListCard';
import {getAllTourInternational} from '../../redux/reducers/listTour/action'

const TourDomestic = () => {
    const dispatch = useDispatch()
    const {listTourInternational} = useSelector((store) => store.listTour)
    useEffect(()=>{
        if(listTourInternational.length === 0) dispatch(getAllTourInternational())
    },[listTourInternational])
    return (
        <div className='tour-list tour-domestic'>
            {
                listTourInternational && (
                    <ListCard data = {listTourInternational}/>
                )
            }
        </div>
    );
};

export default TourDomestic;
