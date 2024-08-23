'use client';
import styles from '@/styles/cards/SquareCard.module.css';

import { motion, MotionProps } from 'framer-motion';

interface DefaultProps {
  children: React.ReactNode | string;
  className?: string;
}

interface ButtonProps extends DefaultProps {
  onClick?: (event: React.MouseEvent) => void;
}

type Props = ({ type?: 'button'; } & ButtonProps)

const SquareCard = (props: Props & MotionProps) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.container} onClick={props.onClick}>
      {children}
    </div>
  );

};

export default SquareCard;
