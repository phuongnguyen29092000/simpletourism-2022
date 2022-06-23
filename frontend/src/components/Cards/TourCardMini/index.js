import { Box, Card, CardMedia, Rating, Typography } from '@mui/material';
import React from 'react';
import { ROUTE_TOUR_DETAIL } from 'route/type';

const TourCardMini = ({ name, img, rating, _id }) => {

    return (
            <Card sx={{ display: 'flex'}} className='tour-card-mini'>
                <CardMedia
                    component="img"
                    sx={{ width: 70, minWidth: 70, maxHeight: '60px', height:'60px' }}
                    image={img}
                    alt={name}
                />
                <Box sx={{ padding: '5px' }}>
                    <Typography component="div" variant="subtitle1" sx={{
                        width: '206px',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                    }}>
                        {name}
                    </Typography>
                    <Typography gutterBottom component="div" variant="body1" color="blueviolet" align="left" style={{ height: '15px' }}>
                        <Rating name="customized-rating"
                            defaultValue={rating}
                            value={rating}
                            max={5}
                            precision={0.1}
                            readOnly
                            size="small"
                        />
                    </Typography>
                </Box>
            </Card >
    );
};

export default TourCardMini;