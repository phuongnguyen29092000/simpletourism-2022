import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@material-ui/core';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import APIClient from '../../APIs/APIClient';
import { useStore, actions } from '../../store';
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";

const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "#ff6d75"
    },
    "& .MuiRating-iconHover": {
        color: "#ff3d47"
    }
});


const styleForm = {
    display:'flex',
    marginTop:'20px',
    flexDirection: 'column',
    alignItems: 'start'
}
function FeedbackForm({handleSendFeedback}) {
    const [state, dispatch] = useStore()
    const [rating, setRating] = useState(0);
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm();
    const onHandleSubmit = async (data) => {
        typeof handleSendFeedback == 'function' && handleSendFeedback(data);    
        setRating(0);    
        reset();
    };
    return (
        <div className='feedback-form-wrapper'>
            <h3 style={{ fontWeight: 'bold', textAlign:'left'}}>GỬI ĐÁNH GIÁ</h3>
            <div className='form-box'>
                <form action=" " onSubmit={handleSubmit(onHandleSubmit)}>
                    <div className='form-group-fb mb-2' style={styleForm}>
                        <label style={{ margin: '5px 0', fontWeight: 'bold' }}>Email: </label>
                        <input 
                            {...register("email",
                            {
                                required: "* Vui lòng nhập email",
                                pattern: {
                                    // value: /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
                                    message: "* Email không đúng!"
                                }
                            })}
                            style={{ height: '30px', width: '100%', maxWidth:'300px' }}
                            placeholder='email...' />
                        {errors.email && <div className="alert">{errors.email.message}</div>}
                    </div>
                    <div className="form-group-fb mb-2" style={styleForm}>
                        <Controller
                            name="rating"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <StyledRating
                                    name="customized-color"
                                    defaultValue={0}
                                    getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
                                    precision={1}
                                    value={rating}
                                    icon={<FavoriteIcon fontSize="inherit" color="error" style={{color:'red'}}/>}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" style={{color:'red'}}/>}
                                    onChange={(e,newValue) => {
                                        field.onChange(newValue)
                                        setRating(newValue)
                                    }}
                                    size="medium"
                                />
                            )}
                        />
                    </div>
                    <div className="form-group-fb mb-2" style={styleForm}>
                        <label style={{ margin: '5px 0', fontWeight: 'bold' }}>Comment </label>
                        <textarea
                            {...register("comment",
                                {
                                    required: '* Vui lòng nhập đánh giá',
                                })}
                            style={{ height: '100px', width: '100%' }}
                            placeholder='đánh giá...' />
                        {errors.comment && <div className="alert">{errors.comment.message}</div>}
                    </div>
                    <div className="form-group-fb mb-2" style={{textAlign:'left', marginTop:'10px'}}>
                        <Button style={{backgroundColor:'orange'}} type='submit' variant="contained" endIcon={<ArrowForwardOutlinedIcon />}>
                            Gửi đánh giá
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FeedbackForm;