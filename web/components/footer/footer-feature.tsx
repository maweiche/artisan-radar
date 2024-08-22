'use client'
import styles from '@/styles/components/Footer.module.css'
import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeIn, slideIn } from '@/styles/animations';

export default function FooterFeature() {
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
                            src='/logos/artisan-small-logo.svg'
                            alt="Logo"
                            width={25}
                            height={25}
                            className="cursor-pointer"
                            onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        />
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
                </div>
                <div className={styles.linkContainerRow}>
                    <div className={styles.linkContainerCol}>
                        <h2 className={styles.subText}>About</h2>
                        <ul className={styles.linkList}>
                            <li>
                                <a href='#' className='link'>About Us</a>
                            </li>
                            <li>
                                <a href='#' className='link'>Our Mission</a>
                            </li>
                            <li>
                                <a href='#' className='link'>Our Vision</a>
                            </li>
                            <li>
                                <a href='#' className='link'>Our Values</a>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.linkContainerCol}>
                        <h2 className={styles.subText}>About</h2>
                        <ul className={styles.linkList}>
                            <li>
                                <a href='#' className='link'>About Us</a>
                            </li>
                            <li>
                                <a href='#' className='link'>Our Mission</a>
                            </li>
                            <li>
                                <a href='#' className='link'>Our Vision</a>
                            </li>
                            <li>
                                <a href='#' className='link'>Our Values</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.linkContainerRow}>
                    <div className={styles.linkContainerCol}>
                        <h2 className={styles.subText}>About</h2>
                        <ul className={styles.linkList}>
                            <li>
                                <a href='#' className='link'>About Us</a>
                            </li>
                            <li>
                                <a href='#' className='link'>Our Mission</a>
                            </li>
                            <li>
                                <a href='#' className='link'>Our Vision</a>
                            </li>
                            <li>
                                <a href='#' className='link'>Our Values</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}