'use client'
import { useState } from 'react';
import styles from '@/styles/components/Home.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Wrapper from '@/components/ui/ui-wrapper';
import { Button } from '@/components/ui/shadcn/button-ui';
import TransparentCard from '../ui/cards/TransparentCard';
import { ChartA, ChartB, ChartC } from '@/components/charts';
import { CardA, CardB, CardC } from '@/components/cards/info';
import { CollectionsCard, ExpertiseCard } from '@/components/cards';
export default function HomeFeature() {
    const [selected, setSelected] = useState(0);
    const categories = [
        'Watches',
        'Cars',
        'Diamonds',
        'Whisky'
    ]

    return (
        <div className='' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '14px', gap: '32px'}}>
            <Wrapper
                // id="hero"
                className={styles.container}
            >            
                <motion.h1>
                    <span className={styles.primaryText}>
                        You collect shares of goods, <br />
                        we handle everything else
                    </span>
                </motion.h1>
                <motion.h4>
                    <span className={styles.subText}>
                        Collect & Trade luxury goods<br />
                        on-chain
                    </span>
                </motion.h4>
                <motion.picture className={styles.imageContainer}>
                    <Image 
                        src={'/products/freak-watch.png'}
                        width={293}
                        height={293}
                        className={styles.featuredImage}
                        alt='freak watch'
                    />
                </motion.picture>
                <motion.hgroup className={styles.buttonContainer}>
                    {categories.map((category, index) => (
                        <Button
                            key={index}
                            type='button'
                            onClick={() => setSelected(index)}
                            className={
                                selected === index ? styles.selected : styles.button
                            }
                        >
                            {category}
                        </Button>
                    ))}
                </motion.hgroup>
            </Wrapper>
            <Wrapper
                // id="hero"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}
            >  
                <TransparentCard>
                    <h2>
                        Why Artisan?
                    </h2>
                    <div className={styles.textBlock}>
                        <span>In the past decade</span>, certain Luxury Assets have demonstrated superior performance compared to the S&P 500.
                    </div>
                </TransparentCard>  
                <CardA /> 
                <ChartA />
                {/* <ChartB /> */}
                <ChartC />
            </Wrapper>
            <TransparentCard>
                <div className={styles.textBlock}>
                    We offer the opportunity to access these markets through digitization with a starting investment of just $100. 
                    Luxury Markets and Vintage collections tend to appreciate over time, yet they often remain out of reach for 
                    the majority of individuals.
                </div>
            </TransparentCard>
            <CardA />
            {/* <CardB />
            <CardC /> */}
            <CollectionsCard /> 
            <ExpertiseCard />
            <Wrapper
                // id="hero"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}
            >
               <Button>
                    CTA section
                </Button>  
            </Wrapper>
        </div>
    )
}