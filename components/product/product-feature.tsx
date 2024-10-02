
// 'use client'
// import { useState } from 'react';
// import { ChevronUpIcon } from '@radix-ui/react-icons';
// import { Separator } from '@/components/ui/shadcn/separator-ui';
// import styles from '@/styles/components/Home.module.css';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card-ui"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/shadcn/carousel-ui"
// import {
//     Collapsible,
//     CollapsibleContent,
//     CollapsibleTrigger,
//   } from "@/components/ui/shadcn/collapsible-ui"  
// import { Badge } from "@/components/ui/shadcn/badge-ui"
// import { Progress } from "@/components/ui/shadcn/progress-ui"
// import Wrapper from '@/components/ui/ui-wrapper';
// import { Button } from '@/components/ui/shadcn/button-ui';
// import TransparentCard from '../ui/cards/TransparentCard';
// import { ChartA, ChartB, ChartC } from '@/components/charts';
// import { Card1, Card2, Card3 } from '@/components/cards/info';
// import { CtaCard1, CtaCard2, CtaCard3 } from '@/components/cards/cta';
// import { CollectionsCard, ExpertiseCard } from '@/components/cards';
// import ProductChart from './product-chart-feature';

// export default function ProductFeature({ params }: { params: { id: string } }) {
//     const [slides, setSlides] = useState(Array.from({ length: 5 }));
//     const [selected, setSelected] = useState(0);
//     const categories = [
//         'Watches',
//         'Cars',
//         'Diamonds',
//         'Whisky'
//     ]

//     return (
//         <div className='flex flex-col pt-20 gap-6 items-center w-full'>
//             <Wrapper
//                 // id="hero"
//                 className='flex flex-col items-center gap-2'
//             >            
//                 <motion.h1 className='flex flex-row gap-2 w-full px-4'>
//                     <Badge variant="secondary">Collections</Badge>

//                     <Badge variant="secondary">Watches</Badge>

//                 </motion.h1>
//                 <Carousel className='w-4/6 rounded-2xl' orientation='horizontal' showProgress={false}>
//                     <CarouselContent>
//                         {slides.map((_, index) => (
//                             <CarouselItem key={index}>
//                                 <div className="p-1">
//                                     <Card className='bg-slate-200 w-full'>
//                                         <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                        
//                                                 <Image
//                                                     src={'/products/car.svg'}
//                                                     width={200}
//                                                     height={200}
//                                                     alt='car'
//                                                 />
                                            
//                                         </CardContent>
//                                     </Card>
//                                 </div>
//                             </CarouselItem>
//                         ))}
//                     </CarouselContent>
//                     <CarouselPrevious />
//                     <CarouselNext /> 
//                 </Carousel>
//             </Wrapper>
//             <Wrapper
//                 // id="hero"
//                 className='w-11/12 flex flex-col items-center'
//             >  
//                 <Card className='bg-secondary text-secondary rounded-3xl'>
//                     <CardHeader className='flex flex-row justify-between'>
//                         <h2 className="text-6xl">Brand Name Here</h2>
//                         <Button>
//                             Share
//                         </Button>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="text-lg">
//                             Model
//                         </div>
//                         <div className="text-md">
//                             The Freak collection is an extraordinary series of watches produced by the renowned Swiss watchmaker Ulysse Nardin. 
//                             This collection is a true revolution in the world of watchmaking due to its unique design and innovative mechanism. 
//                             The history of Freak models is rooted in the ingenuity and creativity of Swiss watchmaking. 
//                             These watches stand out for the absence of a traditional dial and for the movement visible directly through the front and back glass. 
//                             Ulysse Nardin's Freak collection is an expression of creativity and advanced engineering in watchmaking. With a history of innovation and a cutting-edge current model, this collection is admired by watch enthusiasts and collectors looking for something truly extraordinary.
//                         </div>
//                     </CardContent>
//                     <CardFooter className='flex flex-col w-full items-center gap-6'>
//                         <div className='flex flex-col w-full items-start gap-4'>
//                             <h4 className='text-xl text-slate-600 font-semibold'>Remaining Fractions</h4>
//                             <span className='text-3xl font-semibold text-slate-600'>
//                                 <span className='text-5xl text-secondary'>
//                                     23
//                                 </span>
//                                 /1000
//                             </span>
//                             <Progress value={33} className="w-full" />
//                         </div>
//                         <div className='flex flex-row gap-4 items-center'>
//                             <Button
//                                 className='text-2xl w-20 rounded-xl items-center justify-center bg-zinc-100 border-solid border-2 border-zinc-200 text-secondary'
//                             >
//                                 -
//                             </Button>
//                             <Badge
//                                 variant='secondary'
//                                 className='text-2xl w-20 rounded-xl items-center justify-center bg-zinc-300 border-solid border-2 border-zinc-400 text-secondary'
//                             >
//                                 1
//                             </Badge>
//                             <Button
//                                 className='text-2xl w-20 rounded-xl items-center justify-center bg-zinc-100 border-solid border-2 border-zinc-200 text-secondary'
//                             >
//                                 +
//                             </Button>
//                         </div>
//                         <div className='flex flex-col w-full gap-6 items-center pb-2'>
//                             <Button
//                                 className='w-11/12 bg-secondary text-secondary text-xl py-6 rounded-2xl'
//                             >
//                                 Buy Fractions
//                             </Button>
//                             <span
//                                 className='text-lg text-zinc-600 font-semibold'
//                             >
//                                 100$ / fraction
//                             </span>
//                         </div>
//                     </CardFooter>
//                 </Card>
//             </Wrapper>
//             <Wrapper className='border-solid border-2 border-slate-200 bg-secondary text-secondary w-11/12 rounded-3xl align-center items-left'>
//                 <Collapsible className='w-full p-4'>
//                     <CollapsibleTrigger className='flex flex-row w-full items-center justify-between'> 
//                         About the product
//                         <ChevronUpIcon />
//                     </CollapsibleTrigger>
//                     <CollapsibleContent className='mt-4'>
//                         <div className='flex flex-row items-center justify-between'>
//                             <p>
//                                 Market Value
//                             </p>
//                             <p>
//                                 $1,000
//                             </p>
//                         </div>
//                         <Separator className="my-2 bg-slate-400" />
//                         <div className='flex flex-row items-center justify-between'>
//                             <p>
//                                 Market Value
//                             </p>
//                             <p>
//                                 $1,000
//                             </p>
//                         </div>
//                         <Separator className="my-4 bg-slate-400" />
//                         <div className='flex flex-row items-center justify-between'>
//                             <p>
//                                 Market Value
//                             </p>
//                             <p>
//                                 $1,000
//                             </p>
//                         </div>
//                         <Separator className="my-4 bg-slate-400" />
//                     </CollapsibleContent>
//                 </Collapsible>
//             </Wrapper>
//             <Wrapper className='border-solid border-2 border-slate-200 bg-secondary text-secondary w-11/12 rounded-3xl align-center items-left'>
//                 <Collapsible className='w-full p-4'>
//                     <CollapsibleTrigger className='flex flex-row w-full items-center justify-between'> 
//                         Earning Potential
//                         <ChevronUpIcon />
//                     </CollapsibleTrigger>
//                     <CollapsibleContent className='flex flex-col'>
//                         <ProductChart />
//                         <CardFooter className='flex flex-row w-full items-center align-center justify-between'>
//                             <p className="text-secondary text-2xl">
//                                 30 day:
//                             </p>
//                             <p className="text-secondary text-4xl font-semibold">
//                                 +27.1%
//                             </p>
//                         </CardFooter>
//                     </CollapsibleContent>
//                 </Collapsible>
//             </Wrapper>
//             <Wrapper className='border-solid border-2 border-slate-200 bg-secondary text-secondary w-11/12 rounded-3xl align-center items-left'>
//                 <Collapsible className='w-full p-4'>
//                     <CollapsibleTrigger className='flex flex-row w-full items-center justify-between'> 
//                         About the Brand
//                         <ChevronUpIcon />
//                     </CollapsibleTrigger>
//                     <CollapsibleContent className='mt-4'>
//                         When it comes to impeccable craftsmanship, pioneering designs and rich history of Genevan watchmaking inventions, 
//                         there is none more qualified than that of Patek Philippe. The company began its legacy in the nineteenth century, 
//                         founded by Antoine Norbert de Patek and Adrien Philippe and has a tradition of innovation that has been crowned by over one hundred patents. 
//                         The brand is renowned for its hand-finished watches and skilled craftsman that ensure each and every timepiece is of the highest of standards.
//                     </CollapsibleContent>
//                 </Collapsible>
//             </Wrapper>
//             <Wrapper className='border-solid border-2 border-slate-200 bg-secondary text-secondary w-11/12 rounded-3xl align-center items-left'>
//                     <CardHeader>
//                         Metadatas
//                     </CardHeader>
//                     <CardContent className='flex flex-row align-center items-center justify-between gap-4'>
//                         <Button className='w-1/2 gap-2 rounded-full bg-secondary text-secondary border-solid border-2 border-slate-200'>
//                             <Image
//                                 src={'/logos/sol-logo-grey.svg'}
//                                 width={20}
//                                 height={20}
//                                 alt='Solana Logo'
//                             />
//                             Check on Solscan
//                         </Button>
//                         <Button className='w-1/2 rounded-full bg-secondary text-secondary border-solid border-2 border-slate-200'>
//                             Check Collection
//                         </Button>
//                     </CardContent>
//             </Wrapper>
//             <Card className='w-80 border-none shadow-none items-center justify-center flex-col'>
//                 <CardHeader className='text-5xl text-left px-8'>
//                     You might also collect these
//                 </CardHeader>
//                 <CardContent>
//                     <Carousel showProgress={false} className='w-full bg-white rounded-2xl'>
//                         <CarouselContent>
//                             {slides.map((_, index) => (
//                                 <CarouselItem key={index}>
//                                     <div className="p-4">
//                                         <Card className='bg-slate-200'>
//                                             <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
//                                                 <Image
//                                                     src={'/products/car.svg'}
//                                                     width={200}
//                                                     height={200}
//                                                     alt='car'
//                                                 />
//                                             </CardContent>
//                                         </Card>
//                                         <div className='flex flex-row mt-6 gap-4 items-center justify-between'>
//                                             <div className='flex flex-col gap-2'>
//                                                 <p className='flex flex-row text-sm font-bold'>
//                                                     Patek Philippe
//                                                 </p>
//                                                 <div className='flex flex-row gap-2'>
//                                                     <Image
//                                                         src={'/icons/grid-icon.svg'}
//                                                         width={20}
//                                                         height={20}
//                                                         alt='grid icon'
//                                                     />
//                                                     <p className='flex flex-row text-sm text-slate-400'>
//                                                         Starting from $1
//                                                     </p>
//                                                 </div>
//                                             </div>
                                            
//                                             <Button className='bg-secondary text-secondary rounded-xl'>
//                                                 Collect
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </CarouselItem>
//                             ))}
//                         </CarouselContent>
//                     </Carousel>
//                 </CardContent>
//                 <Progress value={33} className=''/>
//             </Card>
//             <CtaCard3 />
//         </div>
//     )
// }
import ProductCard from "./components/product-card-ui";
import ProductSwiper from "./components/product-swiper-feature";
import AssetInfo from "./components/asset-info-feature";
import PriceHistory from "./components/product-price-history-feature";
import Statistics from "./components/product-statistics-feature";
import InvestmentSummary from "./components/product-investment-summary-feature";
import AboutBrand from "./components/product-about-brand-feature";
import MetadataLinks from "./components/product-metadata-feature";

const product = {
  name: "Patek Philippe",
  price: "$1",
  imageUrl: "/images/product.png",
};

const related_products = [
  {
    name: "Patek Philippe",
    price: "$1",
    imageUrl: "/images/product.png",
  },
  {
    name: "Patek Philippe",
    price: "$1",
    imageUrl: "/images/product.png",
  },
  {
    name: "Patek Philippe",
    price: "$1",
    imageUrl: "/images/product.png",
  },
];

export default function ProductFeature({ params }: { params: { id: string } }) {
  return (
    <div className="main mt-24 border-red-500 border-red">
      <div className="bg-gray-light min-h-screen px-6 py-5">
        <div className="max-w-screen-xl mx-auto flex flex-wrap">
          <div className="relative w-full md:px-16 md:w-1/2">
            <ProductSwiper />
          </div>
          <div className="w-full md:w-1/2">
            <AssetInfo />
            <PriceHistory />
            <Statistics />
            <InvestmentSummary />
            <AboutBrand />
            <MetadataLinks />
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between gap-6 my-16">
          <div className="rounded-3xl flex flex-col justify-center">
            <h1 className="text-black max-w-64 leading-snug text-5xl">
              You might also
              <span className="italic"> Collect </span>
              them
            </h1>
          </div>
          <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {related_products.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
