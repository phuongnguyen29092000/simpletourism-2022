import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TourCard from '../Cards/TourCard';
import PaginationCustom from '../common/PaginationCustom';
import ConvertToImageURL from '../../LogicResolve/ConvertToImageURL';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNews } from 'redux/reducers/news/action';
import { Link } from 'react-router-dom';

const ListCard = ({ data }) => {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const [dataListCard, setDataListCard] = useState([])
    const {listNews} = useSelector((store) => store.news)
    
    const handleOnChange = (e, value) => {
        let start = (value - 1) * 6;
        let end = start + 6 < data.length ? start + 6 : data.length;
        setDataListCard([...data.slice(start, end)])
        setPage(value)
    }
    useEffect(async () => {
        dispatch(getAllNews())
    }, []);

    useEffect(() => {
        setPage(1)
        setDataListCard([...data.slice(0, 6)])
    }, [data])

    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <div className='list-card-tour'>
            {data &&
                <React.Fragment>
                    <Container maxWidth="lg">
                        <Box sx={{ flexGrow: 1, marginTop: '30px' }}>
                            <Grid container spacing={1}>
                                <Grid container item xs={12} md={9} spacing={2}>
                                    {
                                        dataListCard.map((tour, index) => (
                                            <Grid item key={index} md={4} xs={12} sm={6}>
                                                <TourCard
                                                    _id={tour._id}
                                                    tourName={tour.tourName}
                                                    description={tour.description}
                                                    imageAvatar={ConvertToImageURL(tour.imageAvatar)}
                                                    rating={tour.ratingsAverage}
                                                    price={tour.price}
                                                    discount={tour?.discount}
                                                    companyName={tour?.owner?.companyName}
                                                    active={tour?.owner?.active}
                                                    timeStart={tour.timeStart}
                                                />
                                            </Grid>
                                        ))
                                    }
                                    <PaginationCustom total={data.length} limit={6} page={page} onChange={handleOnChange} />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <h4>TIN NỔI BẬT</h4>
                                    {
                                        listNews && listNews.sort((a,b) => b.viewer - a.viewer).slice(0, 4).map((item, index) => (
                                            <Link to={`/tin-tuc/${item._id}`} style={{ textDecoration: 'none' }} key={index}>
                                                <Divider style={{ margin: '5px 0' }} />
                                                <Grid container item xs={12} key={index} style={{ padding: '10px', color: "#000" }}>
                                                    <Grid item xs={2} md={3}>
                                                        <div style={{ aspectRatio: '1', overflow: 'hidden', maxHeight: '100px' }}>
                                                            <img style={{ maxHeight: '100px', height: '100%' }} src={ConvertToImageURL(item.imageUrl)} />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={10} md={9}>
                                                        <Typography variant="body1" align='left' sx={{ marginBottom: '5px', marginLeft: '10px', maxHeight: '20px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                            {item.title}
                                                        </Typography>
                                                        <Typography variant="body1" align='left'
                                                            sx={{
                                                                marginLeft: '10px',
                                                                overflow: 'hidden',
                                                                lineHeight: '1.3',
                                                                fontSize: '12px',
                                                                height: '33px',
                                                                textOverflow: 'ellipsis',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: '2',
                                                                WebkitBoxOrient: 'vertical'
                                                            }}>
                                                            {item.description}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Link>
                                        ))
                                    }
                                    <Divider style={{ margin: '5px 0' }} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </React.Fragment>
            }
        </div>
    );
};

export default ListCard;