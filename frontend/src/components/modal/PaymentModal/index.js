import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import AuthAPI from 'api/AuthAPI';
import PaymentWithPaypal from 'components/Payment/PaymentWithPaypal';
import useNotification from 'hooks/notification';
import React, { useEffect, useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundColor: 'antiquewhite'
  };
const PaymentModal = ({open, handleClose, infoPayment, onClose}) => {
    const [clientId, setClientId] = useState('')
    useEffect(() => {
        console.log(infoPayment);
        AuthAPI.getPaypalInfor(infoPayment.idTicket)
        .then((rs) => {
            if(rs.status === 200) {
                setClientId(rs.data.client_id)
            }
        })
        .catch((e) => {
            useNotification.Error({
                title: 'Lỗi!',
                message:"Server Eror"
            })
        })
    },[infoPayment])
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{...style, width: 400 }}>
                <h2 id="parent-modal-title">Thanh toán tour {infoPayment.tourName}</h2>
                { 
                  clientId && <PaymentWithPaypal totalPrice={infoPayment.cost} clientId={clientId} idTicket={infoPayment.idTicket} handleClose={handleClose} onClose={onClose}/>
                }
            </Box>
        </Modal>
    );
};

export default PaymentModal;