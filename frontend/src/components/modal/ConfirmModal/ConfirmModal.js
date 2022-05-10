import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles';

const ConfirmModal = ({openConfirmModal, setOpenConfirmModal, title, content, handleAction}) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={openConfirmModal}
                onClose={()=>setOpenConfirmModal(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleAction}>
                        Xác nhận
                    </Button>
                    <Button onClick={()=>setOpenConfirmModal(false)} autoFocus>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmModal;