
// 'use client'
// import { useState, Suspense, useEffect, use } from 'react';
// import { ObjectCard } from '@/components/protocol/protocol-ui';
// import { PublicKey } from '@solana/web3.js';
// import { ChevronUpIcon, OpenInNewWindowIcon } from '@radix-ui/react-icons';
// import { Separator } from '@/components/ui/shadcn/separator-ui';
// import styles from '@/styles/components/Home.module.css';
// import DashboardChart from './dashboard-chart-feature';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/shadcn/select-ui"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/shadcn/card-ui"
// import {
//     Collapsible,
//     CollapsibleContent,
//     CollapsibleTrigger,
//   } from "@/components/ui/shadcn/collapsible-ui"  
// import Wrapper from '@/components/ui/ui-wrapper';
// import { Button } from '@/components/ui/shadcn/button-ui';
// import { fetchAssets } from '@/components/protocol/protocol-umi-access';
// import { useWallet } from '@solana/wallet-adapter-react';
// import { fetchAssetsByOwner, AssetV1, fetchCollectionV1, CollectionV1 } from '@metaplex-foundation/mpl-core'
// import { CtaCard3 } from '../cards/cta';
// import { useArtisanProgramAccount } from '../protocol/protocol-data-access';
// import { publicKey as publicKey2 } from '@metaplex-foundation/umi';
// import { set } from '@metaplex-foundation/umi/serializers';
// export default function DashboardFeature() {
//     const { publicKey } = useWallet();
//     const [userAssets, setUserAssets] = useState<AssetV1[]>([]);
//     const [slides, setSlides] = useState(Array.from({ length: 5 }));
//     const [selected, setSelected] = useState(0);
    
//     const categories = [
//         'Watches',
//         'Cars',
//         'Diamonds',
//         'Whisky'
//     ]

//     async function fetchUserAssets(owner: string){
//       const assets = await fetchAssets(owner);   
//       console.log('user assets', assets);       
//         const listingArray: any = [];
//         for (let i = 0; i < assets.length; i++) {

//           // if the listing exists already in the listingArray with the same associatedId as the listing.listing, then increase the quantity by 1
//           // else just push the new listing to the listingArray
//           // if (listingArray.find((item: any) => item.associatedId === assets[i].listing)) {
//           //   const index = listingArray.findIndex((item: any) => item.associatedId === listing.listing);
//           //   listingArray[index].quantity += 1;
//           //   continue; 
//           // } 
//           // listingArray.push({
//           //   ...assets[i],
//           //   associatedId: listing.listing,
//           //   price: listing.price,
//           //   quantity: 1,
//           // });
//         }
//         console.log('all user assets', listingArray);
//         setUserAssets(assets);
      
//     };

//     useEffect(() => {
//       if(publicKey) {
//         fetchUserAssets(publicKey.toBase58());
//       }
//     }, [publicKey])
//     return (
//       <Suspense fallback={<div />}>
//         <div className='flex flex-col pt-20 gap-6 items-center w-full'>
//             <Wrapper
//                 // id="hero"
//                 className='flex flex-col items-center gap-2 w-11/12'
//             >            
//               <motion.hgroup className='flex flex-col gap-2 w-full'>
//                   <h1 className="text-3xl text-secondary">Welcome back</h1>
//                   <h1 className="text-3xl text-secondary">Soluser1234</h1>
//               </motion.hgroup>
//               <Card className='bg-secondary text-secondaryText w-full items-left flex flex-col'>
//                 <CardContent className="flex flex-row py-2 items-end">
//                   <Image
//                       src={'/logos/artisan-3d-logo.svg'}
//                       width={45}
//                       height={45}
//                       alt='car'
//                       className='mr-4'
//                   />
//                   <div className='flex flex-col'>
//                     <motion.p className="text-md text-secondaryText">Current Points</motion.p>
//                     <motion.h1 className="text-3xl text-secondaryText">10,324</motion.h1>
//                   </div>
//                   <motion.p className="text-2xl text-secondaryText">+10</motion.p>
//                 </CardContent>
//               </Card>
//             </Wrapper>
//             <Wrapper
//                 // id="hero"
//                 className='flex flex-col items-center gap-2 w-11/12'
//             >            
//                 <Card className='bg-secondary text-secondaryText w-full items-left flex flex-col'>
//                   <CardContent className="flex flex-row py-2 items-end">
                    
//                     <div className='flex flex-col w-full'>
//                       <div className="flex flex-row w-full items-center justify-between gap-4">
//                         <motion.p className="text-md text-secondaryText">Collector Rank</motion.p>
//                         <OpenInNewWindowIcon className='text-secondaryText' />
//                       </div>
//                       <motion.h1 className="text-3xl text-secondaryText">#1234</motion.h1>
//                     </div>
//                   </CardContent>
//               </Card>
//             </Wrapper>
//             <Wrapper
//                 // id="hero"
//                 className='flex flex-col items-center gap-2 w-11/12'
//             >          
//               <div className='flex flex-row gap-2 w-full justify-between'>  
//                 <motion.h1 className='text-secondary text-3xl'>
//                   Portfolio
//                 </motion.h1>
//                 <Button className='bg-secondary text-secondaryText rounded-full'>
//                   Share <OpenInNewWindowIcon className='text-secondaryText' />
//                 </Button>
//               </div>
//                 <Card className='bg-secondary text-secondaryText w-full items-left flex flex-col'>
//                   <CardContent className="flex flex-row py-2 items-end">
                    
//                     <div className='flex flex-col w-full'>
//                       <div className="flex flex-row w-full items-center justify-between gap-4">
//                         <motion.p className="text-md text-secondaryText">Wallet value</motion.p>
//                         <Select>
//                           <SelectTrigger className="w-1/3">
//                             <SelectValue placeholder="Today" />
//                           </SelectTrigger>
//                           <SelectContent className='bg-secondary'>
//                             <SelectItem value="today" className='text-secondaryText'>Today</SelectItem>
//                             <SelectItem value="thirty" className='text-secondaryText'>30 Days</SelectItem>
//                             <SelectItem value="ninty" className='text-secondaryText'>90 Days</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="flex flex-row w-full py-2 items-end gap-4">
//                         <div className='flex flex-col'>
//                           <motion.p className="text-md text-secondaryText">Current Value</motion.p>
//                           <motion.h1 className="text-3xl text-secondaryText">$10,324</motion.h1>
//                         </div>
//                         <motion.p className="text-sm text-secondaryText">+$120</motion.p>
//                       </div>
//                       <div className="flex flex-row w-full py-2 items-end gap-4">
//                         <div className='flex flex-col'>
//                           <motion.p className="text-md text-secondaryText">Current Points</motion.p>
//                           <motion.h1 className="text-3xl text-secondaryText">+60%</motion.h1>
//                         </div>
//                         <motion.p className="text-sm text-secondaryText">+1.32%</motion.p>
//                       </div>
//                       <div className="flex flex-row w-full py-2 items-end gap-4 mb-4">
//                         <div className='flex flex-col'>
//                           <motion.p className="text-md text-secondaryText">All time high</motion.p>
//                           <motion.h1 className="text-3xl text-secondaryText">$13,456</motion.h1>
//                         </div>
//                         <motion.p className="text-sm text-secondaryText">54 days ago</motion.p>
//                       </div>
//                       <DashboardChart />
//                     </div>
//                   </CardContent>
//               </Card>
//             </Wrapper>
//             <Wrapper
//                 // id="hero"
//                 className='flex flex-col items-center gap-2 w-11/12'
//             >
//               <Card className='bg-secondary text-secondaryText w-full items-left flex flex-col'>
//                   <CardContent className="flex flex-row py-2 items-end">
                    
//                     <div className='flex flex-col w-full'>
//                       <div className="flex flex-row w-full items-center justify-between gap-4">
//                         <motion.p className="text-md text-secondaryText">Top gainer</motion.p>
//                         <Select>
//                           <SelectTrigger className="w-1/3">
//                             <SelectValue placeholder="Today" />
//                           </SelectTrigger>
//                           <SelectContent className='bg-secondary'>
//                             <SelectItem value="today" className='text-secondaryText'>Today</SelectItem>
//                             <SelectItem value="thirty" className='text-secondaryText'>30 Days</SelectItem>
//                             <SelectItem value="ninty" className='text-secondaryText'>90 Days</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <div className="flex flex-row w py-2 items-center justify-center gap-4">
//                         <Image
//                           src={'/products/freak-watch.png'}
//                           width={200}
//                           height={200}
//                           alt='watch'
//                         />
//                       </div>
//                       <div className="flex flex-row w-full py-2 items-end gap-4">
//                         <div className='flex flex-col'>
//                           <motion.p className="text-md text-secondaryText">ROI</motion.p>
//                           <motion.h1 className="text-3xl text-secondaryText">$1,234</motion.h1>
//                         </div>
//                         <motion.p className="text-sm text-secondaryText">+15.32%</motion.p>
//                       </div>
//                       <div className="flex flex-row w-full py-2 items-end mb-4">
//                         <div className='flex flex-col'>
//                           <motion.p className="text-md text-secondaryText">Fraction Value</motion.p>
//                           <motion.h1 className="text-3xl text-secondaryText">$230</motion.h1>
//                         </div>
//                         <motion.p className="text-sm text-secondaryText">+$123</motion.p>
//                       </div>
//                     </div>
//                   </CardContent>
//               </Card>
//             </Wrapper>
//             <Wrapper className='border-solid border-2 border-slate-200 bg-secondary text-secondaryText w-11/12 rounded-3xl align-center items-left'>
//                 <Collapsible className='w-full p-4'>
//                     <CollapsibleTrigger className='flex flex-row w-full items-center justify-between'> 
//                         My Inventory
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
//             <Wrapper className='border-solid border-2 border-slate-200 bg-secondary text-secondaryText w-11/12 rounded-3xl align-center items-left'>
//                 <Collapsible className='w-full p-4'>
//                     <CollapsibleTrigger className='flex flex-row w-full items-center justify-between'> 
//                         All orders
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
//             { userAssets.length > 0 && (
//               userAssets.map((asset, index) => {
//                 return (
//                   <ObjectCard 
//                     account={new PublicKey(asset!.publicKey)} listingId={asset?.key} key={index}
//                   />
//                 )}
//               ))
//             }
//             <CtaCard3 />
//         </div>
//       </Suspense>
//     )
// }

'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/shadcn/button-ui';
import { Card, CardContent } from '@/components/ui/shadcn/card-ui';
import { IconCurrencySolana } from '@tabler/icons-react';
import { CrossCircledIcon, Share1Icon } from '@radix-ui/react-icons';
import PortfolioGraph from './dashboardComponents/PortfolioGraph';
import TopGainer from './dashboardComponents/TopGainer';
import ArtisansTable from './dashboardComponents/ArtisansTable';
import InvitationCTA from './dashboardComponents/InvitationCTA';
import { useWallet } from '@solana/wallet-adapter-react';
// Dynamically import Joyride with ssr disabled
const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

export default function DashboardFeature() {
  const [runTour, setRunTour] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { publicKey } = useWallet();
  // useMemo to create a User object we can update as info comes in from our db
  const user = useMemo(() => {
    return {
      name: 'Souluser1234',
      points: 10324,
      rank: 1234,
      walletValue: 10000,
      walletValueChange: 120,
      pointsChange: 60,
      pointsChangePercentage: 1.32,
      allTimeHigh: 13456,
      allTimeHighDaysAgo: 54,
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    // Optional: Set runTour to true after a short delay
    const timer = setTimeout(() => setRunTour(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      target: '.portfolio-card-1',
      content: 'This card shows your current Wallet Metrics.',
      disableBeacon: true,
    },
    {
      target: '.portfolio-card-2',
      content: 'Here you can see top Gainer Products.',
    },
    {
      target: '.portfolio-card-3',
      content: 'Here you can see top Gainer Products.',
    },
    {
      target: '.portfolio-card-4',
      content: 'Here you can see all the Artisans listed in a table.',
    },
    {
      target: '.portfolio-card-5',
      content: 'Share your referral link and earn $10 on each investment.',
    },
  ];

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    if (['finished', 'skipped'].includes(status)) {
      setRunTour(false);
    }
  };

  return (
    <Suspense fallback={<div />}>
      {isMounted && (
        <Joyride
          steps={steps}
          run={runTour}
          continuous={true}
          showSkipButton={true}
          showProgress={true}
          styles={{
            options: {
              primaryColor: '#0066FF',
            },
          }}
          callback={handleJoyrideCallback}
        />
      )}
      <div className="flex flex-col bg-bg pt-6 mt-12 md:pt-14 pb-4 md:pb-8 gap-4 md:gap-8 items-center w-full overflow-auto px-4 md:px-0">
        {/* Header Section */}
        <div className="flex flex-row  md:flex-row items-start md:items-center text-secondary gap-2 md:gap-4 w-full md:w-11/12">
          <motion.h1 className="text-3xl md:text-5xl font-semibold">
            Welcome back 
            <span className="opacity-[.4]">
              {user.name}
            </span>
          </motion.h1>
          <div className="flex items-center gap-2 text-[#fff] bg-[#3F3F46] rounded-lg px-3 py-[6px] text-sm md:text-base">
            <CrossCircledIcon />
            <span>Unverified</span>
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-11/12 text-secondary">
          {[1, 2, 3].map((_, index) => (
            <Card
              key={index}
              className="rounded-3xl flex flex-row items-center gap-4 justify-between w-full bg-bg p-4 border-zinc-300 dark:border-zinc-700"
            >
              <div className="h-12 md:h-16 aspect-square border border-zinc-300 dark:border-zinc-700 rounded-2xl px-2 md:px-3 py-2 md:py-3 text-secondary">
                <IconCurrencySolana className="w-full h-full" />
              </div>
              <div className="flex w-full items-end gap-2">
                <div className="flex flex-col gap-1">
                  <motion.p className="text-xs md:text-sm text-[#D4D4D8] text-secondary">
                    Buying Power
                  </motion.p>
                  <motion.h1 className="text-xl md:text-3xl text-secondary">
                    $1000
                  </motion.h1>
                </div>
                <motion.p className="text-xs md:text-md text-secondary text-zinc-700 dark:text-zinc-300">
                  $100 USDC
                </motion.p>
              </div>
            </Card>
          ))}
        </div>

        {/* Body Section */}
        <div className="flex flex-row items-center gap-4 w-full md:w-11/12 mt-2 md:mt-4">
          <motion.h1 className="text-2xl md:text-3xl text-secondary">
            Portfolio
          </motion.h1>
          <Button className="bg-bg flex items-center gap-2 text-secondary rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm md:text-base">
            <span>Share</span> <Share1Icon className="text-secondary" />
          </Button>
        </div>

        {/* Bento Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 w-full md:w-11/12">
          <div className="md:col-span-3 portfolio-card-1">
            <PortfolioGraph />
          </div>
          <div className="md:col-span-2 portfolio-card-2">
            <TopGainer />
          </div>
          <div className="md:col-span-2 portfolio-card-3">
            <TopGainer />
          </div>
          <div className="md:col-span-5 portfolio-card-4">
            <ArtisansTable />
          </div>
          <div className="md:col-span-2 portfolio-card-5">
            <InvitationCTA />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
