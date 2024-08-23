'use client';
import styles from '@/styles/charts/ChartB.module.css';
import SquareCard from '@/components/ui/cards/SquareCard';

const ChartB = () => {

  return (
    <SquareCard>
        <div className={styles.container}>
            <h6>Collection Stats</h6>
            <p>
                +6% volume in last 24 hours
            </p>
        </div>
    </SquareCard>
  );
};

export default ChartB;
