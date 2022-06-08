import { Box, Button, ButtonGroup, Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getAllTour, addTour} from '../../../redux/reducers/listTour/action'
import { Controller, useForm } from 'react-hook-form';
import { format, parse } from 'date-fns';
import TicketAPI from 'api/TicketAPI';
import useNotification from 'hooks/notification'
import PriceDiscount from 'LogicResolve/PriceDiscount';

const BookTourModal = ({ open, handleClose, tour, max = 5 }) => {
    const dispatch = useDispatch()
    const {account} = useSelector((store)=>store.user)
    const [count, setCount] = useState(1);
    const formRef = useRef(null)
    // useEffect(()=>{
    //     dispatch(getAllTour())
    // },[])
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        overflow: 'hidden',
        borderRadius:'5px',
    };

    const onHandleSubmit = (data) => {
        TicketAPI.createTicket(tour?._id,{
            customer: account._id,
            phone: data.phone,
            numberPeople: data.numberPeople
        })
        .then((result) => {
            if(result.status === 201){
                useNotification.Success({
                    title: "Thành công!",
                    message:"Đặt tour thành công!"
                })
                reset();
                handleClose(false);
            }
        })
        .catch((error) => {
            console.log(error)
        })
        handleClose(false)
    }
    const handleIncrement = (onChange) => {
        let countNext = count + 1;
        onChange(countNext);
        setCount(countNext);
    }
    const handleDecrement = (onChange) => {
        let countNext = count - 1;
        onChange(countNext);
        setCount(countNext);
    }
    const handleBookTour = () => {
        formRef.current.click();
    }
    return (
        <div className='book-ticket-modal'>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box sx={style}>
                    <div className='modal-header '>
                        <div className='modal-title' style={{display:'flex', justifyContent:'center'}}>
                            <h3 style={{textAlign:'center'}}>ĐẶT TOUR</h3>
                        </div>
                    </div>
                    <div className='modal-body modal-book-ticket'>
                        <h4>{`Tên tour: ${tour.tourName}`}</h4>
                        <form className='form-booking-tour' onSubmit={handleSubmit(onHandleSubmit)}>
                            <div className='form-group-phone a1col-1'>
                                <label>Số điện thoại: </label>
                                <input {...register("phone", {
                                    required: "* Nhập SĐT.",
                                    maxLength: {
                                        value: 10,
                                        message: '* SĐT Sai.'
                                    },
                                    pattern: {
                                        value: /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                                        message: "* SĐT sai"
                                    }
                                })}
                                    defaultValue={tour && tour.phone}
                                />
                                {errors.phone && <div className="alert">{errors.phone.message}</div>}
                            </div>
                            <div className="form-group-count mb-2">
                                <label className='label-title'>Số lượng vé: </label>
                                <Controller
                                    name="numberPeople"
                                    control={control}
                                    defaultValue={1}
                                    render={({ field }) => (
                                        <ButtonGroup size="small" style={{ width: '100px' }}>
                                            <Button disabled={count <= 1}
                                                {...field}
                                                onClick={() => handleDecrement(field.onChange)}
                                            >
                                                -</Button>
                                            <Button disabled>{count}</Button>
                                            <Button disabled={count >= max}
                                                {...field}
                                                onClick={() => handleIncrement(field.onChange)}
                                            >+</Button>
                                        </ButtonGroup>
                                    )}
                                />
                             </div>
                             <button type='submit' ref={formRef} style={{display:'none'}}>SUBMIT</button>
                        </form>
                        <span className='price-text'><PriceDiscount valuePrice={(tour.price)*count} valueDiscount={tour.discount}/></span>
                    </div>
                    <div className='modal-footer'>
                        <div className='btn-footer'>
                            <Button variant="contained" className='btn-footer__action btn-add' onClick={()=>handleBookTour()}>Đặt</Button>
                            <Button variant="contained" className='btn-footer__action btn-cancel' onClick={() => handleClose(false)}>Hủy</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default BookTourModal;