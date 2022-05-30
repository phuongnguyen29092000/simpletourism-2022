import React from 'react';
import Forward30Icon from '@mui/icons-material/Forward30';
import RecommendIcon from '@mui/icons-material/Recommend';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';

function AdvantageCard(props) {
    return (
        <div className='advantage-wrapper' style={{
            backgroundImage:"url('https://images.pexels.com/photos/2079228/pexels-photo-2079228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            padding:'50px 0',
            backgroundSize: 'cover',
            }}>
            <Container maxWidth="xl">
                <h2 style={{color:"black"}}>TẠI SAO BẠN NÊN CHỌN CHÚNG TÔI?</h2>
                <h4 style={{color:"black"}}>NHỮNG ĐIỀU CHÚNG TÔI MANG ĐẾN CHO BẠN</h4>
                <Box sx={{ flexGrow: 1, padding: '0 20px', marginTop: '50px' }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={4} sm={6} >
                            <Card sx={{backgroundColor:'mintcream',}}>
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle1" component="div" align='center'>
                                        <Forward30Icon sx={{fontSize:"5em", color:'darkcyan'}}/>
                                    </Typography>
                                    <Typography variant="h5" color="cadetblue" align="center" component='div'>
                                        NHANH CHÓNG
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" align="left" component='div'>
                                    Phương châm hoạt động của công ty là để mọi người mọi nhà đều có thể đi du lịch với giá cả hợp lý nhất.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6} >
                            <Card sx={{backgroundColor:'mintcream',}}>
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle1" component="div" align='center'>
                                        <RecommendIcon sx={{fontSize:"5em", color:'darkcyan'}}/>
                                    </Typography>
                                    <Typography variant="h5" color="cadetblue" align="center" component='div'>
                                        UY TÍN
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" align="left" component='div'>
                                    Phương châm hoạt động của công ty là để mọi người mọi nhà đều có thể đi du lịch với giá cả hợp lý nhất.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4} sm={6}>
                            <Card sx={{backgroundColor:'mintcream',}}>
                                <CardContent>
                                    <Typography gutterBottom variant="subtitle1" component="div" align='center'>
                                        <PriceCheckIcon sx={{fontSize:"5em", color:'darkcyan'}}/>
                                    </Typography>
                                    <Typography variant="h5" color="cadetblue" align="center" component="div">
                                        GIÁ TỐT
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" align="left" component="div">
                                    Phương châm hoạt động của công ty là để mọi người mọi nhà đều có thể đi du lịch với giá cả hợp lý nhất.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default AdvantageCard;