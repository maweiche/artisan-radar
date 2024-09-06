import React, { Suspense, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/shadcn/dialog-ui"
import { Progress } from '@/components/ui/shadcn/progress-ui';
import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from '@/components/ui/shadcn/card-ui';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import toast, { Toaster } from 'react-hot-toast';
import { Separator } from "@/components/ui/shadcn/separator-ui"
// import { toast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/shadcn/button-ui"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form-ui"
import { Input } from "@/components/ui/shadcn/input-ui"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
})

const LikesSchema = z.object({
    age: z.string().min(2, {
        message: "Age must be at least 2 characters.",
    }),
    income: z.string().email({
        message: "Please enter a valid income.",
    }),
    interests: z.string().min(2, {
        message: "Interests must be at least 2 characters.",
    }),
})

interface ModalProps {
    page?: number;
    handleNext: () => void;
    handleBack: () => void;
}

interface FormProps {
    handleComplete: () => void;
    handlePrevious: () => void;
}

const LoginDialog = () => {
    const [slide, setSlide] = useState(1);
    return (
        <Suspense fallback={<div />}>
            <Dialog>
                <Button variant={'secondary'} className='text-secondaryText rounded-xl'asChild>
                    <DialogTrigger>Login</DialogTrigger>
                </Button>
                {slide === 1 && <Dialog1 handleNext={() => setSlide(2)} handleBack={() => setSlide(1)} />}
                {slide === 2 && <Dialog2 handleNext={() => setSlide(3)} handleBack={() => setSlide(1)} />}
                {slide === 3 && <Dialog3 handleNext={() => setSlide(4)} handleBack={() => setSlide(2)} />}
                {slide === 4 && <Dialog4 handleNext={() => setSlide(4)} handleBack={() => setSlide(3)} />}
            </Dialog>
        </Suspense>
    );
}

export default LoginDialog;

export const Dialog1: React.FC<ModalProps> = ({ page, handleNext, handleBack }) => {

    return (
        <DialogContent className='border-none h-fit lg:w-7/12 md:w-4/5 text-secondaryText flex flex-row'>
            <Card className='bg-transparent flex flex-col text-secondary border-none' style={{ width: '90vw'}}>
                <Progress className='w-full my-2' value={25} max={100} />
                <CardHeader className='bg-bg rounded-t-xl'>
                
                    <CardTitle className='font-bold'>Welcome to the Artisan</CardTitle>
                    <CardDescription>Connect your buyer profile to access the marketplace and begin collecting</CardDescription>
                </CardHeader>
                <CardContent className='bg-bg flex flex-col gap-2'>
                    <EmailInputForm 
                        handleComplete={() => handleNext()}
                        handlePrevious={() => handleBack()}
                    />
                    <Button style={{ height: '27px' }} className='w-full rounded-full border-2 border-secondary border-x border-y'>
                        Sign in with Google
                    </Button>
                    <WalletMultiButton style={{ width: '100%'}} className='flex flex-row w-full rounded-full border-2 border-secondary border-x border-y'>
                        Connect your Wallet
                        <img
                            src='/login/phantom_icon.svg'
                            alt='Solana'
                            className='ml-2'
                            style={{ width: '20px', height: '20px'}}
                        />
                        <img
                            src='/login/solflare_icon.svg'
                            alt='Solana'
                            className='ml-2'
                            style={{ width: '20px', height: '20px'}}
                        />
                        <img
                            src='/login/backpack_icon.svg'
                            alt='Solana'
                            className='ml-2'
                            style={{ width: '20px', height: '20px'}}
                        />
                        <img
                            src='/login/ledger_icon.svg'
                            alt='Solana'
                            className='ml-2'
                            style={{ width: '20px', height: '20px'}}
                        />
                    </WalletMultiButton>
                    <div className='flex flex-row justify-between items-center'>
                        <Separator orientation='horizontal' className="my-4 w-2/5" /> 
                            <p className='text-slate-400'>OR</p>
                        <Separator orientation='horizontal' className="my-4 w-2/5" />
                    </div>
                    <Button onClick={ () => { handleNext(); } } variant={'secondary'} className='text-secondaryText w-full rounded-full' type="submit">Create account</Button>
                </CardContent>
                <CardFooter className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                    By continuing to use the Artisan you accept terms and condition
                </CardFooter>
            </Card>
            <Card className='bg-bg flex flex-col relative w-1/4 text-secondary ' style={{ width: '90vw'}}>
                <div className='h-full w-100 z-100 rounded-xl bg-[url(/products/rolex-graphic.svg)] bg-cover bg-right-top bg-no-repeat' />
                <CardHeader
                    className='absolute bottom-0 left-0 w-1/2'
                >
                    <CardTitle className='text-xl font-bold'>Buy a fraction of your favorite asset</CardTitle>
                    <CardDescription className='text-md'>Democratizing Luxury one fraction at a time</CardDescription>
                </CardHeader>
            </Card>
        </DialogContent>
    )
}

export const Dialog2: React.FC<ModalProps> = ({ page, handleNext, handleBack }) => {
    return (
        <DialogContent className='border-none h-fit lg:w-7/12 md:w-4/5 text-secondaryText flex flex-row'>
            <Card className='bg-transparent w-1/2 flex flex-col text-secondary border-none' style={{ width: '50%'}}>
                <Progress className='w-full my-2' value={50} max={100} />
                <CardHeader className='bg-bg rounded-t-xl'>
                
                    <CardTitle className='font-bold'>Create a Buyer Profile</CardTitle>
                    <CardDescription>Establish a buyer profile to access the marketplace and begin collecting</CardDescription>
                </CardHeader>
                <CardContent className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                    <ProfileInitForm 
                        handleComplete={() => handleNext()}
                        handlePrevious={() => handleBack()}
                    />
                </CardContent>                
            </Card>      
            <Card className='bg-bg flex flex-col relative min-w-1/2 text-secondary overflow-hidden' style={{ width: '50%'}}>
                <div className='top-0 left-0 absolute h-24 w-full z-100 bg-[url(/login/top-left-card.svg)]  bg-contain bg-left-top bg-no-repeat' />
                {/* <div className='-top-2 -right-16 absolute h-12 w-full z-100 bg-[url(/login/top-right-card.svg)]  bg-contain bg-right-top bg-no-repeat' /> */}
                <div className='top-4 -left-0 absolute h-5/6 w-full z-100 bg-[url(/login/wallet-card.svg)] bg-right  bg-contain bg-no-repeat' />
                <div className='bottom-0 -right-5 absolute h-2/5 w-full z-100 bg-[url(/login/top-gainer-card.svg)]  bg-contain bg-right-bottom bg-no-repeat' />
                <CardHeader
                    className='absolute bottom-0 left-0 w-3/4'
                >
                    <CardTitle className='text-xl font-bold'>Track your investment</CardTitle>
                    <CardDescription className='text-md'>See the performance</CardDescription>
                </CardHeader>
            </Card>
        </DialogContent>
    )
}

export const Dialog3: React.FC<ModalProps> = ({ page, handleNext, handleBack }) => {
    return (
        <DialogContent className='border-none h-fit lg:w-7/12 md:w-4/5 text-secondaryText flex flex-row'>
            <Card className='bg-transparent w-1/2 flex flex-col text-secondary border-none' style={{ width: '50%'}}>
                <Progress className='w-full my-2' value={75} max={100} />
                <CardHeader className='bg-bg rounded-t-xl'>
                
                    <CardTitle className='font-bold'>Create a Buyer Profile</CardTitle>
                    <CardDescription>Establish a buyer profile to access the marketplace and begin collecting</CardDescription>
                </CardHeader>
                <CardContent className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                    <SelectLikesForm
                        handleComplete={() => handleNext()}
                        handlePrevious={() => handleBack()}
                    />
                </CardContent>
            </Card>      
            <Card className='bg-bg flex flex-col relative min-w-1/2 text-secondary overflow-hidden' style={{ width: '50%'}}>
                <div className='left-40 absolute h-full w-full z-100 rounded-xl bg-[url(/products/car.svg)] bg-cover bg-right- bg-no-repeat' />
                <CardHeader
                    className='absolute top-0 left-0 w-1/2'
                >
                    <CardTitle className='text-xl font-bold'>Passive Earning</CardTitle>
                    <CardDescription className='text-md'>But better</CardDescription>
                </CardHeader>
            </Card>
        </DialogContent>
    )
}

export const Dialog4: React.FC<ModalProps> = ({ page, handleNext, handleBack }) => {
    return (
        <DialogContent className='border-none h-fit lg:w-7/12 md:w-4/5 text-secondaryText flex flex-row'>
            <Card className='bg-transparent w-1/2 flex flex-col text-secondary border-none' style={{ width: '50%'}}>
                <Progress className='w-full my-2' value={100} max={100} />
                <CardHeader className='bg-bg rounded-t-xl'>
                
                    <CardTitle className='font-bold'>You’re all set! 🎉</CardTitle>
                    <CardDescription>Continue and enter into the world of RWA with The Artisan</CardDescription>
                </CardHeader>
                <CardContent className='bg-bg flex flex-col gap-2 rounded-b-xl'>
                    <div className='flex flex-row gap-4 w-full justify-center items-center'>
                        <Button onClick={() => handleBack()}  className='text-secondary w-1/4 rounded-lg' type="submit"><ChevronLeftIcon width={150} height={150} /> Return</Button>
                        <Button onClick={() => handleNext()} variant={'secondary'} style={{ height: '27px' }} className='text-secondaryText w-3/4 rounded-lg' type="submit">Enter the App</Button>
                    </div>
                </CardContent>                
            </Card>      
            <Card className='bg-[url(/login/logo-repeat.svg)] bg-cover flex flex-col rounded-3xl relative text-secondary overflow-hidden' style={{ width: '50%'}}>
            </Card>
        </DialogContent>
    )
}



export const EmailInputForm: React.FC<FormProps> = ({ handleComplete, handlePrevious }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        username: "",
      },
    })
   
    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast(`Welcome, ${data.username}!`)
    }
   
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full items-center space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold'>Sign in with Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@mail.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button variant={'secondary'} style={{ height: '27px' }} className='text-secondaryText w-full rounded-full' type="submit">Send OTP</Button>
        </form>
      </Form>
    )
  }



export const ProfileInitForm: React.FC<FormProps> = ({ handleComplete, handlePrevious }) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          username: "",
          fullName: "",
          email: "",
        },
      })
     
      function onSubmit(data: z.infer<typeof FormSchema>) {
        toast(`Welcome, ${data.username}!`)
      }
     
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full items-center space-y-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="bravo23" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@mail.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex flex-row gap-4 w-full justify-center items-center'>
                <Button onClick={() => handlePrevious()}  className='text-secondary w-1/4 rounded-lg' type="submit"><ChevronLeftIcon width={150} height={150} /> Return</Button>
                <Button onClick={() => handleComplete()} variant={'secondary'} style={{ height: '27px' }} className='text-secondaryText w-3/4 rounded-lg' type="submit">Create Profile</Button>
            </div>
          </form>
        </Form>
    )
};


  export const SelectLikesForm: React.FC<FormProps> = ({ handleComplete, handlePrevious }) => {
    const form = useForm<z.infer<typeof LikesSchema>>({
        resolver: zodResolver(LikesSchema),
        defaultValues: {
            age: "",
            income: "",
            interests: "",
        },
      })
     
      function onSubmit(data: z.infer<typeof LikesSchema>) {
        toast('Success!')
      }
     
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full items-center space-y-2 gap-4">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <>
                    <FormItem>
                    <FormLabel className='font-bold'>What is your age?</FormLabel>
                        <div className='flex flex-row'>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('age', '18-25')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('age') === '18-25' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    18-25
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('age', '26-35')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('age') === '26-35' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    26-35
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('age', '36-45')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('age') === '36-45' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    36-45
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('age', '46+')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('age') === '46-55' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    46+
                                </Button>
                            </FormControl>
                        </div>
                    </FormItem>
                    <FormItem>
                    <FormLabel className='font-bold'>What is your income?</FormLabel>
                        <div className='flex flex-row'>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('income', '0-50k')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('income') === '0-50k' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    0-50k
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('income', '50-100k')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('income') === '50-100k' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    50-100k
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('income', '100-150k')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('income') === '100-150k' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    100-150k
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('income', '150k+')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('income') === '150k+' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    150k+
                                </Button>
                            </FormControl>
                        </div>
                    </FormItem>
                    <FormItem>
                    <FormLabel className='font-bold'>What is your interests?</FormLabel>
                        <div className='flex flex-row'>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('interests', 'Art')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('interests') === 'Art' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    Art
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('interests', 'Fashion')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('interests') === 'Fashion' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    Fashion
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('interests', 'Tech')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('interests') === 'Tech' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    Tech
                                </Button>
                            </FormControl>
                            <FormControl>
                                <Button
                                    onClick={() => form.setValue('interests', 'Sports')}
                                    variant={'ghost'} 
                                    className={`text-secondary w-full rounded-full ${form.getValues('interests') === 'Sports' ? 'bg-secondary' : 'bg-bg'}`}
                                >
                                    Sports
                                </Button>
                            </FormControl>
                        </div>
                    </FormItem>
                </>
              )}
            />
           
           <div className='flex flex-row gap-4 w-full justify-center items-center'>
                <Button onClick={() => handlePrevious()}  className='text-secondary w-1/4 rounded-lg' type="submit"><ChevronLeftIcon width={150} height={150} /> Return</Button>
                <Button onClick={() => handleComplete()} variant={'secondary'} style={{ height: '27px' }} className='text-secondaryText w-3/4 rounded-lg' type="submit">Complete</Button>
            </div>
          </form>
        </Form>
    )
};