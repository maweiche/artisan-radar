'use client'
import { useState } from 'react';
import styles from '@/styles/components/Home.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Wrapper from '@/components/ui/ui-wrapper';
import { Button } from '@/components/ui/shadcn/button-ui';
import TransparentCard from '../ui/cards/TransparentCard';
import { ChartA, ChartB, ChartC } from '@/components/charts';
import { Card1, Card2, Card3 } from '@/components/cards/info';
import { CtaCard1, CtaCard2, CtaCard3, CtaCard4 } from '@/components/cards/cta';
import { CollectionsCard, ExpertiseCard } from '@/components/cards';
import { Badge } from '@/components/ui/shadcn/badge-ui';
import PerformanceCard from '../cards/performance-card-feature';
import OfferCard from '../cards/offer-card-feature';
import DesignedCard from '../cards/designed-card-feature';
export default function HomeFeature() {
    const [selected, setSelected] = useState(0);
    const categories = [
        'Watches',
        'Cars',
        'Diamonds',
        'Whisky'
    ]

    return (
        <div className='bg-bg w-screen pt-20 lg:pt-2 gap-12 lg:gap-0 flex flex-col justify-center' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Wrapper
                // id="hero"
                className='bg-bg relative flex flex-col w-full items-center justify-between lg:gap-12'
            >            
                <div 
                    className='absolute hidden lg:flex md:flex bg-top w-9/12 h-full bg-[url(/assets/home/home-backdrop.svg)] bg-no-repeat bg-contain bg-center z-0'
                    // style it so only the bottom half of the div is visible, the top half should be transparent
                    // style={{
                    //     maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
                    // }}
                />
                <p 
                    className="font-syne absolute bottom-28 text-secondary z-10 hidden lg:flex md:flex"
                    style={{ 
                        fontFamily: 'Syne',
                        fontSize: '220px',
                        fontWeight: '700',
                        lineHeight: '477.4px',
                    }}
                >
                    {
                        selected == 0 ? 'Watches' :
                        selected == 1 ? 'Cars' :
                        selected == 2 ? 'Diamonds' :
                        selected == 3 ? 'Whisky' : 'Watches'
                    }
                </p>
                <motion.h1>
                    <p className="flex flex-col font-semibold font-urbanist text-secondary top-0 text-4xl md:text-6xl text-center z-20 ">
                        You collect, <br />
                        we manage.
                    </p>
                </motion.h1>
                <motion.h4>
                    <p className="flex flex-col text-secondary text-2xl text-center z-20">
                        Collect & Trade luxury goods on-chain
                    </p>
                </motion.h4>
                <motion.picture className='flex flex-row justify-center items-center' style={{ zIndex: '20'}}>
                    <Image 
                        src={
                            selected == 0 ? '/products/freak-watch.png' :
                            selected == 1 ? '/products/car2.svg' :
                            selected == 2 ? '/products/diamond.svg' :
                            selected == 3 ? '/products/whisky.svg' : '/products/freak.svg'
                        }
                        width={293}
                        height={293}
                        className={styles.featuredImage}
                        alt='freak watch'
                    />
                </motion.picture>
                <motion.hgroup className='flex flex-row sm:w-11/12 justify-between items-center mx-auto lg:w-1/4 z-20'>
                    {categories.map((category, index) => (
                        <Button
                            key={index}
                            type='button'
                            onClick={() => setSelected(index)}
                            className={
                                selected === index ? "bg-primary text-secondary border-2 border-secondary rounded-full" : "bg-secondary text-primary border-2 border-secondary rounded-full z-20"
                            }
                        >
                            {category}
                        </Button>
                    ))}
                </motion.hgroup>

                
            </Wrapper>
            <div className='flex flex-col w-full relative items-center z-20' style={{ gap: '12px'}}>
                <p className='text-slate-400'>
                    Trusted by
                </p>
                <Image
                    src='/assets/home/partners-row.svg'
                    width={1000}
                    height={1000}
                    alt='partners'
                />
            </div>
            
            <Wrapper
                // id="hero"
                className='bg-bg flex flex-col items-center justify-between'
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}
            >  
                <PerformanceCard />
                <OfferCard />
                <DesignedCard />
            </Wrapper>
            
            <div className='flex flex-col w-full mb-12 items-top justify-center align-top md:flex-row lg:flex-row'>
                <Card2 className='mx-4 h-60 justify-between md:w-1/3 md:self-center md:mb-12'/>
                <Card3 className='mx-4 h-60 justify-between md:w-1/3 md:self-center md:mb-12'/>
            </div>
            
            {/* <div className='flex flex-col md:items-start items-center md:flex-row justify-center gap-12 align-top'> */}
                <CollectionsCard  className='flex flex-col w-full' /> 
                <ExpertiseCard className='flex flex-col w-full'/>
            {/* </div> */}
            <CtaCard1 className='mx-6 md:w-8/12 md:self-center md:mb-12'/>
            <CtaCard2 className='mx-6 md:w-8/12 md:self-center md:mb-12'/>
            <CtaCard3 className='mx-4 md:w-5/12 md:self-center md:mb-12'/>
            {/* <CtaCard4 /> */}
        </div>
    )
}