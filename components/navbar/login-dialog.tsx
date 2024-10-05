import React, { Suspense, useState, useEffect } from 'react';
import { Progress } from '@/components/ui/shadcn/progress-ui';
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from '@/components/ui/shadcn/card-ui';
import { Button } from "@/components/ui/shadcn/button-ui"
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { AuthAdapter } from "@web3auth/auth-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import { getDefaultExternalAdapters } from "@web3auth/default-solana-adapter";
import { CHAIN_NAMESPACES, IProvider, UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK, IWeb3AuthCoreOptions, IAdapter } from "@web3auth/base";
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { useAuth } from '@/components/apollo/auth-context-provider';
import RPC from "@/components/solana/web3auth/solana-rpc";
import { countries } from '@/data/countries';
import { UPDATE_USER } from '@/graphql/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
// import { EmailInputForm, ProfileInitForm, SelectLikesForm } from '@/components/ui/shadcn/form-ui';

interface DialogProps {
    _isOpen?: boolean;
    handleNext?: () => void;
    handleBack?: () => void;
    handleClose?: () => void;
}


const clientId = "BI8MhAUT4vK4cfQZRQ_NEUYOHE3dhD4ouJif9SUgbgBeeZwP6wBlXast2pZsQJlney3nPBDb-PcMl9oF6lV67P0"; // get from https://dashboard.web3auth.io
let defaultSolanaAdapters: IAdapter<unknown>[] = [];
const LoginDialog: React.FC<DialogProps> = ({ _isOpen }) => {
    const [slide, setSlide] = useState(_isOpen ? 2 : 1);
    const [isOpen, setIsOpen] = useState(_isOpen || false);
    const { user, checkAuth, loginExistingUser } = useAuth();
    const [updateUser] = useMutation(UPDATE_USER);
    const [web3auth, setWeb3auth] = useState<Web3AuthNoModal | null>(null);
    const [provider, setProvider] = useState<IProvider | null>(null);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleNext = () => setSlide(prev => Math.min(prev + 1, 4));
    const handleBack = () => setSlide(prev => Math.max(prev - 1, 1));
    const router = useRouter();
    const dialogProps: DialogProps = { handleNext, handleBack, handleClose };

    const [loginData, setLoginData] = useState({
        _id: '',
        email: '',
        publicKey: '',
        profilePictureUrl: '',
        authProvider: '',
    });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: 'CH',
        acceptTerms: '',
        plan: ''
    });

    const getLocalStorage = () => {
        if (typeof window !== 'undefined') {
            return window.localStorage;
        }
        return null;
    };
      
    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(( prevData: any )=> {
            const newData = {
                ...prevData,
                [name]: type === 'checkbox' ? Date.now() : value
            };
            // Save to localStorage (client-side only)
            const storage = getLocalStorage();
            if (storage) {
                storage.setItem('signupFormData', JSON.stringify(newData));
            }
            return newData;
        });
    };

    const handleUpdateUser = async() => {
        try {
            console.log('user ->', user);
            if (!loginData.publicKey || !user) await checkAuth();
            const result = await updateUser({
                variables: {
                    _id: user!._id,
                    input: {
                        ...formData,
                    },
                }
            });

            if (result.data && result.data.updateUser) {
                console.log('User updated successfully:', result.data.updateUser);
                const storage = getLocalStorage();
                if (storage) {
                    storage.removeItem('signupFormData');
                }
                router.push('/dashboard');
            } else {
                console.error('UpdateUser mutation returned null or undefined');
            }
        } catch (error: any) {
            console.error('Error updating user:', error);
            if (error.graphQLErrors) {
                error.graphQLErrors.forEach((graphQLError: any) => {
                    console.error('GraphQL error:', graphQLError.message);
                    if (graphQLError.extensions) {
                        console.error('Error extensions:', graphQLError.extensions);
                    }
                });
            }
            if (error.networkError) {
                console.error('Network error:', error.networkError);
            }
        }
    };
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
          
        } catch (error) {
          console.error(error);
        } 
      };
  
    

    const loginWithGoogle = async () => {
        
        await init();
        const web3authProvider = await web3auth!.connectTo(WALLET_ADAPTERS.AUTH, {
          loginProvider: "google",
        });

    };


    const Dialog1: React.FC<DialogProps> = ({ handleNext, handleBack }) => (
        <div className='flex flex-row gap-6'>
            <Card className='bg-transparent flex flex-col text-secondary border-none w-1/2'>
                <CardHeader className='bg-bg rounded-t-xl'>
                    <CardTitle className='font-bold'>Welcome to the Artisan</CardTitle>
                    <CardDescription>Connect your buyer profile to access the marketplace and begin collecting</CardDescription>
                </CardHeader>
                <CardContent className='bg-bg flex flex-col gap-2'>
                    {/* <form className='flex flex-col gap-2'>
                        <input type='email' placeholder='Email' className='rounded-full p-2 border-2 border-gray-300' />
                        <Button onClick={handleNext} className='rounded-full'>Continue</Button>
                    </form> */}
                    <Button className='w-full rounded-full border-secondary font-urbanist text-lg hover:bg-secondary hover:text-primary' onClick={()=> loginWithGoogle()}>
                        Sign in with Google
                    </Button>
                    <WalletMultiButton>
                        Connect 
                        {['phantom', 'solflare', 'backpack', 'ledger'].map(icon => (
                            <img key={icon} src={`/login/${icon}_icon.svg`} alt={icon} className='ml-2' style={{ width: '20px', height: '20px'}} />
                        ))}
                    </WalletMultiButton>
                    <div className='flex items-center'>
                        <div className='flex-grow h-px bg-gray-300'></div>
                        <span className='px-4 text-gray-500'>OR</span>
                        <div className='flex-grow h-px bg-gray-300'></div>
                    </div>
                    <Button onClick={handleNext} variant={'secondary'} className='w-full rounded-full'>Create account</Button>
                </CardContent>
                <CardFooter className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                    By continuing to use the Artisan you accept terms and condition
                </CardFooter>
            </Card>
            <Card className='bg-bg flex flex-col relative w-1/2 text-secondary'>
                <div className='h-full w-full rounded-xl bg-[url(/products/rolex-graphic.svg)] bg-cover bg-right-top bg-no-repeat' />
                <CardHeader className='absolute bottom-0 left-0 w-1/2'>
                    <CardTitle className='text-xl font-bold'>Buy a fraction of your favorite asset</CardTitle>
                    <CardDescription className='text-md'>Democratizing Luxury one fraction at a time</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );

    const Dialog2: React.FC<DialogProps> = ({ handleNext, handleBack }) => (
        <div className='flex flex-row gap-6'>
            <Card className='bg-transparent w-1/2 flex flex-col text-secondary border-none'>
                <CardHeader className='bg-bg rounded-t-xl'>
                    <CardTitle className='font-bold'>Create a Buyer Profile</CardTitle>
                    <CardDescription>Establish a buyer profile to access the marketplace and begin collecting</CardDescription>
                </CardHeader>
                <CardContent className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                    <form className='flex flex-col gap-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' placeholder='Email' className='rounded-full p-2 border-2 border-gray-300' />
                        <label htmlFor='firstName'>Name</label>
                        <input type='text' placeholder='First name' className='rounded-full p-2 border-2 border-gray-300' />
                        <input type='text' placeholder='Last name' className='rounded-full p-2 border-2 border-gray-300' />
                        <label htmlFor='country'>Country</label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="border p-2 rounded"
                            required
                        >
                            <option value={'CH'} label={'Switzerland 🇨🇭'} >
                                Switzerland 🇨🇭
                            </option>
                            {countries.map(country => (
                            <option key={country.value} value={country.label}>
                                {country.label}
                            </option>
                            ))}
                        </select>
                        <label htmlFor='acceptTerms'>Accept terms</label>
                        <div className='flex flex-row gap-2'>
                            <input type='checkbox' name='acceptTerms' onChange={handleInputChange} />
                            <p className='text-sm'>I accept the terms and conditions</p>
                        </div>
                        <Button onClick={handleBack} className='rounded-full'>Previous</Button>
                        <Button onClick={handleNext} className='rounded-full'>Continue</Button>
                    </form>
                </CardContent>                
            </Card>      
            <Card className='bg-bg flex flex-col relative w-1/2 text-secondary overflow-hidden'>
                <div className='top-0 left-0 absolute h-24 w-full z-10 bg-[url(/login/top-left-card.svg)] bg-contain bg-left-top bg-no-repeat' />
                <div className='top-4 -left-0 absolute h-5/6 w-full z-10 bg-[url(/login/wallet-card.svg)] bg-right bg-contain bg-no-repeat' />
                <div className='bottom-0 -right-5 absolute h-2/5 w-full z-10 bg-[url(/login/top-gainer-card.svg)] bg-contain bg-right-bottom bg-no-repeat' />
                <CardHeader className='absolute bottom-0 left-0 w-3/4'>
                    <CardTitle className='text-xl font-bold'>Track your investment</CardTitle>
                    <CardDescription className='text-md'>See the performance</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );

    const Dialog3: React.FC<DialogProps> = ({ handleNext, handleBack }) => (
        <div className='flex flex-row gap-6'>
            <Card className='bg-transparent w-1/2 flex flex-col text-secondary border-none'>
                <CardHeader className='bg-bg rounded-t-xl'>
                    <CardTitle className='font-bold'>Create an Artisan Wallet</CardTitle>
                    <CardDescription>Connect your wallet or generate one with your email.</CardDescription>
                </CardHeader>
                <CardContent className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                    <form className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                            <label htmlFor='plan'>Connect a Wallet</label>
                            <WalletMultiButton style={{ width: '100%'}} className='flex flex-row w-full shadow-sm'>
                                Connect 
                                {['phantom', 'solflare', 'backpack', 'ledger'].map(icon => (
                                    <img key={icon} src={`/login/${icon}_icon.svg`} alt={icon} className='ml-2' style={{ width: '20px', height: '20px'}} />
                                ))}
                            </WalletMultiButton>
                            <Button
                                onClick={handleNext}
                                className='w-full rounded-full border border-secondary'
                            >
                                Sign in with Google
                            </Button>
                        </div>
                        <Button onClick={handleBack} className='rounded-full'>Previous</Button>
                        <Button onClick={handleNext} className='rounded-full'>Continue</Button>
                    </form>
                </CardContent>
            </Card>      
            <Card className='bg-bg flex flex-col relative w-1/2 text-secondary overflow-hidden'>
                <div className='left-40 absolute h-full w-full z-10 rounded-xl bg-[url(/products/car.svg)] bg-cover bg-right- bg-no-repeat' />
                <CardHeader className='absolute top-0 left-0 w-1/2'>
                    <CardTitle className='text-xl font-bold'>Passive Earning</CardTitle>
                    <CardDescription className='text-md'>But better</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );

    const Dialog4: React.FC<DialogProps> = ({ handleNext, handleBack }) => (
        <div className='flex flex-row gap-6'>
            <Card className='bg-transparent w-1/2 flex flex-col text-secondary border-none'>
                <CardHeader className='bg-bg rounded-t-xl'>
                    <CardTitle className='font-bold'>{"You're all set! 🎉"}</CardTitle>
                    <CardDescription>Continue and enter into the world of RWA with The Artisan</CardDescription>
                </CardHeader>
                <CardContent className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                    <div className='flex flex-row gap-4 w-full justify-center items-center'>
                        <Button onClick={handleBack} className='text-secondary w-1/4 rounded-lg'><ChevronLeftIcon width={150} height={150} /> Return</Button>
                        <Button onClick={()=>{router.push('/dashboard'), setSlide(1), setIsOpen(false)}} variant={'secondary'} className='text-primary w-3/4 rounded-lg'>Enter the App</Button>
                    </div>
                </CardContent>                
            </Card>      
            <Card className='bg-[url(/login/logo-repeat.svg)] bg-cover flex flex-col rounded-3xl relative text-secondary overflow-hidden w-1/2'>
            </Card>
        </div>
    );
    
    return (
        <Suspense fallback={<div />}>
            <Button variant={'secondary'} className='rounded-xl' onClick={handleOpen}>
                Login
            </Button>
            {isOpen && (
                <div className="fixed h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    {/* overlay div */}
                    <div className="fixed h-screen inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10" onClick={()=> setIsOpen(false)}>
                    </div>
                    {/* dialog div */}
                    <div className="bg-transparent rounded-lg p-6 w-full max-w-4xl relative z-20">
                        <Button onClick={handleClose} className="absolute top-2 right-2 z-10">Close</Button>
                        <Progress className='w-full my-6 shadow-sm rounded-full bg-gradient-to-r from-primary to-secondary' value={slide * 25} max={100} />
                        {slide === 1 && <Dialog1 {...dialogProps} />}
                        {slide === 2 && <Dialog2 {...dialogProps} />}
                        {slide === 3 && <Dialog3 {...dialogProps} />}
                        {slide === 4 && <Dialog4 {...dialogProps} />}
                    </div>
                </div>
            )}
        </Suspense>
    );
}


export default LoginDialog;