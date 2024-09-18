'use client'
import { Suspense, useEffect, useState } from 'react';
import { useTheme } from '@/lib/hooks/use-theme';
import { WalletButton } from '../solana/solana-provider';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/shadcn/input-ui';
import { usePathname } from 'next/navigation';
import { fadeIn, slideIn } from '@/styles/animations';
import useWindowWidth from '@/lib/hooks/use-window-width';
import { getBreakpointsWidth } from '@/lib/utils/helper';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import DarkModeButton from '@/components/ui/buttons/DarkModeButton';
import { Button } from '@/components/ui/shadcn/button-ui';
import NavButton from '@/components/ui/buttons/NavButton';
import { GearIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import LoginFeature from './login-feature';
import LoginDialog from './login-dialog'
import { useCluster } from '../cluster/cluster-data-access';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu-ui"

import {
    ClusterChecker,
    ClusterUiSelect,
    ExplorerLink,
} from '../cluster/cluster-ui';
import { publicKey } from '@metaplex-foundation/umi';
import { useWallet } from '@solana/wallet-adapter-react';
import { SearchIcon } from 'lucide-react';

interface NavbarProps {
  scrollThreshold?: number;
  blurAmount?: number;
}
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

interface NavbarProps {
  links: { label: string; path: string }[];
  scrollThreshold?: number;
  blurAmount?: number;
}

type NavItemsProps = {
    href?: string;
    children: React.ReactNode;
    index: number;
    delay: number;
    onClick?: (event: React.MouseEvent) => void;
};

const links2 = [
  { label: 'Home', path: '/' },
  { label: 'What is Artisan?', path: '#artisan' },
  { label: 'About Us', path: '/about' },
];

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
  
  
const NavbarFeature: React.FC<NavbarProps> = ({ links, scrollThreshold = 100, blurAmount = 10 }) => {
  const { isDarkMode } = useTheme();
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const { publicKey } = useWallet();


  useEffect(() => {
    const hideNavWhileScrolling = () => {
      const nav = document.getElementById('navbar');
      if (!nav) return;

      let prevScrollPos = window.pageYOffset;

      window.onscroll = () => {
        if (!navbarCollapsed) {
          const curScrollPos = window.pageYOffset;
          if (prevScrollPos < curScrollPos) nav.style.top = `-100px`;
          else nav.style.top = '0';
          prevScrollPos = curScrollPos;
        }
      };
    };

    hideNavWhileScrolling();
  }, [navbarCollapsed]);
    
  useEffect(() => {
    hideNavWhileScrolling({ when: !navbarCollapsed });
  }, [navbarCollapsed]);


  
    return (
      <Suspense fallback={<div />}>
        {/* MOBILE NAVBAR */}
        <motion.header
          variants={fadeIn(0.5)}
          initial="hidden"
          animate="show"
          id="navbar"
          className="fixed inset-x-0 top-0 right-0 z-50 flex items-end align-center justify-between px-8 py-4 duration-500 md:px-6 xl:px-12 backdrop-blur-lg md:hidden lg:hidden"
        >
          {/* div for backdrop when !navbarCollapsed */}
          <div
            className={`bg-gradient-to-r from-bg to-accent fixed -z-50 inset-0 bg-opacity-50 duration-500 h-screen ${
              !navbarCollapsed ? 'hidden' : ''
            }`}
          >
            <Image
              src={'/logos/logo-blur.svg'}
              alt="Logo"
              layout="fill"
              objectFit="cover"
              quality={100}
              className='-z-200 opacity-25
              // move it to the right
              transform translate-x-10
              '
            />
          </div>
          <div
            className={`bg-bg opacity-50 fixed -z-100 inset-0 bg-opacity-50 duration-500 h-screen ${
              !navbarCollapsed ? 'hidden' : ''
            }`}
          ></div>
          
          
          <div className="dark:hidden relative text-2xl capitalize font-signature text-accent group top-1">
            <Link href="/">
              <Image
                src={ isDarkMode ? '/logos/artisan-small-logo-white.svg' : '/logos/artisan-small-logo-black.svg'}
                alt="Logo"
                width={25}
                height={25}
                className="cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </Link>
          </div>
          
          {navbarCollapsed && (
            <WalletButton style={{ width: 'fit-content' }} className='z-61'>
              {publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : 'Connect Wallet'}
            </WalletButton>
          )}
          <NavButton
            onClick={() => {
              setNavbarCollapsed((prev) => !prev);
            }}
            navbarCollapsed={navbarCollapsed}
            className="text-secondary"
          />
    
          {navbarCollapsed && (
            <LoginFeature 
              links={links}
              LoginFeatureProps={{ 
                isOpen: navbarCollapsed,
                onClose: () => setNavbarCollapsed(false),
                onCompleted: () => setNavbarCollapsed(false),
              }}
            />
          )}
        </motion.header>

        {/* DESKTOP NAVBAR */}
        <motion.header
          variants={fadeIn(0.5)}
          initial="hidden"
          animate="show"
          id="navbar"
          className="hidden md:flex lg:flex fixed inset-x-0 top-0 right-0 z-50 items-center justify-between px-8 py-4 duration-500 md:px-6 xl:px-12 backdrop-blur-lg w-full"
          style={{ backgroundColor: '#ffffff0e' }}
        >
          
          <div className="flex flex-row gap-6">
            <div className={`relative text-2xl capitalize font-signature text-accent group top-1 ${isDarkMode ? 'hidden dark:flex' : 'dark:hidden'}`}>
              <Link href="/">
                <Image
                  src={isDarkMode ? '/logos/artisan-small-logo-white.svg' : '/logos/artisan-small-logo-black.svg'}
                  alt="Logo"
                  width={32}
                  height={32}
                  className="cursor-pointer"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                />
              </Link>
            </div>
            {/* <div
              className={`flex flex-row items-center justify-start px-2 border-2  rounded-xl bg-bg w-1/2`}
            >
              <SearchIcon className="text-slate-400" />
              <Input type="text" placeholder={`Search any fraction, product...`} className="bg-bg text-slate-400 border-none shadow-none" />
            </div> */}
            
            <div className="flex flex-row  items-center gap-1 text-nowrap">
              <Image
                src='/logos/sol-logo-grey.svg'
                alt="Search"
                width={25}
                height={25}
                className="cursor-pointer"
              />
              <p className="text-slate-400 w-full ">Powered by Solana</p>
            </div>
          </div>
          
          {navbarCollapsed && (
            <WalletButton style={{ width: 'fit-content', zIndex: '61'}}>
              {publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : 'Connect Wallet'}
            </WalletButton>
          )}

          {/* Map Links in separate div */}
          <ul className="flex flex-row items-stretch gap-6 list-style-none lg:gap-5 xl:gap-6 md:flex-row md:items-center">
            <Button variant={'ghost'} asChild>
              <Link className="text-secondary text-nowrap w-full " href='/about'>
                About Us
              </Link>
            </Button>
            
            <Button className="bg-bg text-dark-1 border-dark-1 border-2 w-3/4 rounded-xl border-y border-x" asChild>
              <Link className="text-dark-1 text-nowrap w-full " href='/marketplace'>
                Explore the Marketplace <ChevronRightIcon />
              </Link>
            </Button>

            <LoginDialog />
          </ul>
        </motion.header>
      </Suspense>
    );
  };

export default NavbarFeature;
