import React from 'react';
import { Box } from '@mui/system';
import AuthForm from '../AuthForm/AuthForm';
import { Button, Modal, Typography } from '@mui/material';

import styles from '../../styles/Home.module.css';

// type ModalProps = {
//   open: boolean;
//   handleClose: boolean;
// };

export const AuthModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={styles.modal}>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          <AuthForm />
        </Typography>
      </Box>
    </Modal>
  );
};
