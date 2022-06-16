import { Box, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TourForm from './NewsForm';
import {useDispatch, useSelector} from 'react-redux'
import { getAllNews, addNews, updateNews} from '../../../redux/reducers/news/action'
import { format } from 'date-fns';

const AddNewsModal = ({ open, handleClose, news, action }) => {
    const dispatch = useDispatch()
    const [submit, setSubmit] = useState(false) 
    const { listNews } = useSelector((store)=>store.news)

    useEffect(()=>{
        dispatch(getAllNews())
    },[])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        boxShadow: 24,
        overflow: 'hidden',
        borderRadius:'5px',
    };

    const handleAddNews = (data)=>{
        dispatch(addNews(data, handleClose))
    }

    const handleUpdateNews = (id, data) =>{
        dispatch(updateNews(id, data, handleClose))
    }
    return (
        <div className='add-tour-modal'>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box sx={style}>
                    <div className='modal-header'>
                        <div className='modal-title'>
                            <h3>{action}</h3>
                        </div>
                    </div>
                    <div className='modal-body'>
                        <TourForm handleAddNews={handleAddNews} handleUpdateNews={handleUpdateNews} submit={submit} setSubmit={setSubmit} news={news}/>
                    </div>
                    <div className='modal-footer'>
                        <div className='btn-footer'>
                            <Button variant="contained" className='btn-footer__action btn-add' onClick={()=>setSubmit(true)}>Lưu</Button>
                            <Button variant="contained" className='btn-footer__action btn-cancel' onClick={() => handleClose(false)}>Hủy</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default AddNewsModal;