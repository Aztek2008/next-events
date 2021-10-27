import React from 'react';
import styles from '../../styles/Home.module.css';

type ButtonProps = {
  signOption: () => void;
  text: string;
};

export const SignButton = ({ signOption, text }: ButtonProps): JSX.Element => (
  <button className={styles.button} onClick={signOption}>
    {text}
  </button>
);
