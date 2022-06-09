import { Box, Card, CardMedia, Rating, Typography } from '@mui/material';
import React from 'react';

const TourCardMini = ({ name, img, rating }) => {

    return (
            <Card sx={{ display: 'flex' }}>
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