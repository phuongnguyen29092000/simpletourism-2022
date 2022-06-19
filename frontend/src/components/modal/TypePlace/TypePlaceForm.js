// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getTypePlace} from '../../../redux/reducers/typePlace/action'

function TypePlaceForm({ handleAddTypePlace, handleUpdateTypePlace, typePlace, submit = false, setSubmit = ()=>{} }) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();
    const formRef = useRef(null)
    const {account} = useSelector((store) => store.user) 
    const dispatch = useDispatch()

    useEffect(() => {
        if(submit){
            formRef.current.click()
        }
    }, [submit]);

    const onHandleSubmit = (data) => {
        if(typePlace) handleUpdateTypePlace(typePlace._id.toString(), data)
        else handleAddTypePlace(data);
        setSubmit(false)
    };
    return (
        <div className='create-tour-form-wrapper'>
            <form className='create-tour-formbody' action=" " onSubmit={handleSubmit(onHandleSubmit)} >
                <div className='form-group col-1' style={{width:'100%'}}>
                    <label>Tên  </label>
                    <input {...register("name", {
                        required: "* Nhập tên loại địa hình.",
                        maxLength: {
                            value: 100,
                            message: '* Nhập tiêu đề tin tức quá dài.'
                        }
                    })}
                        defaultValue={typePlace && typePlace.name}
                        style={{width: '250px'}}
                    />
                    {errors.typePlace && <div className="alert">{errors.title.message}</div>}
                </div>
             
                <div className="form-group col-2">
                    <label>Mô tả: </label>
                    <textarea style={{ height: '150px' }}  {...register("description", {
                        required: "* Nhập mô tả địa hình.",
                        maxLength: {
                            value: 1024,
                            message: "*Nội dung loại địa hình quá dài!"
                        }
                    })}
                        defaultValue={typePlace && typePlace.description}
                    />
                    {errors.description && <div className="alert">{errors.description.message}</div>}
                </div>
                <button type='submit' ref={formRef} style={{display:'none'}}>SUBMIT</button>
            </form>

        </div>
    );
}

export default TypePlaceForm;