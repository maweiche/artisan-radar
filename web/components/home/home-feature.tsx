'use client'
import { useState } from 'react';
import styles from '@/styles/components/Home.module.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Wrapper from '@/components/ui/ui-wrapper';
import Button from '@/components/buttons/Button';
export default function HomeFeature() {
    const [selected, setSelected] = useState(0);
    const categories = [
        'Watches',
        'Cars',
        'Diamonds',
        'Whisky'
    ]

    return (
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
    )
}