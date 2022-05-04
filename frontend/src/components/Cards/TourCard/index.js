import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

function TourCard(props) {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
          color: '#ff3d47',
        },
      });
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Du lịch Sapa
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        3.000.000
                    </Typography>
                    <StyledRating
                        name="rating"
                        defaultValue={2}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                    />
                </CardContent>
                <CardActions>
                    <Button size="small">Thêm vào giỏ</Button>
                    <Button size="small">Đặt ngay</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default TourCard;