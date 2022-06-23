import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNews, getNewsDetail } from 'redux/reducers/news/action';
import SpinnerLoading from 'components/SpinnerLoading';
import ConvertToImageURL from 'LogicResolve/ConvertToImageURL';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import NewsAPI from 'api/NewsAPI';
import { setActiveUrl } from 'redux/reducers/activeUrl/action';

function NewsDetail(props) {
    const dispatch = useDispatch()
    const { loading, newsDetail, listNews } = useSelector((store) => store.news);
    const [load, onLoad] = useState(false);
    const { id } = useParams();
 
    useEffect(() => {
        dispatch(getNewsDetail(id))
        dispatch(getAllNews())
        const res = NewsAPI.updateViewer(id)
    }, [id])

    useEffect(async () => {
        document.title = "Simple Tourism | Tin tức";
        dispatch(setActiveUrl('news'))
    }, []);

    return (
        <div className='news-detail-wrapper'>
            {loading ? <SpinnerLoading /> :
                (Object.keys(newsDetail).length > 0 &&
                    <Container maxWidth='xl'>
                        <Grid container style={{ justifyContent: 'center', padding: '20px'}}>
                            <Grid container item md={8} xs={12} style={{ boxShadow: '0 1px 3px -2px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)', padding: '20px', display:'flex', flexDirection:'column'}}>
                                <Typography variant='body1' component='div' sx={{marginBottom: '30px', display:'flex',flexDirection:'column', alignItems:'center'}}>
                                    <div style={{ display:'flex', alignItems:'center', width:'100%'}}>
                                        <span style={{color:'#858585', fontSize:'13px'}}>Đăng lúc {moment(newsDetail.createdAt).format('DD/MM/YYYY LTS')}</span>
                                        <div style={{marginLeft: '30px', display: 'flex', alignItems: 'center'}}>
                                            <VisibilityIcon color='action'></VisibilityIcon>
                                            <span style={{marginLeft: '8px',color:'#858585', fontSize:'13px'}}>{newsDetail?.viewer} lượt xem</span>
                                        </div>
                                    </div>
                                    <span style={{marginTop: '20px', width: '100%', textAlign:'left', fontWeight:'700x', color:'#4682B4'}}>
                                        Tác giả: {newsDetail?.owner.companyName}
                                    </span>
                                </Typography>
                                <h2 style={{ marginTop: '0px' }}>
                                    {newsDetail.title.toUpperCase()}
                                </h2>
                                
                                <Typography variant='body1' component='div' sx={{ margin: 'auto'}}>
                                    <img src={ConvertToImageURL(newsDetail.imageUrl)} width="100%" />
                                </Typography>
                                <Typography variant='body1' component='div' align='left' sx={{ margin: 'auto', marginTop: '20px', whiteSpace: 'pre-wrap', lineHeight: '2' }}>
                                    {newsDetail.description}
                                </Typography>

                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6" component="div" sx={{ marginTop: { xs: '20px', md: '20px' } }}>
                                    ĐỌC NHIỀU
                                </Typography>
                                {
                                    listNews && listNews.map((item, index) => (
                                        <Link to={`/tin-tuc/${item._id}`} key={index} style={{ textDecoration: 'none' }} onClick={() => { onLoad(!load) }}>
                                            <Divider style={{ margin: '5px 0' }} />
                                            <Grid container item xs={12} key={index} style={{ padding: '10px', cursor: 'pointer' }}>
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
                                                            'WebkitLineClamp': '2',
                                                            'WebkitBoxOrient': 'vertical'
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
                )
            }
        </div>
    );
}

export default NewsDetail;