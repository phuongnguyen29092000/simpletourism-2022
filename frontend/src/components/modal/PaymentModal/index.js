import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const PaymentModal = ({open, onClose}) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">Text in a modal</h2>
                <p id="parent-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
            </Box>
        </Modal>
    );
};

export default PaymentModal;