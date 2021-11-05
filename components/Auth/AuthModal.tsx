import React, { SetStateAction } from 'react';
import AuthForm from './AuthForm';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';

import styles from '../../styles/Home.module.css';

type AuthModal = {
  open: boolean;
  handleClose: (value: SetStateAction<SetStateAction<boolean>>) => void;
};

export const AuthModal = ({ open, handleClose }: AuthModal): JSX.Element => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={styles.modal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box>
        <AuthForm />
      </Box>
    </Modal>
  );
};
