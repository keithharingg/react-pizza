import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>Nothing has been found...</h1>
      <p>Unfortunately this page is unavailable</p>
    </div>
  );
};

export default NotFoundBlock;
