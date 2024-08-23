'use client'
import styles from '@/styles/components/Footer.module.css'
import { Suspense } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
export default function FooterFeature() {
    const handleCopy = (e: string) => {
        console.log(e);
        navigator.clipboard.writeText(e);
        toast.success('Email Copied to Clipboard');
    };
    return (
        <Suspense fallback={<div />}>
            <div
                className={styles.container}
            >
                <div className={styles.headlineContainer}>
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
                        <h1 className={styles.primaryText}>The Artisan</h1>
                    </div>
                    <span className={styles.subText}>
                        Baseline
                    </span>
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
                </div>
                <div className={styles.linkContainerRow}>
                    <div className={styles.linkContainerCol}>
                        <h2 className={styles.subText}>Site</h2>
                        <ul className={styles.linkList}>
                            <li>
                                <a href='/collect' className='link'>Start Collecting</a>
                            </li>
                            <li>
                                <a href='/about' className='link'>About Us</a>
                            </li>
                            <li>
                                <a href='tos' className='link'>Terms and Conditions</a>
                            </li>
                            <li>
                                <a href='privacy' className='link'>Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.linkContainerCol}>
                        <h2 className={styles.subText}>Socials</h2>
                        <ul className={styles.linkList}>
                            <li>
                                <a href='https://www.linkedin.com/company/the-artisan-nft/?viewAsMember=true' className='link'>LinkedIn</a>
                            </li>
                            <li>
                                <a href='https://twitter.com/ArtsnFi' className='link'>Twitter/X</a>
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
                                <a href='https://t.me/rcapizz' className='link'>Telegram</a>
                            </li>
                            <li>
                                <a href='https://discord.gg/DZHY6B7Q46' className='link'>Discord</a>
                            </li>
                            <li>
                                <a href='https://www.instagram.com/theartisan_nft/' className='link'>Instagram</a>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* <div className={styles.linkContainerRow}>
                    <div className={styles.linkContainerCol}>
                        <h2 className={styles.subText}>Site</h2>
                        <ul className={styles.linkList}>
                            <li>
                                <a href='/collect' className='link'>Start Collecting</a>
                            </li>
                            <li>
                                <a href='/about' className='link'>About Us</a>
                            </li>
                            <li>
                                <a href='tos' className='link'>Terms and Conditions</a>
                            </li>
                            <li>
                                <a href='privacy' className='link'>Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </div>
        </Suspense>
    )
}