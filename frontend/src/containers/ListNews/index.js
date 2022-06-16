import { Container, Divider, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewsAPI from '../../api/NewsAPI';
import NewsCard from 'components/Cards/NewsCard/NewsCard.js';
import {useDispatch, useSelector} from 'react-redux';
import {getAllNews} from 'redux/reducers/news/action'
import ConvertToImageURL from 'LogicResolve/ConvertToImageURL';
import PaginationCustom from 'components/common/PaginationCustom';

// const ConvertToImageURL = (url) => {
//     if (url) return `http://localhost:4000/${url.slice(6)}`
//     else return "";
// }

function NewsList(props) {
    // const [state, dispatch] = useStore()
    const dispatch = useDispatch()
    // const [data, setData] = useState();
    const {listNews} = useSelector((store) => store.news)
    const [page, setPage] = useState(1)
    const [dataListNews, setDataListNews] = useState([])
    const handleOnChange = (e, value) => {
        let start = (value-1)*6; 
        let end = start + 6 < listNews.length ? start + 6 : listNews.length;
        console.log(start, end)
        setDataListNews([...listNews.slice(start, end)])
        setPage(value)
    }
    useEffect(() => {
        setDataListNews([...listNews.slice(0,6)])
    },[listNews])
    useEffect(async () => {
        document.title = "Tin tức";
        dispatch(getAllNews())
    }, []);
    useEffect(()=>{
        window.scrollTo(0, 0)
    })
    
    console.log(">>>", listNews)
    return (
        <div className='news-list-wrapper' style={{ paddingTop: '70px',
            backgroundImage: "url('https://images.pexels.com/photos/2147486/pexels-photo-2147486.jpeg')",
            backgroundSize: 'cover'
        }}>
            {
                listNews &&
                <Container maxWidth='xl'>
                    <h2>
                        TIN TỨC & TRẢI NGHIỆM DU LỊCH
                    </h2>
                    <Grid container spacing={3} style={{ justifyContent: 'center', paddingBottom: '30px' }}>
                        <Grid container item md={9} xs={12} spacing={3}>
                            {
                                dataListNews.map((item, index) => (
                                    <Grid item key={index} md={4} xs={6} sx={{color: "#000"}}>
                                        <NewsCard
                                            path={`/tin-tuc/${item._id}`}
                                            title={item.title}
                                            description={item.description}
                                            companyName={item?.owner.companyName}
                                            image={`http://localhost:4000${item.imageUrl.slice(6)}`}
                                            key={index}
                                        />
                                    </Grid>
                                ))
                            }
                            <PaginationCustom total={listNews.length} limit={6} page={page} onChange={handleOnChange}/>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <h4>TIN NỔI BẬT</h4>
                            {
                                listNews && listNews.slice(0,3).map((item, index) => (
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