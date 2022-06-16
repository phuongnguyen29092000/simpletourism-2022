import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, CardActions } from '@mui/material';

export default function NewsCard({ title, description, image, path, companyName }) {
    return (
        <Card
            sx={{
                boxSizing: 'border-box',
                ':hover': {
                    transition: '0.4s',
                    boxShadow: '5px 3px 10px 1px #715c5cd1'
                },
                cursor: 'pointer',
                borderRadius: '10px',
                maxWidth: 345,
                margin: 'auto'
            }}

        >
            <CardMedia
                component="img"
                alt={title}
                height="200"
                image={image}
                sx={{
                    ':hover': {
                        transform: 'scale(1.1)',
                        transition: '1s'
                    },
                    transition: '1s',
                }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div"
                    sx={{
                        textAlign: 'left',
                        overflow: 'hidden',
                        lineHeight: '1.4',
                        fontSize: '18px',
                        height: '50px',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical'
                    }}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="left"
                    sx={{
                        overflow: 'hidden',
                        lineHeight: '1.3',
                        fontSize: '14px',
                        height: '54px',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '3',
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="left"
                    sx={{
                        paddingTop: '10px',
                        overflow: 'hidden',
                        lineHeight: '1.5',
                        fontWeight:'600',
                        fontSize: '14px',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        color: '#99CCFF'
                    }}
                >
                    Tác giả: {companyName}
                </Typography>
            </CardContent>
            <CardActions>
                <Link to={path} style={{textDecoration:'none'}}>
                    <Button size="small" color="secondary">Đọc thêm...</Button>
                </Link>
            </CardActions>
        </Card>
    );
}
