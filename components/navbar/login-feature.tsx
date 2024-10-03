'use client'
import styles from '@/styles/components/Footer.module.css'
import { useState } from 'react'
import { Suspense } from 'react';
import Image from "next/image";
import { useCluster } from '../cluster/cluster-data-access';
import {
    ClusterChecker,
    ClusterUiSelect,
    ExplorerLink,
} from '../cluster/cluster-ui';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card-ui"
import { WalletButton } from '../solana/solana-provider';
import Link from 'next/link';
import DarkModeButton from '@/components/ui/buttons/DarkModeButton';
import { Button } from '@/components/ui/shadcn/button-ui';
import toast from 'react-hot-toast';
import { useTheme } from '@/hooks/use-theme';
import { fadeIn, slideIn } from '@/styles/animations';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/shadcn/label-ui';
type NavItemsProps = {
    href?: string;
    children: React.ReactNode;
    index: number;
    delay: number;
    onClick?: (event: React.MouseEvent) => void;
};

type LoginFeatureProps = {
    isOpen: boolean;
    onClose: () => void;
    onCompleted: () => void;
};

const NavItem = ({ href, children, onClick, index, delay }: NavItemsProps) => {
    return (
      <motion.li
        className="group"
        variants={slideIn({ delay: delay + index / 10, direction: 'down' })}
        initial="hidden"
        animate="show"
      >
        <Link
          href={href || `/#${children}`}
          className="block p-2 duration-500 hover:text-accent"
        >
          <Label className="text-secondary text-lg">{children}</Label>
        </Link>
      </motion.li>
    );
  };
export default function LoginFeature({
    links,
    LoginFeatureProps,
}: {
  links: { label: string; path: string }[];
    LoginFeatureProps: LoginFeatureProps;
}) {
    const { cluster } = useCluster();
    const [clusterSelectCollapsed, setClusterSelectCollapsed] = useState(true);
    const handleCopy = (e: string) => {
        console.log(e);
        navigator.clipboard.writeText(e);
        toast.success('Email Copied to Clipboard');
    };
    const { isDarkMode, toggle } = useTheme();
    const ANIMATION_DELAY = 0.2;
    const links2 = [
        { label: 'Home', path: '/' },
        { label: 'What is Artisan?', path: '#artisan' },
        { label: 'About Us', path: '/about' },
    ];
    return (
        <Suspense fallback={<div />}>
            {LoginFeatureProps.isOpen && (
                <nav className="bg-transparent flex flex-col justify-end pb-28 items-left absolute text-sm duration-200 z-50 w-full h-screen self-center left-1/2 -translate-x-1/2 top-full h-max shadow-xl p-6 md:blocks md:static md:w-auto md:left-auto md:transform-none md:top-auto md:rounded-none md:shadow-none  md:h-auto gap-12">
                    <ul className="flex flex-col items-stretch gap-6 list-style-none lg:gap-5 xl:gap-6 md:flex-row md:items-center">
                        {links2.map(({ label, path }, i) => (
                            <NavItem
                                key={i}
                                href={path}
                                index={i}
                                delay={ANIMATION_DELAY}
                                // onClick={() => setNavbarCollapsed(false)}
                            >
                                {label}
                            </NavItem>
                        ))}
                        <Button className="bg-transparent w-3/4 text-secondary rounded-full border-2 border-secondary">
                            Read the white paper 
                        </Button>
                        <Button className="bg-secondary text-primary w-3/4 rounded-full">
                            Explore the Marketplace
                        </Button>
                        {/* {!clusterSelectCollapsed && (
                            <ClusterUiSelect /> 
                        )}
                        <div className="flex flex-col items-center justify-between gap-5 xl:gap-6">
                            <div className="flex flex-row items-center gap-5">
                                <p className="text-bgsecondary">Current RPC:</p>            
                                <Button className='bg-secondary text-bgsecondary' onClick={()=> setClusterSelectCollapsed(!clusterSelectCollapsed)}>
                                    {cluster.name}
                                </Button>
                            </div>
                        </div> */}
                    </ul>
                    <CardFooter className="flex flex-row w-full items-center gap-8 items-center justify-between ">
                        <DarkModeButton
                            //   onClick={() => (console.log('click'))}
                            variants={slideIn({
                                delay: ANIMATION_DELAY + (links.length + 1) / 10,
                                direction: 'down',
                            })}
                            initial="hidden"
                            animate="show"
                        />
                        <div className="flex flex-row gap-2">
                            <Image
                                src={'/logos/sol-logo-grey.svg'}
                                width={25}
                                height={25}
                                alt='Solana Logo'
                            />
                            <p className='text-bgsecondary dark:text-secondary'>
                                Powered by Solana
                            </p>
                        </div>
                    </CardFooter> 
                </nav>
            )}
        </Suspense>
    )
}