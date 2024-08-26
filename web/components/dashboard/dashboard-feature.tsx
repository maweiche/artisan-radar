
'use client'
import { useState } from 'react';
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

export default function ProductFeature({ params }: { params: { id: string } }) {
    const [slides, setSlides] = useState(Array.from({ length: 5 }));
    const [selected, setSelected] = useState(0);
    const categories = [
        'Watches',
        'Cars',
        'Diamonds',
        'Whisky'
    ]

    return (
        <div className='flex flex-col pt-20 gap-6 items-center w-full'>
            <Wrapper
                // id="hero"
                className='flex flex-col items-center gap-2 w-11/12'
            >            
                <motion.h1 className='flex flex-col gap-2 w-full'>
                    <h1 className="text-3xl text-secondary">Welcome back</h1>
                    <h1 className="text-3xl text-secondary">Soluser1234</h1>
                </motion.h1>
                <Card className='bg-slate-200 w-full items-left flex flex-col'>
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
                <Card className='bg-slate-200 w-full items-left flex flex-col'>
                  <CardContent className="flex flex-row py-2 items-end">
                    
                    <div className='flex flex-col w-full'>
                      <motion.hgroup className="flex flex-row w-full items-center justify-between gap-4">
                        <motion.p className="text-md text-secondaryText">Collector Rank</motion.p>
                        <OpenInNewWindowIcon className='text-secondaryText' />
                      </motion.hgroup>
                      <motion.h1 className="text-3xl text-secondaryText">#1234</motion.h1>
                    </div>
                  </CardContent>
              </Card>
            </Wrapper>
            <Wrapper
                // id="hero"
                className='flex flex-col items-center gap-2 w-11/12'
            >          
              <motion.hgroup className='flex flex-row gap-2 w-full justify-between'>  
                <motion.h1 className='text-secondary text-3xl'>
                  Portfolio
                </motion.h1>
                <Button className='bg-secondary text-secondaryText rounded-full'>
                  Share <OpenInNewWindowIcon className='text-secondaryText' />
                </Button>
              </motion.hgroup>
                <Card className='bg-slate-200 w-full items-left flex flex-col'>
                  <CardContent className="flex flex-row py-2 items-end">
                    
                    <div className='flex flex-col w-full'>
                      <motion.hgroup className="flex flex-row w-full items-center justify-between gap-4">
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
                      </motion.hgroup>
                      <motion.hgroup className="flex flex-row w-full py-2 items-end gap-4">
                        <div className='flex flex-col'>
                          <motion.p className="text-md text-secondaryText">Current Value</motion.p>
                          <motion.h1 className="text-3xl text-secondaryText">$10,324</motion.h1>
                        </div>
                        <motion.p className="text-sm text-secondaryText">+$120</motion.p>
                      </motion.hgroup>
                      <motion.hgroup className="flex flex-row w-full py-2 items-end gap-4">
                        <div className='flex flex-col'>
                          <motion.p className="text-md text-secondaryText">Current Points</motion.p>
                          <motion.h1 className="text-3xl text-secondaryText">+60%</motion.h1>
                        </div>
                        <motion.p className="text-sm text-secondaryText">+1.32%</motion.p>
                      </motion.hgroup>
                      <motion.hgroup className="flex flex-row w-full py-2 items-end gap-4">
                        <div className='flex flex-col'>
                          <motion.p className="text-md text-secondaryText">All time high</motion.p>
                          <motion.h1 className="text-3xl text-secondaryText">$13,456</motion.h1>
                        </div>
                        <motion.p className="text-sm text-secondaryText">54 days ago</motion.p>
                      </motion.hgroup>
                      {/* <motion.hgroup className="flex flex-col w-full py-2 items-end gap-4">
                        <DashboardChart />
                      </motion.hgroup> */}
                    </div>
                  </CardContent>
              </Card>
            </Wrapper>
            <Wrapper className='border-solid border-2 border-slate-200 bg-secondaryText text-secondary w-11/12 rounded-3xl align-center items-left'>
                <Collapsible className='w-full p-4'>
                    <CollapsibleTrigger className='flex flex-row w-full items-center justify-between'> 
                        Earning Potential
                        <ChevronUpIcon />
                    </CollapsibleTrigger>
                    <CollapsibleContent className='flex flex-col'>
                        <ProductChart />
                        <CardFooter className='flex flex-row w-full items-center align-center justify-between'>
                            <p className="text-secondary text-2xl">
                                30 day:
                            </p>
                            <p className="text-secondary text-4xl font-semibold">
                                +27.1%
                            </p>
                        </CardFooter>
                    </CollapsibleContent>
                </Collapsible>
            </Wrapper>
            <Wrapper className='border-solid border-2 border-slate-200 bg-secondaryText text-secondary w-11/12 rounded-3xl align-center items-left'>
                <Collapsible className='w-full p-4'>
                    <CollapsibleTrigger className='flex flex-row w-full items-center justify-between'> 
                        About the Brand
                        <ChevronUpIcon />
                    </CollapsibleTrigger>
                    <CollapsibleContent className='mt-4'>
                        When it comes to impeccable craftsmanship, pioneering designs and rich history of Genevan watchmaking inventions, 
                        there is none more qualified than that of Patek Philippe. The company began its legacy in the nineteenth century, 
                        founded by Antoine Norbert de Patek and Adrien Philippe and has a tradition of innovation that has been crowned by over one hundred patents. 
                        The brand is renowned for its hand-finished watches and skilled craftsman that ensure each and every timepiece is of the highest of standards.
                    </CollapsibleContent>
                </Collapsible>
            </Wrapper>
            <Wrapper className='border-solid border-2 border-slate-200 bg-secondaryText text-secondary w-11/12 rounded-3xl align-center items-left'>
                    <CardHeader>
                        Metadatas
                    </CardHeader>
                    <CardContent className='flex flex-row align-center items-center justify-between gap-4'>
                        <Button className='w-1/2 gap-2 rounded-full bg-secondaryText text-secondary border-solid border-2 border-slate-200'>
                            <Image
                                src={'/logos/sol-logo-grey.svg'}
                                width={20}
                                height={20}
                                alt='Solana Logo'
                            />
                            Check on Solscan
                        </Button>
                        <Button className='w-1/2 rounded-full bg-secondaryText text-secondary border-solid border-2 border-slate-200'>
                            Check Collection
                        </Button>
                    </CardContent>
            </Wrapper>
            <Card className='w-80 border-none shadow-none items-center justify-center flex-col'>
                <CardHeader className='text-5xl text-left px-8'>
                    You might also collect these
                </CardHeader>
                <CardContent>
                    <Carousel showProgress={false} className='w-full bg-white rounded-2xl'>
                        <CarouselContent>
                            {slides.map((_, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-4">
                                        <Card className='bg-slate-200'>
                                            <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                                <Image
                                                    src={'/products/car.svg'}
                                                    width={200}
                                                    height={200}
                                                    alt='car'
                                                />
                                            </CardContent>
                                        </Card>
                                        <div className='flex flex-row mt-6 gap-4 items-center justify-between'>
                                            <div className='flex flex-col gap-2'>
                                                <p className='flex flex-row text-sm font-bold'>
                                                    Patek Philippe
                                                </p>
                                                <div className='flex flex-row gap-2'>
                                                    <Image
                                                        src={'/icons/grid-icon.svg'}
                                                        width={20}
                                                        height={20}
                                                        alt='grid icon'
                                                    />
                                                    <p className='flex flex-row text-sm text-slate-400'>
                                                        Starting from $1
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <Button className='bg-secondary text-secondaryText rounded-xl'>
                                                Collect
                                            </Button>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </CardContent>
                <Progress value={33} className=''/>
            </Card>
            <CtaCard3 />
        </div>
    )
}