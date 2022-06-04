import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListCard from '../../components/ListCard';
import SpinnerLoading from '../../components/SpinnerLoading';
import {getAllTourDomestic} from '../../redux/reducers/listTour/action'

const TourDomestic = () => {
    const dispatch = useDispatch()
    const {listTourDomestic, loading} = useSelector((store) => store.listTour)
    console.log(loading)
    useEffect(() => {
        document.title = 'Simple Tourism | trong nước'
    },[])
    useEffect(()=>{
        if(listTourDomestic.length === 0) dispatch(getAllTourDomestic())
    },[listTourDomestic])
    return (
        <div className='tour-list tour-domestic'>
            {
               !loading ?
                listTourDomestic && (
                    <ListCard data = {listTourDomestic}/>
                ) 
                :
                <SpinnerLoading/>
            }
        </div>
    );
};

export default TourDomestic;
