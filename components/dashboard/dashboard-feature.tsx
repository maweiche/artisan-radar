// import { ObjectCard } from '@/components/protocol/protocol-ui';
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
//             { userAssets.length > 0 && (
//               userAssets.map((asset, index) => {
//                 return (
//                   <ObjectCard
//                     account={new PublicKey(asset!.publicKey)} listingId={asset?.key} key={index}
//                   />
//                 )}
//               ))
//             }

'use client';

import { Suspense, useState, useEffect, useMemo, use } from 'react';
import { Binoculars } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/shadcn/button-ui';
import { fetchAssets } from '@/components/protocol/protocol-umi-access';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  fetchAssetsByOwner,
  AssetV1,
  fetchCollectionV1,
  CollectionV1,
} from '@metaplex-foundation/mpl-core';
import { Card, CardContent } from '@/components/ui/shadcn/card-ui';
import { IconCurrencySolana } from '@tabler/icons-react';
import { CrossCircledIcon, Share1Icon } from '@radix-ui/react-icons';
import PortfolioGraph from './dashboardComponents/PortfolioGraph';
import TopGainer from './dashboardComponents/TopGainer';
import ArtisansTable from './dashboardComponents/ArtisansTable';
import InvitationCTA from './dashboardComponents/InvitationCTA';

// Dynamically import Joyride with ssr disabled
const Joyride = dynamic(() => import('react-joyride'), { ssr: false });

export default function DashboardFeature() {
  const [runTour, setRunTour] = useState(false);
  const [userAssets, setUserAssets] = useState<AssetV1[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [joyrideStatus, setJoyrideStatus] = useState('idle');
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
    if (status === 'finished') {
      localStorage.setItem(
        'artisanTour',
        JSON.stringify({ completed: true, date: new Date().toISOString() })
      );
    }
    if (status === 'skipped') {
      localStorage.setItem(
        'artisanTour',
        JSON.stringify({ completed: true, date: new Date().toISOString() })
      );
    }
    setJoyrideStatus(status);
  };

  async function fetchUserAssets(owner: string) {
    const assets = await fetchAssets(owner);
    console.log('user assets', assets);
    const listingArray: any = [];
    for (let i = 0; i < assets.length; i++) {
      // // if the listing exists already in the listingArray with the same associatedId as the listing.listing, then increase the quantity by 1
      // // else just push the new listing to the listingArray
      // if (listingArray.find((item: any) => item.associatedId === assets[i].listing)) {
      //   const index = listingArray.findIndex((item: any) => item.associatedId === listing.listing);
      //   listingArray[index].quantity += 1;
      //   continue;
      // }
      // listingArray.push({
      //   ...assets[i],
      //   associatedId: listing.listing,
      //   price: listing.price,
      //   quantity: 1,
      // });
    }
    console.log('all user assets', listingArray);
    setUserAssets(assets);
  }

  useEffect(() => {
    setIsMounted(true);

    // create a localStorage item to track if the user has completed the tour, it needs to be structured as boolean:DateIsoString
    const artisanTour = localStorage.getItem('artisanTour');
    if (!artisanTour) {
      localStorage.setItem(
        'artisanTour',
        JSON.stringify({ completed: false, date: new Date().toISOString() })
      );
      setRunTour(true);
    } else {
      const { completed, date } = JSON.parse(artisanTour);
      if (!completed) {
        setRunTour(true);
      }

      // If the tour was completed more than 1 week ago, reset the tour
      if (
        completed &&
        new Date(date) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ) {
        localStorage.setItem(
          'artisanTour',
          JSON.stringify({ completed: false, date: new Date().toISOString() })
        );
        setRunTour(true);
      }

      // If the tour was completed, set the status to 'finished'
      if (completed) {
        setJoyrideStatus('finished');
        setRunTour(false);
      }
    }
  }, []);

  useEffect(() => {
    if (publicKey) {
      fetchUserAssets(publicKey.toBase58());
    }
  }, [publicKey]);

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
            <span className="opacity-[.4]">{user.name}</span>
          </motion.h1>
          <div className="flex flex-col-reverse items-start md:flex-row md:items-center gap-2">
            {' '}
            <div className="flex items-center gap-2 text-[#fff] bg-[#3F3F46] rounded-lg px-3 py-[6px] text-sm md:text-base">
              <CrossCircledIcon />
              <span>Unverified</span>
            </div>
            {/* Button to activate tour */}
            <Button
              onClick={() => setRunTour(true)}
              className="bg-bg text-secondary rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm md:text-base"
            >
              <Binoculars className="w-6 h-6 mr-2" /> Tour
            </Button>
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
                <motion.p className="text-xs md:text-md text-secondary text-zinc-700 dark:text-zinc-300 mb-1">
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