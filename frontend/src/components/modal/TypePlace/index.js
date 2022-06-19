import { Box, Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TypePlaceForm from './TypePlaceForm';
import {useDispatch, useSelector} from 'react-redux'
import { getTypePlace, createTypePlace, updateTypePlace} from '../../../redux/reducers/typePlace/action'

const AddTypePlaceModal = ({ open, handleClose, typePlace, action }) => {
    const dispatch = useDispatch()
    const [submit, setSubmit] = useState(false) 

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'background.paper',
        boxShadow: 24,
        overflow: 'hidden',
        borderRadius:'5px',
    };

    const handleAddTypePlace = (data)=>{
        dispatch(createTypePlace(data, handleClose))
    }

    const handleUpdateTypePlace= (id, data) =>{
        dispatch(updateTypePlace(id, data, handleClose))
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
                        <TypePlaceForm handleAddTypePlace={handleAddTypePlace} handleUpdateTypePlace={handleUpdateTypePlace} submit={submit} setSubmit={setSubmit} typePlace={typePlace}/>
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

export default AddTypePlaceModal;