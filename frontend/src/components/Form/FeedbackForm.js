import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import { Button } from '@mui/material';

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
                    <div className="form-group-fb mb-2" style={styleForm}>
                        <Controller
                            name="rating"
                            control={control}
                            defaultValue={0}
                            render={({ field }) => (
                                <Rating
                                 name="customized-color"
                                defaultValue={0}
                                max={5}
                                value={rating}
                                precision={1}
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