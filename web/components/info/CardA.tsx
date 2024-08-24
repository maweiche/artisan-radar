'use client';
import styles from '@/styles/info/CardA.module.css';

const CardA = () => {

  return (
    <div>
        <div className={styles.container}>
            <div className={styles.textBlock}>
                <span>All Luxury Goods on our platform are authenticated,</span> certified, and securely stored in a third-party vault.
            </div>
        </div>
    </div>
  );
};

export default CardA;
