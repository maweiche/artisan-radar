'use client';
import { removeKeys } from '@/lib/utils/helper';

import { motion, MotionProps } from 'framer-motion';

interface DefaultProps {
  children: React.ReactNode | string;
  className?: string;
  size?: 'lg' | 'sm';
  center?: boolean;
}

interface LinkProps extends DefaultProps {
  href: string;
  sameTab?: boolean;
}

interface ButtonProps extends DefaultProps {
  onClick?: (event: React.MouseEvent) => void;
}

type Props =
  | ({
      type?: 'button';
    } & ButtonProps)
  // | ({
  //     type: 'link';
  //   } & LinkProps);

// For separating animation props from button props
const buttonProps: Array<keyof Props | keyof LinkProps> = [
  'center',
  'children',
  'className',
  'size',
  'type',
  'href',
];

const Button = (props: Props & MotionProps) => {
  const {
    className,
    children,
    type = 'button',
    size = 'sm',
    center = false,
  } = props;

  const classes = `${
    size === 'sm'
      ? 'p-2 px-4 text-sm border-[1.5px] '
      : 'text-sm p-4 px-6 border-2'
  } block ${
    center ? 'mx-auto' : ''
  } w-fit font-mono capitalize rounded border-accent text-accent hover:bg-accent-light focus:outline-none focus:bg-accent-light duration-150 cursor-pointer ${className}`;

  return (
    <button type={type} className={classes} onClick={props.onClick}>
      {children}
    </button>
  );

};

export default Button;
