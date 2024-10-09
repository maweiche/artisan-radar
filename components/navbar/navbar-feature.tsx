'use client'
import { Suspense, use, useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { WalletButton } from '../solana/solana-provider';
import Link from 'next/link';
import { ReadonlyURLSearchParams, useRouter } from 'next/navigation'
import { LoadingFeature } from '@/components/loading/loading-feature';
import { Web3AuthNoModal } from "@web3auth/no-modal";
import Image from 'next/image';
import { IS_USER_REGISTERED } from '@/graphql/queries';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AuthAdapter } from "@web3auth/auth-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-solana-adapter";
import { CHAIN_NAMESPACES, IProvider, UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK, IWeb3AuthCoreOptions, IAdapter } from "@web3auth/base";
import RPC from "@/components/solana/web3auth/solana-rpc";
import { Input } from '@/components/ui/shadcn/input-ui';
import { usePathname } from 'next/navigation';
import { fadeIn, slideIn } from '@/styles/animations';
import useWindowWidth from '@/hooks/use-window-width';
import { getBreakpointsWidth } from '@/utils/helper';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import DarkModeButton from '@/components/ui/buttons/DarkModeButton';
import { Button } from '@/components/ui/shadcn/button-ui';
import NavButton from '@/components/ui/buttons/NavButton';
import { GearIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import LoginFeature from './login-feature';
import LoginDialog from './login-dialog'
import { ChevronDown, Copy, Menu, X } from 'lucide-react'; // Changed to lucide-react icons
import { LogOut, Settings2, ListOrdered, EggFried } from 'lucide-react';
import { IconCurrencySolana } from '@tabler/icons-react';
import ConfirmEmailDialog from './confirm-email-feature';
import { useToast } from '@/hooks/use-toast';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/shadcn/avatar-ui';
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
// import { publicKey } from '@metaplex-foundation/umi';
import { useWallet } from '@solana/wallet-adapter-react';
import { SearchIcon } from 'lucide-react';
import { PublicKey } from '@solana/web3.js';
import { useAuth } from '@/components/apollo/auth-context-provider'

interface NavbarProps {
  searchParams?: ReadonlyURLSearchParams;
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
  
  const clientId = "BI8MhAUT4vK4cfQZRQ_NEUYOHE3dhD4ouJif9SUgbgBeeZwP6wBlXast2pZsQJlney3nPBDb-PcMl9oF6lV67P0"; // get from https://dashboard.web3auth.io
  let defaultSolanaAdapters: IAdapter<unknown>[] = [];
const NavbarFeature: React.FC<NavbarProps> = ({ searchParams, links, scrollThreshold = 100, blurAmount = 10 }) => {
  const _params = searchParams?.get('register') === 'true' ? true : false;
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const [userWallet, setUserWallet] = useState<string | null>(null);
  const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const { user, loginExistingUser, logout, checkAuth } = useAuth();
  const [checkRegistration, { loading: registrationLoading, data, error: registrationError }] = useLazyQuery(IS_USER_REGISTERED);
  // const { publicKey } = useWallet();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    setUserWallet(null);
    router.push('/');
  };

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

  // useEffect(() => {
  //   if(publicKey) {
  //       setUserWallet(publicKey.toBase58());
  //   }
  // }, [publicKey]);

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.SOLANA,
          chainId: "0x3", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
          rpcTarget: "https://api.devnet.solana.com",
          displayName: "Solana Devnet",
          blockExplorerUrl: "https://explorer.solana.com",
          ticker: "SOL",
          tickerName: "Solana Token",
          logo: "",
        };

        const privateKeyProvider = new SolanaPrivateKeyProvider({ config: { chainConfig } });

        const web3authOptions: IWeb3AuthCoreOptions = {
          clientId,
          privateKeyProvider,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        };
        const web3auth = new Web3AuthNoModal(web3authOptions);

        setWeb3auth(web3auth);

        const authAdapter = new AuthAdapter({
          privateKeyProvider,
          adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
          },
        });
        web3auth.configureAdapter(authAdapter);
        // @ts-ignore
        defaultSolanaAdapters = await getDefaultExternalAdapters({ options: web3authOptions });
        defaultSolanaAdapters.forEach((adapter) => {
          web3auth.configureAdapter(adapter);
        });

        await web3auth.init();
        setProvider(web3auth.provider);
        if (web3auth.connected) {
  

          const rpc = new RPC(web3auth.provider!);
          const accounts = await rpc?.getAccounts();
          console.log('accounts', accounts);
          const publicKey = accounts![0];
          console.log('publicKey', publicKey);
          const{ idToken }= await web3auth.authenticateUser();
          const user = await web3auth.getUserInfo();
  
          console.log('user', user);
  
          const userObject= {
              email: user.email || '',
              publicKey: publicKey,
              username: user.name || '',
              profilePictureUrl: user.profileImage || '',
          };  
          console.log('logging in with userObject', userObject);
          console.log('user object', userObject);
  
          const _isRegistered = await checkRegistration({ variables: { publicKey: publicKey } });
          
          console.log('is registered ->', _isRegistered.data.isUserRegistered);
          setUserWallet(userObject.publicKey);

          if (_isRegistered.data.isUserRegistered) {
              console.log('user is registered logging in with userObject', userObject);
              // await loginExistingUser({ email: userObject.email, publicKey: userObject.publicKey });
              const _login = await loginExistingUser({ publicKey: userObject.publicKey });
              console.log('login', _login);
              toast({
                title: 'Welcome back!',
                description: 'You have successfully logged in.',
              })
              // router.push('/dashboard');
          } else {
            router.push('/register');
          }
  
        }
      } catch (error) {
        console.error(error);
      } 
    };

    init().then(() => setLoading(false));
  }, []);


  useEffect(() => {
    if (web3auth && web3auth.connected && !user) {
      checkAuth();
    }
  }, [web3auth, user]);

  // useEffect(() => {
  //   const checkUser = async (_publicKey: PublicKey) => {
  //       console.log('checking user registration ->', _publicKey.toString());
  //       const _isRegistered = await checkRegistration({ variables: { publicKey: _publicKey.toString() } });
  //       console.log('is registered ->', _isRegistered.data);
  //       if (!_isRegistered.data.isUserRegistered) {
  //         router.push('/register');
  //       } 
  //         console.log('user is registered');
  //         // await checkAuth();
  //         setShowConfirmEmail(true);
        
      
  //   }
  //   if(publicKey) {
  //     console.log('checking user registration ->', publicKey.toString());
  //       checkUser(publicKey);
  //   }
  // }, [publicKey]);

  useEffect(() => {
    if(user && !userWallet) {
      console.log('setting user wallet ->', user.publicKey);
      setUserWallet(user.publicKey);
    }
  }, [user]);

  const UserDropdown = ({ publicKey }: { publicKey?: PublicKey }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    const copyToClipboard = (text: any) => {
      navigator.clipboard.writeText(text);
      // You might want to add a toast notification here
    };
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <Avatar>
              <AvatarImage src="" alt="Profile picture" />
              <AvatarFallback>
                <div className="w-16 h-16 rounded-3xl dark:bg-white bg-black"></div>
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="text-secondary" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-72 p-4 bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-300 dark:border-zinc-700"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" alt="Profile picture" />
              <AvatarFallback>
                <div className="w-16 h-16 rounded-3xl dark:bg-white bg-black"></div>
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl text-secondary font-semibold">Username</h2>
              <div className="text-gray-500 flex items-center">
                <span className="truncate mr-1">
                  {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4)}
                </span>
                <Copy
                  className="cursor-pointer"
                  onClick={() => copyToClipboard('Full wallet address here')}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 p-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-3xl">
            <div className="flex justify-between items-center">
              <div className="text-secondary">Buying power</div>
              <div className="text-xl text-secondary font-bold">$128.42</div>
            </div>
            <div className="mt-2 flex items-center">
              <div className="flex-1 flex items-center gap-2 text-secondary">
                <div className="w-4 h-4 rounded-full bg-bg border border-solid border-[#D4D4D8]">
                  <IconCurrencySolana className="w-4 h-4" />
                </div>
                <span>0.1 SOL</span>
              </div>
              <div className="text-zinc-500">=$3.42</div>
            </div>
            <div className="mt-2 flex items-center">
              <div className="flex-1 flex items-center gap-2 text-secondary">
                <div className="w-4 h-4 rounded-full bg-bg border border-solid border-[#D4D4D8]"></div>
                <span>124 USDC</span>
              </div>
              <div className="text-zinc-500">=$124</div>
            </div>
          </div>
          <DropdownMenuItem className="cursor-pointer text-secondary mt-4">
            <Settings2 className="mr-2 h-4 w-4" />
            <span className="text-sm font-semibold">Edit profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-secondary" onClick={()=> router.push('/dashboard')}>
              <ListOrdered className="mr-2 h-4 w-4" />
              <span className="text-sm font-semibold">My orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-secondary">
            <EggFried className="mr-2 h-4 w-4" />
            <span className="text-sm font-semibold">Refer your friends</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-secondary" onClick={()=>{handleLogout()}}>
            <LogOut className="mr-2 h-4 w-4" />
            <span className="text-sm font-semibold">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  
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
            className={`bg-white fixed -z-100 inset-0 duration-500 h-screen ${
              !navbarCollapsed ? 'hidden' : ''
            }`}
          >
            <div
              className={`bg-[url(/logos/logo-blur.svg)] bg-no-repeat bg-cover w-full opacity-25 fixed -z-100 inset-0 duration-500 h-screen ${
                !navbarCollapsed ? 'hidden' : ''
              }`}
            ></div>
          </div>
          
          
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
          
          {/* {navbarCollapsed && web3auth && (web3auth.connected ? <UserDropdown /> : <WalletButton style={{ width: 'fit-content', zIndex: '61'}} />)} */}
          <NavButton
            onClick={() => {
              setNavbarCollapsed((prev) => !prev);
            }}
            navbarCollapsed={navbarCollapsed}
            className="text-primary"
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
          
          {/* {navbarCollapsed && (publicKey ? <UserDropdown /> : <WalletButton style={{ width: 'fit-content', zIndex: '61'}} />)} */}

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
              { loading && <LoadingFeature /> }
              {/* <LoginDialog _isOpen={true} /> */}
              { !loading && (userWallet && !_params ? <UserDropdown publicKey={new PublicKey(userWallet!)}/> : <LoginDialog _isOpen={_params} />) }
          </ul>
        </motion.header>
        {showConfirmEmail && !user && <ConfirmEmailDialog  handleClose={()=>setShowConfirmEmail(false)}/>}
      </Suspense>
    );
  };

export default NavbarFeature;

