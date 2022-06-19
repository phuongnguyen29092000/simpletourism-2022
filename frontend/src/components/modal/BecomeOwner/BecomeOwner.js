import { Box, Button, Modal } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useForm } from 'react-hook-form';
import { becomeOwner} from '../../../redux/reducers/user/action'
import UserAPI from 'api/UserAPI';

const BecomeOwner = ({ open, handleClose, customer, action }) => {
    const dispatch = useDispatch()
    const formRef = useRef(null)
    const [submit, setSubmit] = useState(false) 

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
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        overflow: 'hidden',
        borderRadius:'5px',
    };

    const onHandleSubmit = (data)=> {
        dispatch(becomeOwner(customer._id, data, ()=> handleClose(false)))
    }

    const handleUpdatePermission = () => {
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
                            <h3 style={{textAlign:'center'}}>Cấp quyền công ty</h3>
                        </div>
                    </div>
                    <div style={{display:'flex'}}>
                        <div style={{padding:'65px 0px 0px 40px'}}>
                            <img src={customer?.photoUrl} alt='' style={{width:'120px', height:'120px', borderRadius: '4px'}}/>

                        </div>
                        <div className='modal-body modal-book-ticket' style={{width:'400px'}}>
                            <h4>{`Tên tài khoản: ${customer.familyName} ${customer.givenName}`}</h4>
                            <form className='form-booking-tour' onSubmit={handleSubmit(onHandleSubmit)}>
                                <div className='form-group-phone a1col-1'>
                                    <label>Tên công ty: </label>
                                    <input 
                                        style={{width:'350px'}}
                                        {...register("companyName", {
                                        required: "* Nhập tên công ty.",
                                        maxLength: {
                                            value: 100,
                                            message: '* Nhập tên công ty quá dài.'
                                        }
                                    })}
                                    />
                                    {/* {errors.phone && <div className="alert">{errors.phone.message}</div>} */}
                                </div>
                                <div className='form-group-phone a1col-1'>
                                    <label>ClientID Paypal: </label>
                                    <input
                                        style={{width:'350px'}} 
                                        {...register("client_id", {
                                        required: "* Nhập clientId paypal.",
                                    })}
                                    />
                                    {/* {errors.phone && <div className="alert">{errors.phone.message}</div>} */}
                                </div>
                                <div className='form-group-phone a1col-1'>
                                    <label>ClientSecret Paypal</label>
                                    <input
                                        style={{width:'350px'}} 
                                        {...register("client_secret", {
                                        required: "* Nhập clientSecret paypal.",
                                    })}
                                    />
                                    {/* {errors.phone && <div className="alert">{errors.phone.message}</div>} */}
                                </div>
                                <button type='submit' ref={formRef} style={{display:'none'}}>SUBMIT</button>
                            </form>
                        </div>

                    </div>
                    <div className='modal-footer'>
                        <div className='btn-footer'>
                            <Button variant="contained" className='btn-footer__action btn-add' onClick={()=>handleUpdatePermission()}>Cấp quyền</Button>
                            <Button variant="contained" className='btn-footer__action btn-cancel' onClick={() => handleClose(false)}>Hủy</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default BecomeOwner;