import { Grid, Container } from '@mui/material';
import React from 'react';
// import imageIntroduce1 from '../../public/imageIntroduce1.jpg'
// import imageIntroduce2 from '../../public/imageIntroduce2.jpg'

const HotPlaces = () => {
    return (
        <div className='hot-places-session'>
            <Container maxWidth='lg' className="hot-places-component">
                <Grid className='hot-places-content' container>
                    <Grid className='hot-places-content__col left' container item xs={12} sm={6}>
                        <Grid className='hot-places-content__col__image' item xs={12}>
                            <img className='image-introduce' src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870" />
                        </Grid>
                        <Grid className='hot-places-content__col__text' item xs={12} sx={{marginTop:'20px'}}>
                            <h4>Hồ Prags/ Italia</h4>
                            <h1>viên ngọc trai của dãy Alps</h1>
                            <p>Hồ Prags còn gọi là Pragser Wildsee hoặc hồ Braies. Đây là một hồ ở Prags Dolomites miền Nam Tyrol, nước Ý. Nhờ vị trí ngay thung lũng được bao quanh bởi nhiều ngọn núi tuyết, nước chảy về hồ từ cuối mùa đông luôn rất tinh khiết, với độ trong gần như hoàn hảo giúp tạo nên cảnh tượng long lanh khó tả. Đó cũng là lý do mà hồ này còn được ví von là viên ngọc trai của dãy Alps.
                            </p>
                        </Grid>
                    </Grid>
                    <Grid className='hot-places-content__col right' container item xs={12} sm={6} sx={{flexWrap: {xs: 'wrap-reverse', sm:'wrap'}}}>
                        <Grid className='hot-places-content__col__text' item xs={12} sx={{marginBottom:'20px'}}>
                        <h4>Hồ Prags/ Italia</h4>
                            <h1>viên ngọc trai của dãy Alps</h1>
                            <p>Hồ Prags còn gọi là Pragser Wildsee hoặc hồ Braies. Đây là một hồ ở Prags Dolomites miền Nam Tyrol, nước Ý. Nhờ vị trí ngay thung lũng được bao quanh bởi nhiều ngọn núi tuyết, nước chảy về hồ từ cuối mùa đông luôn rất tinh khiết, với độ trong gần như hoàn hảo giúp tạo nên cảnh tượng long lanh khó tả. Đó cũng là lý do mà hồ này còn được ví von là viên ngọc trai của dãy Alps.
                            </p>
                        </Grid>
                        <Grid className='hot-places-content__col__image' item xs={12}>
                            <img className='image-introduce' src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070" />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default HotPlaces;