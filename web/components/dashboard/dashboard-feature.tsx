
'use client'
import { useState, Suspense } from 'react';
import { ChevronUpIcon, OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/shadcn/separator-ui';
import styles from '@/styles/components/Home.module.css';
import DashboardChart from './dashboard-chart-feature';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select-ui"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card-ui"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/shadcn/carousel-ui"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/shadcn/collapsible-ui"  
import { Badge } from "@/components/ui/shadcn/badge-ui"
import { Progress } from "@/components/ui/shadcn/progress-ui"
import Wrapper from '@/components/ui/ui-wrapper';
import { Button } from '@/components/ui/shadcn/button-ui';
import TransparentCard from '../ui/cards/TransparentCard';
import { ChartA, ChartB, ChartC } from '@/components/charts';
import { Card1, Card2, Card3 } from '@/components/cards/info';
import { CtaCard1, CtaCard2, CtaCard3 } from '@/components/cards/cta';
import { CollectionsCard, ExpertiseCard } from '@/components/cards';
import ProductChart from '@/components/product/product-chart-feature';

export default function DashboardFeature() {
    const [slides, setSlides] = useState(Array.from({ length: 5 }));
    const [selected, setSelected] = useState(0);
    const categories = [
        'Watches',
        'Cars',
        'Diamonds',
        'Whisky'
    ]

    return (
      <Suspense fallback={<div />}>
        <div className='flex flex-col pt-20 gap-6 items-center w-full'>
            <Wrapper
                // id="hero"
                className='flex flex-col items-center gap-2 w-11/12'
            >            
              <motion.hgroup className='flex flex-col gap-2 w-full'>
                  <h1 className="text-3xl text-secondary">Welcome back</h1>
                  <h1 className="text-3xl text-secondary">Soluser1234</h1>
              </motion.hgroup>
              <Card className='bg-secondary text-secondaryText w-full items-left flex flex-col'>
                <CardContent className="flex flex-row py-2 items-end">
                  <Image
                      src={'/logos/artisan-3d-logo.svg'}
                      width={45}
                      height={45}
                      alt='car'
                      className='mr-4'
                  />
                  <div className='flex flex-col'>
                    <motion.p className="text-md text-secondaryText">Current Points</motion.p>
                    <motion.h1 className="text-3xl text-secondaryText">10,324</motion.h1>
                  </div>
                  <motion.p className="text-2xl text-secondaryText">+10</motion.p>
                </CardContent>
              </Card>
            </Wrapper>
            <Wrapper
                // id="hero"
                className='flex flex-col items-center gap-2 w-11/12'
            >            
                <Card className='bg-secondary text-secondaryText w-full items-left flex flex-col'>
                  <CardContent className="flex flex-row py-2 items-end">
                    
                    <div className='flex flex-col w-full'>
                      <div className="flex flex-row w-full items-center justify-between gap-4">
                        <motion.p className="text-md text-secondaryText">Collector Rank</motion.p>
                        <OpenInNewWindowIcon className='text-secondaryText' />
                      </div>
                      <motion.h1 className="text-3xl text-secondaryText">#1234</motion.h1>
                    </div>
                  </CardContent>
              </Card>
            </Wrapper>
            <Wrapper
                // id="hero"
                className='flex flex-col items-center gap-2 w-11/12'
            >          
              <div className='flex flex-row gap-2 w-full justify-between'>  
                <motion.h1 className='text-secondary text-3xl'>
                  Portfolio
                </motion.h1>
                <Button className='bg-secondary text-secondaryText rounded-full'>
                  Share <OpenInNewWindowIcon className='text-secondaryText' />
                </Button>
              </div>
                <Card className='bg-secondary text-secondaryText w-full items-left flex flex-col'>
                  <CardContent className="flex flex-row py-2 items-end">
                    
                    <div className='flex flex-col w-full'>
                      <div className="flex flex-row w-full items-center justify-between gap-4">
                        <motion.p className="text-md text-secondaryText">Wallet value</motion.p>
                        <Select>
                          <SelectTrigger className="w-1/3">
                            <SelectValue placeholder="Today" />
                          </SelectTrigger>
                          <SelectContent className='bg-secondary'>
                            <SelectItem value="today" className='text-secondaryText'>Today</SelectItem>
                            <SelectItem value="thirty" className='text-secondaryText'>30 Days</SelectItem>
                            <SelectItem value="ninty" className='text-secondaryText'>90 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-row w-full py-2 items-end gap-4">
                        <div className='flex flex-col'>
                          <motion.p className="text-md text-secondaryText">Current Value</motion.p>
                          <motion.h1 className="text-3xl text-secondaryText">$10,324</motion.h1>
                        </div>
                        <motion.p className="text-sm text-secondaryText">+$120</motion.p>
                      </div>
                      <div className="flex flex-row w-full py-2 items-end gap-4">
                        <div className='flex flex-col'>
                          <motion.p className="text-md text-secondaryText">Current Points</motion.p>
                          <motion.h1 className="text-3xl text-secondaryText">+60%</motion.h1>
                        </div>
                        <motion.p className="text-sm text-secondaryText">+1.32%</motion.p>
                      </div>
                      <div className="flex flex-row w-full py-2 items-end gap-4 mb-4">
                        <div className='flex flex-col'>
                          <motion.p className="text-md text-secondaryText">All time high</motion.p>
                          <motion.h1 className="text-3xl text-secondaryText">$13,456</motion.h1>
                        </div>
                        <motion.p className="text-sm text-secondaryText">54 days ago</motion.p>
                      </div>
                      <DashboardChart />
                    </div>
                  </CardContent>
              </Card>
            </Wrapper>
            <Wrapper
                // id="hero"
                className='flex flex-col items-center gap-2 w-11/12'
            >
              <Card className='bg-secondary text-secondaryText w-full items-left flex flex-col'>
                  <CardContent className="flex flex-row py-2 items-end">
                    
                    <div className='flex flex-col w-full'>
                      <div className="flex flex-row w-full items-center justify-between gap-4">
                        <motion.p className="text-md text-secondaryText">Top gainer</motion.p>
                        <Select>
                          <SelectTrigger className="w-1/3">
                            <SelectValue placeholder="Today" />
                          </SelectTrigger>
                          <SelectContent className='bg-secondary'>
                            <SelectItem value="today" className='text-secondaryText'>Today</SelectItem>
                            <SelectItem value="thirty" className='text-secondaryText'>30 Days</SelectItem>
                            <SelectItem value="ninty" className='text-secondaryText'>90 Days</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex flex-row w py-2 items-center justify-center gap-4">
                        <Image
                          src={'/products/freak-watch.png'}
                          width={200}
                          height={200}
                          alt='watch'
                        />
                      </div>
                      <div className="flex flex-row w-full py-2 items-end gap-4">
                        <div className='flex flex-col'>
                          <motion.p className="text-md text-secondaryText">ROI</motion.p>
                          <motion.h1 className="text-3xl text-secondaryText">$1,234</motion.h1>
                        </div>
                        <motion.p className="text-sm text-secondaryText">+15.32%</motion.p>
                      </div>
                      <div className="flex flex-row w-full py-2 items-end mb-4">
                        <div className='flex flex-col'>
                          <motion.p className="text-md text-secondaryText">Fraction Value</motion.p>
                          <motion.h1 className="text-3xl text-secondaryText">$230</motion.h1>
                        </div>
                        <motion.p className="text-sm text-secondaryText">+$123</motion.p>
                      </div>
                    </div>
                  </CardContent>
              </Card>
            </Wrapper>
            <Wrapper className='border-solid border-2 border-slate-200 bg-secondary text-secondaryText w-11/12 rounded-3xl align-center items-left'>
                <Collapsible className='w-full p-4'>
                    <CollapsibleTrigger className='flex flex-row w-full items-center justify-between'> 
                        All orders
                        <ChevronUpIcon />
                    </CollapsibleTrigger>
                    <CollapsibleContent className='mt-4'>
                        <div className='flex flex-row items-center justify-between'>
                            <p>
                                Market Value
                            </p>
                            <p>
                                $1,000
                            </p>
                        </div>
                        <Separator className="my-2 bg-slate-400" />
                        <div className='flex flex-row items-center justify-between'>
                            <p>
                                Market Value
                            </p>
                            <p>
                                $1,000
                            </p>
                        </div>
                        <Separator className="my-4 bg-slate-400" />
                        <div className='flex flex-row items-center justify-between'>
                            <p>
                                Market Value
                            </p>
                            <p>
                                $1,000
                            </p>
                        </div>
                        <Separator className="my-4 bg-slate-400" />
                    </CollapsibleContent>
                </Collapsible>
            </Wrapper>
            <CtaCard3 />
        </div>
      </Suspense>
    )
}