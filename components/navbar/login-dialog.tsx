import React, { Suspense, useState } from 'react';
import { Progress } from '@/components/ui/shadcn/progress-ui';
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from '@/components/ui/shadcn/card-ui';
import { Button } from "@/components/ui/shadcn/button-ui"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
// import { EmailInputForm, ProfileInitForm, SelectLikesForm } from '@/components/ui/shadcn/form-ui';

interface DialogProps {
    handleNext: () => void;
    handleBack: () => void;
    handleClose: () => void;
}

const EmailInputForm: React.FC<{ handleComplete: () => void, handlePrevious: () => void }> = ({ handleComplete, handlePrevious }) => (
    <form className='flex flex-col gap-2'>
        <input type='email' placeholder='Email' className='rounded-full p-2 border-2 border-gray-300' />
        <Button onClick={handleComplete} className='rounded-full'>Continue</Button>
    </form>
);

const ProfileInitForm: React.FC<{ handleComplete: () => void, handlePrevious: () => void }> = ({ handleComplete, handlePrevious }) => (
    <form className='flex flex-col gap-2'>
        <input type='text' placeholder='Name' className='rounded-full p-2 border-2 border-gray-300' />
        <input type='text' placeholder='Username' className='rounded-full p-2 border-2 border-gray-300' />
        <Button onClick={handlePrevious} className='rounded-full'>Previous</Button>
        <Button onClick={handleComplete} className='rounded-full'>Continue</Button>
    </form>
);

const SelectLikesForm: React.FC<{ handleComplete: () => void, handlePrevious: () => void }> = ({ handleComplete, handlePrevious }) => (
    <form className='flex flex-col gap-2'>
        <input type='text' placeholder='Favorite artist' className='rounded-full p-2 border-2 border-gray-300' />
        <input type='text' placeholder='Favorite category' className='rounded-full p-2 border-2 border-gray-300' />
        <Button onClick={handlePrevious} className='rounded-full'>Previous</Button>
        <Button onClick={handleComplete} className='rounded-full'>Continue</Button>
    </form>
);

const LoginDialog: React.FC = () => {
    const [slide, setSlide] = useState(1);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleNext = () => setSlide(prev => Math.min(prev + 1, 4));
    const handleBack = () => setSlide(prev => Math.max(prev - 1, 1));

    const dialogProps: DialogProps = { handleNext, handleBack, handleClose };

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
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl relative z-20">
                        <Button onClick={handleClose} className="absolute top-2 right-2 z-10">Close</Button>
                        <Progress className='w-full my-6' value={slide * 25} max={100} />
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

const Dialog1: React.FC<DialogProps> = ({ handleNext, handleBack }) => (
    <div className='flex flex-row'>
        <Card className='bg-transparent flex flex-col text-secondary border-none w-1/2'>
            <CardHeader className='bg-bg rounded-t-xl'>
                <CardTitle className='font-bold'>Welcome to the Artisan</CardTitle>
                <CardDescription>Connect your buyer profile to access the marketplace and begin collecting</CardDescription>
            </CardHeader>
            <CardContent className='bg-bg flex flex-col gap-2'>
                <EmailInputForm handleComplete={handleNext} handlePrevious={handleBack} />
                <Button className='w-full rounded-full border-2 border-secondary'>
                    Sign in with Google
                </Button>
                <WalletMultiButton style={{ width: '100%', zIndex: '51'}} className='flex flex-row w-full z-[60] rounded-full border-2 border-secondary'>
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
    <div className='flex flex-row'>
        <Card className='bg-transparent w-1/2 flex flex-col text-secondary border-none'>
            <CardHeader className='bg-bg rounded-t-xl'>
                <CardTitle className='font-bold'>Create a Buyer Profile</CardTitle>
                <CardDescription>Establish a buyer profile to access the marketplace and begin collecting</CardDescription>
            </CardHeader>
            <CardContent className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                <ProfileInitForm handleComplete={handleNext} handlePrevious={handleBack} />
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
    <div className='flex flex-row'>
        <Card className='bg-transparent w-1/2 flex flex-col text-secondary border-none'>
            <CardHeader className='bg-bg rounded-t-xl'>
                <CardTitle className='font-bold'>Create a Buyer Profile</CardTitle>
                <CardDescription>Establish a buyer profile to access the marketplace and begin collecting</CardDescription>
            </CardHeader>
            <CardContent className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                <SelectLikesForm handleComplete={handleNext} handlePrevious={handleBack} />
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
    <div className='flex flex-row'>
        <Card className='bg-transparent w-1/2 flex flex-col text-secondary border-none'>
            <CardHeader className='bg-bg rounded-t-xl'>
                <CardTitle className='font-bold'>You're all set! 🎉</CardTitle>
                <CardDescription>Continue and enter into the world of RWA with The Artisan</CardDescription>
            </CardHeader>
            <CardContent className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                <div className='flex flex-row gap-4 w-full justify-center items-center'>
                    <Button onClick={handleBack} className='text-secondary w-1/4 rounded-lg'><ChevronLeftIcon width={150} height={150} /> Return</Button>
                    <Button onClick={handleNext} variant={'secondary'} className='text-primary w-3/4 rounded-lg'>Enter the App</Button>
                </div>
            </CardContent>                
        </Card>      
        <Card className='bg-[url(/login/logo-repeat.svg)] bg-cover flex flex-col rounded-3xl relative text-secondary overflow-hidden w-1/2'>
        </Card>
    </div>
);

export default LoginDialog;