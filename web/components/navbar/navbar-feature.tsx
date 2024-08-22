'use client'
import { Suspense, useEffect, useState } from 'react';
import { useTheme } from '@/lib/hooks/use-theme';
import { WalletButton } from '../solana/solana-provider';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { fadeIn, slideIn } from '@/styles/animations';
import useWindowWidth from '@/lib/hooks/use-window-width';
import { getBreakpointsWidth } from '@/lib/utils/helper';
import { motion } from 'framer-motion';
import DarkModeButton from '@/components/buttons/DarkModeButton';
import Button from '@/components/buttons/Button'
import NavButton from '@/components/buttons/NavButton';
import { useCluster } from '../cluster/cluster-data-access';
import * as CLink from '@/components/buttons/Link';
import {
    ClusterChecker,
    ClusterUiSelect,
    ExplorerLink,
} from '../cluster/cluster-ui';

/**
 * Hides the navbar while scrolling down
 * @param {Object} config
 * @param {String} [config.id=navbar] - id of navbar
 * @param {Number} [config.offset=100] - offset of navbar in px
 */
const hideNavWhileScrolling = ({
    id = 'navbar',
    offset = 100,
    when = true,
}: {
    id?: string;
    offset?: number;
    when: boolean;
}) => {
    const nav = document.getElementById(id);
    if (!nav) return;

    let prevScrollPos = window.pageYOffset;

    window.onscroll = () => {
        if (when) {
        const curScrollPos = window.pageYOffset;
        if (prevScrollPos < curScrollPos) nav.style.top = `-${offset}px`;
        else nav.style.top = '0';
        prevScrollPos = curScrollPos;
        }
    };
};
type NavItemsProps = {
    href?: string;
    children: React.ReactNode;
    index: number;
    delay: number;
    onClick?: (event: React.MouseEvent) => void;
};

const NavItem = ({ href, children, onClick, index, delay }: NavItemsProps) => {
    return (
      <motion.li
        className="group"
        variants={slideIn({ delay: delay + index / 10, direction: 'down' })}
        initial="hidden"
        animate="show"
      >
        {/* <CLink
          href={href || `/#${children}`}
          className="block p-2 duration-500 hover:text-accent"
          onClick={onClick}
          withPadding
        >
          {children}
        </CLink> */}
      </motion.li>
    );
  };

export default function NavbarFeature({
    links,
  }: {
    links: { label: string; path: string }[];
  })  {
    const { isDarkMode, toggle } = useTheme();
    const [navbarCollapsed, setNavbarCollapsed] = useState(false);
    const [clusterSelectCollapsed, setClusterSelectCollapsed] = useState(true);
    const [activeLogo, setActiveLogo] = useState('logo_dark');
    const ANIMATION_DELAY = 0.2;
    const { cluster } = useCluster();
    useEffect(() => {
      hideNavWhileScrolling({ when: !navbarCollapsed });
    }, [navbarCollapsed]);
  
    useEffect(() => {
    //   setActiveLogo(isDarkMode ? logo_dark : logo_bright);
    }, [isDarkMode]); 
  
    return (
      <Suspense fallback={<div />}>
      <motion.header
        variants={fadeIn(0.5)}
        initial="hidden"
        animate="show"
        id="navbar"
        className="fixed inset-x-0 top-0 right-0 z-50 flex items-end justify-between px-8 py-4 duration-500 md:px-6 xl:px-12 backdrop-blur-lg"
      >
        
        <div className="relative text-2xl capitalize font-signature text-accent group top-1">
          <Image
            src='/logos/artisan-small-logo.svg'
            alt="Logo"
            width={25}
            height={25}
            className="cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
  
        <NavButton
          onClick={() => {
            setNavbarCollapsed((prev) => !prev);
          }}
          navbarCollapsed={navbarCollapsed}
          className="md:invisible"
        />
  
        {navbarCollapsed && (
          <nav className="bg-white flex flex-col items-center capitalize absolute text-sm duration-200 z-50 w-[90%] left-1/2 -translate-x-1/2 top-full h-max rounded-xl shadow-xl p-6 md:blocks md:static md:w-auto md:left-auto md:transform-none md:top-auto md:rounded-none md:shadow-none md:p-0 md:h-auto">
            <ul className="flex flex-col items-stretch gap-3 list-style-none lg:gap-5 xl:gap-6 md:flex-row md:items-center">
              {links.map(({ label, path }, i) => (
                <NavItem
                  key={i}
                  href={path}
                  index={i}
                  delay={ANIMATION_DELAY}
                  onClick={() => setNavbarCollapsed(false)}
                >
                  {label}
                </NavItem>
              ))}
            <WalletButton style={{ width: 'fit-content' }}/>
            {!clusterSelectCollapsed && (
                <ClusterUiSelect /> 
            )}
              <div className="flex flex-col items-center justify-between gap-5 xl:gap-6">
                <div className="flex flex-row items-center gap-5">
                    <p className="">Current RPC:</p>            
                    <Button
                        type="button"
                        variants={slideIn({
                          delay: .3,
                          direction: 'down',
                        })}
                        onClick={() => setClusterSelectCollapsed((prev) => !prev)}
                        initial="hidden"
                        animate="show"
                    >
                        {cluster.name}
                    </Button>
                </div>
                <DarkModeButton
                //   onClick={() => (console.log('click'))}
                  variants={slideIn({
                    delay: ANIMATION_DELAY + (links.length + 1) / 10,
                    direction: 'down',
                  })}
                  initial="hidden"
                  animate="show"
                />
              </div>
            </ul>
          </nav>
        )}
      </motion.header>
      </Suspense>
    );
  };