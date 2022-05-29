import { Container, Divider, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewsAPI from '../../api/NewsAPI';
import NewsCard from 'components/Cards/NewsCard/NewsCard.js';
// import { useStore, actions } from '../store';

const ConvertToImageURL = (url) => {
    if (url) return `http://localhost:4000/${url.slice(6)}`
    else return "";
}

function NewsList(props) {
    // const [state, dispatch] = useStore()
    const [data, setData] = useState();

    useEffect(async () => {
        document.title = "Tin tức";
        // dispatch(actions.setLoading(true));
        const result = await NewsAPI.getAllNews()
        console.log(result.data.news);
        setData(result);
        // dispatch(actions.setLoading(false));
    }, []);

    return (
        <div className='news-list-wrapper' style={{ marginTop: '110px' }}>
            {
                data?.data?.news &&
                <Container maxWidth='xl'>
                    <h2>
                        TIN TỨC & TRẢI NGHIỆM DU LỊCH
                    </h2>
                    <Grid container spacing={3} style={{ justifyContent: 'center' }}>
                        <Grid container item md={9} xs={12} spacing={3}>
                            {
                                data?.data?.news?.map((item, index) => (
                                    <Grid item key={index} md={4} xs={6}>
                                        <NewsCard
                                            path={`/tin-tuc/${item._id}`}
                                            title={item.title}
                                            description={item.description}
                                            image={`http://localhost:3001/${item.imageUrl.slice(6)}`}
                                            key={index}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <h4>TIN NỔI BẬT</h4>
                            {
                                data && data.news.map((item, index) => (
                                    <Link to={`/tin-tuc/${item._id}`} style={{ textDecoration: 'none' }} key={index}>
                                        <Divider style={{ margin: '5px 0' }} />
                                        <Grid container item xs={12} key={index} style={{ padding: '10px' }}>
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
                </Container>
            }
        </div>
    );
}

export default NewsList;