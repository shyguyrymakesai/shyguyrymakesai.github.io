import React from 'react';
import KameGallery from '../components/KameGallery';
import styles from '../styles/kamestyle.module.css';

export default function KamePage() {
  return (
    <main className={styles.page}>
      <KameGallery />
    </main>
  );
}
