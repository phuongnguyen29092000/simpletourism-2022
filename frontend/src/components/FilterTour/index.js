import React from 'react';
// import {useNavigate  } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, Grid } from '@material-ui/core';
import Slider from '@mui/material/Slider';
import { Container } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../../styles/filter.css';
import RegardPrice from '../../LogicResolve/RegardPrice';

function FilterTour({text, min = 0, max = 3000000, load, onLoad}) {
    // let navigate = useNavigate();
    const minValue = min;
    const maxValue = max;
    const {
        register,
        handleSubmit,
        reset,
        control,
    } = useForm();
    const handleLoad= ()=>{
        if(onLoad){
            onLoad(!load);
        }
    }
    const onHandleSubmit = (data) => {
        // navigate(`/cua-hang?region=${data.region}&type=${data.type}&min=${data.price[0]}&max=${data.price[1]}&dis=${data.discount}`);
        // handleLoad();
        // reset();
    };
    return (
        <div className='filter-box'>
            <Container>
                <h1 style={{ margin: 0, marginBottom: '20px', fontFamily: "'Roboto Mono', monospace", fontWeight: 'initial', color: 'black' }}>
                    {text}
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
                                <label className='filter-label'>Vùng miền</label>
                                <KeyboardArrowDownIcon className='arrow' />
                                <div className='filter-detail'>
                                    <div className='filter-radio-item'><input type="radio" id="bac" value="bac" {...register("region")} /><label htmlFor='bac'>Miền Bắc</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="trung" value="trung" {...register("region")} /><label htmlFor='trung'>Miền Trung</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="nam" value="nam" {...register("region")} /><label htmlFor='nam'>Miền Nam</label></div>
                                </div>
                            </div>

                        </div>
                        <div className='filter-item-wrapper'>
                            <div className='filter-item-label'>
                                <label className='filter-label'>Loại hình</label>
                                <KeyboardArrowDownIcon className='arrow' />
                                <div className='filter-detail'>
                                    <div className='filter-radio-item'><input type="radio" id="nui" value="Núi" {...register("type")} /><label htmlFor='nui'>Núi</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="bien" value="Biển" {...register("type")} /><label htmlFor='bien'>Biển</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="dao" value="Đảo" {...register("type")} /><label htmlFor='dao'>Đảo</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="vanhoa" value="Văn Hóa" {...register("type")} /><label htmlFor='vanhoa'>Văn hóa</label></div>
                                    <div className='filter-radio-item'><input type="radio" id="songnuoc" value="Sông Nước" {...register("type")} /><label htmlFor='songnuoc'>Sông nước</label></div>
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
                                        defaultValue={[minValue, maxValue]}
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
                                                max={maxValue}
                                                min={minValue}
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
                        <button type='submit' className='button-search' style={{ cursor: 'pointer' }}>Tìm kiếm</button>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default FilterTour;