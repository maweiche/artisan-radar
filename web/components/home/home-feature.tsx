'use client'
import { motion } from 'framer-motion';
import Wrapper from '@/components/ui/ui-wrapper';
export default function HomeFeature() {
    return (
        <Wrapper
            id="hero"
            style={{ 
                height: '100vh',
            }}
            className="flex flex-col justify-center gap-6 mt-12 xs:gap-7 xs:mt-0"
        >            
            <motion.h1>
                <span className="text-4xl font-bold text-accent">Welcome to{" "}</span>
                <span className="text-6xl font-bold text-accent">Artisan</span>
            </motion.h1>
        </Wrapper>
    )
}