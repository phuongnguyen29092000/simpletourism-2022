import React, { useEffect } from 'react';
import {useNavigate  } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form';
import Slider from '@mui/material/Slider';
import { Checkbox, Container, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../../styles/filter.css';
import RegardPrice from '../../LogicResolve/RegardPrice';
import { CONTINENTS } from '../../Constants/dataForm';
import { useDispatch, useSelector } from 'react-redux';
import { getTypePlace } from '../../redux/reducers/typePlace/action';
import Button from '@mui/material/Button';
import { ROUTE_TOUR_FILTER } from '../../route/type';

function FilterTour() {
    let navigate = useNavigate();
    let {listTypePlace} = useSelector((store) => store.typePlace)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(listTypePlace.length === 0) dispatch(getTypePlace())
        console.log(listTypePlace)
        // setTypePlaces(listTypePlace)
    },[listTypePlace])
    const {
        register,
        handleSubmit,
        reset,
        control,
    } = useForm();

    const onHandleSubmit = (data) => {
        let param = ''
        for (let option in data){
            if(data[option]) {
                if(option == 'price') {
                    param = param + `price[gte]=${data[option][0]}&price[lte]=${data[option][1]}&`;
                }else if (option == 'discount' || option == 'continent') param = param + `${option}=${data[option]}&`;
                    else {
                        let listValue ='';
                        listValue = data[option]?.reduce((acc, curr) => {
                            return `${acc},${curr}`
                        },'')
                        listValue = listValue.slice(1)
                        param =  param + `${option}=${listValue}&`;
                    }
            }
        }
        param = param.slice(0,-1);

        navigate(`${ROUTE_TOUR_FILTER}?${param}`);
        reset();
    };
    return (
        <div className='filter-box'>
            <Container>
                <h1 style={{ margin: 0, marginBottom: '20px', fontFamily: "'Roboto Mono', monospace", fontWeight: 'initial', color: 'black' }}>
                    Bạn đang tìm kiếm ?
                </h1>
                <form action='' onSubmit={handleSubmit(onHandleSubmit)}>
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <div className='filter-item-wrapper'>
                            <div className='filter-item-label'>
                                <label className='filter-label'>Châu lục</label>
                                <KeyboardArrowDownIcon className='arrow' />
                                <div className='filter-detail'>
                                    {
                                        CONTINENTS.map((cont, index) => (
                                            <div className='filter-radio-item' key={index}>
                                                <input type="radio" id={cont.value} value={cont.value} {...register("continent")} />
                                                <label htmlFor={cont.value}>{cont.label}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                        <div className='filter-item-wrapper'>
                            <div className='filter-item-label'>
                                <label className='filter-label'>Loại hình</label>
                                <KeyboardArrowDownIcon className='arrow' />
                                <div className='filter-detail'>
                                    {
                                        listTypePlace?.map((typeplace, index) => (
                                            <div className='filter-radio-item' key={index}>
                                                <input type="checkbox" id={typeplace._id} value={typeplace.slug} {...register("typeplace")} />
                                                <label htmlFor={typeplace._id}>{typeplace.name}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='filter-item-wrapper'>
                            <div className='filter-item-label'>
                                <label className='filter-label'>Giá</label>
                                <KeyboardArrowDownIcon className='arrow' />
                                <div className='filter-detail' style={{ width: '200px', left: '-50%', transform: 'translateX(-20%)' }}>
                                    <Controller
                                        name="price"
                                        control={control}
                                        defaultValue={[0, 50000000]}
                                        render={({ field }) => (
                                            <Slider
                                                {...field}
                                                onChange={(_, value) => {
                                                    field.onChange(value);
                                                }}
                                                valueLabelDisplay="auto"
                                                valueLabelFormat={
                                                    (value) => `${RegardPrice(value)}`
                                                }
                                                max={50000000}
                                                min={0}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='filter-item-wrapper'>
                            <div className='filter-item-label'>
                                <label className='filter-label' htmlFor='discountCheck'>Giảm giá</label>
                                <section>
                                    <Controller
                                        name="discount"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => (
                                            <Checkbox
                                                id='discountCheck'
                                                name='discountCheck'
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                checked={field.value}
                                                style={{padding: 0, paddingLeft:'5px'}}
                                            />
                                        )}
                                    />
                                </section>
                            </div>
                        </div>
                        <Button variant="contained" type='submit' className='button-search' style={{ cursor: 'pointer' }}>Tìm kiếm</Button>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default FilterTour;