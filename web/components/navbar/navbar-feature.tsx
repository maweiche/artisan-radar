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
import { motion } from 'framer-motion';
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
    const { publicKey } = useWallet();
    useEffect(() => {
      hideNavWhileScrolling({ when: !navbarCollapsed });
    }, [navbarCollapsed]);
  
    useEffect(() => {
    //   setActiveLogo(isDarkMode ? logo_dark : logo_bright);
    }, [isDarkMode]); 
  
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
            <Image
              src='/logos/artisan-small-logo-black.svg'
              alt="Logo"
              width={25}
              height={25}
              className="cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
          <div className="hidden dark:flex relative text-2xl capitalize font-signature text-accent group top-1">
            <Image
              src='/logos/artisan-small-logo-white.svg'
              alt="Logo"
              width={32}
              height={32}
              className="cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
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
          // style={{ backgroundColor: 'red'}}
          className="hidden md:flex lg:flex 
            fixed inset-x-0 top-5 right-0 z-50 
            flex items-end align-center justify-between 
            px-8 py-4 duration-500 md:px-6 xl:px-12
            w-10/12 mx-auto          "
        >
          <div className="flex flex-row gap-3">
            <div className="dark:hidden relative text-2xl capitalize font-signature text-accent group top-1">
              <Image
                src='/logos/artisan-small-logo-black.svg'
                alt="Logo"
                width={25}
                height={25}
                className="cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>

            <div className="hidden dark:flex relative text-2xl capitalize font-signature text-accent group top-1">
              <Image
                src='/logos/artisan-small-logo-white.svg'
                alt="Logo"
                width={32}
                height={32}
                className="cursor-pointer"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
            <div
              className={`flex flex-row items-center justify-start px-2 border-2  rounded-xl bg-bg w-1/2`}
            >
              <SearchIcon className="text-slate-400" />
              <Input type="text" placeholder={`Search any fraction, product...`} className="bg-bg text-slate-400 border-none shadow-none" />
            </div>
            
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
              <Link className="text-secondary text-nowrap w-full " href='/'>
                About Us
              </Link>
            </Button>
            
            <Button className="bg-bg text-dark-1 border-dark-1 border-2 w-3/4 rounded-xl border-y border-x" asChild>
              <Link className="text-dark-1 text-nowrap w-full " href='/'>
                Explore the Marketplace <ChevronRightIcon />
              </Link>
            </Button>

            <LoginDialog />
            {/* {!clusterSelectCollapsed && (
                <ClusterUiSelect /> 
            )} */}
            {/* <div className="flex flex-col items-center justify-between gap-5 xl:gap-6">
                <div className="flex flex-row items-center gap-5">
                    <p className="text-bgSecondary">Current RPC:</p>            
                    <Button className='bg-secondary text-bgSecondaryText' onClick={()=> setClusterSelectCollapsed(!clusterSelectCollapsed)}>
                        {cluster.name}
                    </Button>
                </div>
            </div> */}
          </ul>
          {/* <Button variant={'ghost'}>
            
          </Button> */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger><GearIcon style={{ width: '30px', height:'30px'}} className="text-secondary" /></DropdownMenuTrigger>
            <DropdownMenuContent className='bg-bg text-secondary flex flex-col w-full items-center justify-center'> */}
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator /> */}
              {/* <DropdownMenuItem> */}
                {/* <div className="flex flex-row items-center gap-5">
                  <p className="text-bgSecondary">Current RPC:</p>            
                  <Button className='bg-secondary text-bgSecondaryText' onClick={()=> setClusterSelectCollapsed(!clusterSelectCollapsed)}>
                      {cluster.name}
                  </Button>
                </div> */}
              {/* </DropdownMenuItem> */}
              {/* <DropdownMenuItem>
                <p className="dark:hidden">Light Mode:</p>
                <p className="hidden dark:flex">Dark Mode:</p>
                <DarkModeButton
                  //   onClick={() => (console.log('click'))}
                  variants={slideIn({
                      delay: ANIMATION_DELAY + (links.length + 1) / 10,
                      direction: 'down',
                  })}
                  initial="hidden"
                  animate="show"
                />
              </DropdownMenuItem> */}
              {/* <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem> */}
              {/* <DropdownMenuItem className='flex flex-col'>
                {!clusterSelectCollapsed && (
                  <ClusterUiSelect /> 
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </motion.header>
      </Suspense>
    );
  };