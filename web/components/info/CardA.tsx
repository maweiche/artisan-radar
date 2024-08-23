'use client';
import styles from '@/styles/info/CardA.module.css';
import LongCard from '@/components/ui/cards/LongCard';

const CardA = () => {

  return (
    <LongCard>
        <div className={styles.container}>
            <div className={styles.textBlock}>
                <span>All Luxury Goods on our platform are authenticated,</span> certified, and securely stored in a third-party vault.
            </div>
        </div>
    </LongCard>
  );
};

export default CardA;
