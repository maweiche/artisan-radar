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
import { CtaCard1, CtaCard2, CtaCard3 } from '@/components/cards/cta';
import { CollectionsCard, ExpertiseCard } from '@/components/cards';
import { Badge } from '@/components/ui/shadcn/badge-ui';
import PerformanceCard from '../cards/performance-card-feature';
export default function HomeFeature() {
    const [selected, setSelected] = useState(0);
    const categories = [
        'Watches',
        'Cars',
        'Diamonds',
        'Whisky'
    ]

    return (
        <div className='bg-bg pt-20 lg:pt-2 gap-32 lg:gap-0 flex flex-col justify-center' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Wrapper
                // id="hero"
                className='bg-bg relative flex flex-col w-full items-center justify-between lg:gap-6'
            >            
                <div 
                    className='absolute hidden lg:flex md:flex bg-top w-3/4 h-3/4 bg-[url(/assets/home/home-backdrop.svg)] bg-no-repeat bg-contain bg-center z-0'
                    // style it so only the bottom half of the div is visible, the top half should be transparent
                    // style={{
                    //     maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
                    // }}
                />
                <p 
                    className="absolute bottom-28 text-secondary z-10 hidden lg:flex md:flex"
                    style={{ 
                        fontFamily: 'Syne',
                        fontSize: '15rem',
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
                    <p className="flex flex-col text-secondary top-0 text-4xl text-center z-20 ">
                        You collect shares of goods, <br />
                        we handle everything else
                    </p>
                </motion.h1>
                <motion.h4>
                    <p className="flex flex-col text-secondary text-2xl text-center z-20">
                        Collect & Trade luxury goods<br />
                        on-chain
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
                                selected === index ? "bg-secondaryText text-secondary border-2 border-secondary rounded-full" : "bg-secondary text-secondaryText border-2 border-secondaryText rounded-full z-20"
                            }
                        >
                            {category}
                        </Button>
                    ))}
                </motion.hgroup>

                
            </Wrapper>
            <div
                className='flex flex-col w-full relative items-center z-20'
                style={{ gap: '12px'}}
            >
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
                className='bg-bg flex flex-col w-full items-center justify-between'
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}
            >  
                <PerformanceCard />
                
                <ChartA className='mx-2 w-11/12 px-4 py-4'/>
                <ChartC className='mx-2 w-11/12 px-4 py-4'/>
            </Wrapper>
            <TransparentCard> 
                <div className="mx-2 w-11/12 text-secondary text-2xl">
                    We offer the opportunity to access these markets through digitization with a starting investment of just $100. 
                    Luxury Markets and Vintage collections tend to appreciate over time, yet they often remain out of reach for 
                    the majority of individuals.
                </div>
            </TransparentCard>
            <Card2 className='mx-4'/>
            <Card3 className='mx-4' />
            <CollectionsCard /> 
            <ExpertiseCard />
            <CtaCard1 />
            <CtaCard2 />
            <CtaCard3 />
        </div>
    )
}