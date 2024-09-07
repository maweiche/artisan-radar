'use client';
import styles from '@/styles/cards/ExpertiseCard.module.css'
import { Button }from '@/components/ui/shadcn/button-ui'
import Image from 'next/image';
import { ChevronRightIcon, TriangleUpIcon } from "@radix-ui/react-icons"
import { Card, CardContent, CardFooter } from "@/components/ui/shadcn/card-ui"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel-ui"
// import { motion, MotionProps } from 'framer-motion';
import TransparentCard from '../ui/cards/TransparentCard';
import { Badge } from '../ui/shadcn/badge-ui';
import { Card1, Card2 } from '../cards/info';
import { ChartC } from '../charts';

interface DefaultProps {
  className?: string;
}


const PerformanceCard = () => {

  return (
    <TransparentCard className='text-secondary text-2xl w-full md:w-3/4 lg:w-3/4 items-center justify-center flex flex-col text-center gap-4'>
        <Badge>
            <span className='text-secondary'>The Artisan</span>
        </Badge>
        <div className='text-secondary text-2xl w-full md:w-3/4 lg:w-3/4'>
            <span className='font-bold'>In the past decade</span>, certain Luxury Assets have demonstrated superior performance compared to the S&P 500.
        </div>
        <div className='flex flex-col w-full md:flex-row lg:flex-row'>
            <Card1 className='w-1/2 mx-2 justify-between flex flex-col'/> 
            <TopPerformerCard className='w-1/4 min-h-full justify-between items-center flex flex-col mx-2'/>
            <TopPerformer2Card className='w-1/4 min-h-full justify-between items-center flex flex-col mx-2'/>
        </div>
        <ChartC className='w-full h-80 overflow-hidden'/>
    </TransparentCard>  
  );

};

export default PerformanceCard;

const TopPerformerCard = (
    props: DefaultProps
  ) => {
    return (
      <Card
        className={`${props.className}`}
      >
        {/* <CardHeader>
          <CardTitle>
            TOTAL VALUE
          </CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader> */}
        <CardContent className='py-4 flex flex-col items-center min-h-3/4 justify-center gap-4'>
            <Image
                src={'/products/freak-watch.png'}
                width={200}
                height={200}
                alt='top performer icon'
            />
        </CardContent>
        <CardFooter className='flex flex-col items-center justify-center'>
            <p className='text-2xl font-semibold text-secondary'>
                Ulysse Nardin
            </p>
            <p className='text-4xl text-secondary'>
                $32,032
            </p>
            <Badge className='text-secondary bg-green-500 border-green-400 rounded-full'>
                <TriangleUpIcon className='text-white'/>
                <span className='text-white'>+56%</span>
            </Badge>
        </CardFooter>
      </Card>
    )
  }


const TopPerformer2Card = (
    props: DefaultProps
) => {
    return (    
        <Card
            className={`${props.className}`}
        >
        {/* <CardHeader>
            <CardTitle>
            TOTAL VALUE
            </CardTitle>
            <CardDescription>January - June 2024</CardDescription>
        </CardHeader> */}
        <CardContent className='py-4 flex flex-col justify-center items-center gap-4'>
            <Image
                src={'/products/car.svg'}
                width={400}
                height={400}
                alt='top performer icon'
                className='pt-12'
            />
        </CardContent>
        <CardFooter className='flex flex-col items-center justify-center'>
            <p className='text-2xl font-semibold text-secondary'>
                Super Car
            </p>
            <p className='text-4xl text-secondary'>
                $32,032
            </p>
            <Badge className='text-secondary bg-green-500 border-green-400 rounded-full'>
                <TriangleUpIcon className='text-white'/>
                <span className='text-white'>+56%</span>
            </Badge>
        </CardFooter>
        </Card>
    )
}


const PastPerformanceChartCard = (
    props: DefaultProps
) => {
    return (    
        <Card
            className={`${props.className}`}
        >
        {/* <CardHeader>
            <CardTitle>
            TOTAL VALUE
            </CardTitle>
            <CardDescription>January - June 2024</CardDescription>
        </CardHeader> */}
        <CardContent className='py-4 flex flex-col justify-center items-center gap-4'>
            <Image
                src={'/products/car.svg'}
                width={400}
                height={400}
                alt='top performer icon'
                className='pt-12'
            />
        </CardContent>
        <CardFooter className='flex flex-col items-center justify-center'>
            <p className='text-2xl font-semibold text-secondary'>
                Super Car
            </p>
            <p className='text-4xl text-secondary'>
                $32,032
            </p>
            <Badge className='text-secondary bg-green-500 border-green-400 rounded-full'>
                <TriangleUpIcon className='text-white'/>
                <span className='text-white'>+56%</span>
            </Badge>
        </CardFooter>
        </Card>
    )
}