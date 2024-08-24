'use client'
import styles from '@/styles/components/Footer.module.css'
import { Suspense } from 'react';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card-ui"
import toast from 'react-hot-toast';
export default function FooterFeature() {
    const handleCopy = (e: string) => {
        console.log(e);
        navigator.clipboard.writeText(e);
        toast.success('Email Copied to Clipboard');
    };
    return (
        <Suspense fallback={<div />}>
            <Card
                style={{ width:'100vw', alignSelf: 'center' }}
                className='rounded-none flex flex-col py-14 items-start w-full bg-transparent'
            >
                <CardContent className='flex flex-col py-4 gap-4 items-center'>
                    <div className={styles.headline}>
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
                        <h1 className='text-3xl'>The Artisan</h1>
                    </div>
                    {/* <span className={styles.subText}>
                        Baseline
                    </span> */}
                    <div className={styles.logoContainer}>
                        <Image
                            src='/assets/footer/solana-icon.webp'
                            alt="Logo"
                            width={60}
                            height={60}
                            className="cursor-pointer"
                            onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />
                        <Image
                            src='/assets/footer/swiss-icon.webp'
                            alt="Logo"
                            width={60}
                            height={60}
                            className="cursor-pointer"
                            onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex-row items-center gap-8 items-start">
                    <div className={styles.linkContainerCol}>
                        <h2 className='font-bold'>Site</h2>
                        <ul className={styles.linkList}>
                            <li>
                                <a href='/collect' target='_blank' className='link'>Start Collecting</a>
                            </li>
                            <li>
                                <a href='/about' target='_blank' className='link'>About Us</a>
                            </li>
                            <li>
                                <a href='tos' target='_blank' className='link'>Terms and Conditions</a>
                            </li>
                            <li>
                                <a href='privacy' target='_blank' className='link'>Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.linkContainerCol}>
                        <h2 className='font-bold'>Socials</h2>
                        <ul className={styles.linkList}>
                            <li>
                                <a href='https://www.linkedin.com/company/the-artisan-nft/?viewAsMember=true' className='link' target='_blank'>LinkedIn</a>
                            </li>
                            <li>
                                <a href='https://twitter.com/ArtsnFi' className='link' target='_blank'>Twitter/X</a>
                            </li>
                            <li>
                                <a 
                                    onClick={() => {
                                        handleCopy('renato@artsn.fi');
                                    }} 
                                    className='link'
                                >
                                    Email
                                </a>
                            </li>
                            <li>
                                <a href='https://t.me/rcapizz' target='_blank' className='link'>Telegram</a>
                            </li>
                            <li>
                                <a href='https://discord.gg/DZHY6B7Q46' target='_blank' className='link'>Discord</a>
                            </li>
                            <li>
                                <a href='https://www.instagram.com/theartisan_nft/' target='_blank' className='link'>Instagram</a>
                            </li>
                        </ul>
                    </div>
                </CardFooter>
            </Card>
        </Suspense>
    )
}