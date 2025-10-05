import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainContent from '../../components/MainContent/MainContent';
import styles from './welcome.module.css';

export default function Welcome() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.appBody}>
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}