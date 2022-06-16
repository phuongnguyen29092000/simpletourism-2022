import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import PaymentWithPaypal from 'components/Payment/PaymentWithPaypal';
import React from 'react';

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
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{...style, width: 400 }}>
                <h2 id="parent-modal-title">Thanh toán tour {infoPayment.tourName}</h2>
                <PaymentWithPaypal totalPrice={infoPayment.cost} idTicket={infoPayment.idTicket} handleClose={handleClose} onClose={onClose}/>
            </Box>
        </Modal>
    );
};

export default PaymentModal;