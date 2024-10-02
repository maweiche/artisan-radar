
'use client'
import { useState, Suspense, useEffect, use } from 'react';
import { ChevronUpIcon, OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/shadcn/separator-ui';
import styles from '@/styles/components/Home.module.css';
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
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/shadcn/collapsible-ui"  
import Wrapper from '@/components/ui/ui-wrapper';
import { Keypair, PublicKey, VersionedTransaction } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import { useMemo } from 'react';
import { ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useTransactionToast } from '@/components/ui/ui-layout';
import {
  useArtisanProgram,
  useArtisanProgramAccount,
} from './protocol-data-access';
import { fetchObjectDetails } from './protocol-umi-access';
import { useWallet , useConnection } from '@solana/wallet-adapter-react';
import { list } from 'postcss';

export function ListingList() {
  const { listings, watches, profiles, getProgramAccount } = useArtisanProgram();
  const { connection } = useConnection();
  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  if (!getProgramAccount.data?.value) {
    return (
      <Wrapper className="alert alert-info flex justify-center">
        <span>
          Program account not found. Make sure you have deployed the program and
          are on the correct cluster.
        </span>
      </Wrapper>
    );
  }
  return (
    <Wrapper className={'space-y-6'}>
      {listings.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : listings.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {listings.data?.slice(0,1).map((account : any) => (
            <ListingCard
              key={account.publicKey.toString()}
              account={account.publicKey}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}

      {/* {watches.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : watches.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {watches.data?.map((account) => (
            <WatchCard
              key={account.publicKey.toString()}
              account={account.publicKey}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
       */}

      {/* {profiles.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : profiles.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {profiles.data?.map((account) => (
            <ProfileCard
              key={account.publicKey.toString()}
              account={account.publicKey}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )} */}

    </Wrapper>
  );
}

function ListingCard({ account }: { account: PublicKey }) {
  const {
    listingQuery,
    // incrementMutation,
    // setMutation,
    // decrementMutation,
    // closeMutation,
  } = useArtisanProgramAccount({ account });

  const listing: { id: BN; objectType: any; object: PublicKey; share: number; shareSold: number; price: BN; startingTime: BN; bump: number; } | undefined = useMemo(() => {
    return listingQuery.data && {
      id: listingQuery.data?.id ?? 0, // this is supposed to be a BN and the ?? makes sure it is not undefined or null if it is then it will be 0
      objectType: listingQuery.data.objectType ?? 0,
      object: listingQuery.data.object ?? 'watch',
      share: listingQuery.data.share ?? 0,
      shareSold: listingQuery.data.shareSold ?? 0,
      price: listingQuery.data.price ?? new BN(0),
      startingTime: listingQuery.data.startingTime ?? new BN(0),
      bump: listingQuery.data.bump ?? 0
    }
  }, [
    listingQuery.data
  ]);


  

  return listingQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2
            className="card-title justify-center text-3xl cursor-pointer"
            onClick={() => listingQuery.refetch()}
          >
            {listing?.id.toString()}
          </h2>
          <div className="card-actions flex flex-col items-center justify-around">
            <Image 
              src={`https://artisan-solana.s3.eu-central-1.amazonaws.com/${account.toString()}-0.jpg`}
              alt='listing image'
              width={200}
              height={400}
            />
            <p>
              Object: 
              <ObjectCard account={listing!.object} listingId={listing!.id}/>
            </p>
            <p>
              Object Type: {listing?.objectType.watch ? 'Watch' : 'Diamonds'}
            </p>
            <p>
              Total Shares: {listing?.share.toString()}
            </p>
            <p>
              Shares Sold: {listing?.shareSold.toString()}
            </p>
            <p>
              Price: {listing?.price.toString()}
            </p>
            <p>
              {/* convert starting time from date iso string to readable locale string */}
              Start Time{new Date(listing!.startingTime.toNumber()).toLocaleString()}
            </p>
            {/* <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => incrementMutation.mutateAsync()}
              disabled={incrementMutation.isPending}
            >
              Increment
            </button> */}
            {/* <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => {
                const value = window.prompt(
                  'Set value to:',
                  count.toString() ?? '0'
                );
                if (
                  !value ||
                  parseInt(value) === count ||
                  isNaN(parseInt(value))
                ) {
                  return;
                }
                return setMutation.mutateAsync(parseInt(value));
              }}
              disabled={setMutation.isPending}
            >
              Set
            </button>
            <button
              className="btn btn-xs lg:btn-md btn-outline"
              onClick={() => decrementMutation.mutateAsync()}
              disabled={decrementMutation.isPending}
            >
              Decrement
            </button> */}
            
          </div>
          <div className="text-center space-y-4">
            <p>
              <ExplorerLink
                path={`account/${account}`}
                label={ellipsify(account.toString())}
              />
            </p>
            <p>
              {}
            </p>
            {/* <button
              className="btn btn-xs btn-secondary btn-outline"
              onClick={() => {
                if (
                  !window.confirm(
                    'Are you sure you want to close this account?'
                  )
                ) {
                  return;
                }
                return closeMutation.mutateAsync();
              }}
              disabled={closeMutation.isPending}
            >
              Close
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}


export async function ObjectCard({ account, listingId }: { account: PublicKey, listingId: BN }) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { buyListing } = useArtisanProgram();
  const { watchesQuery } = useArtisanProgramAccount({account});
  console.log('watchesQuery', watchesQuery);
  const _obj = watchesQuery.data;
  // const uri = _obj?.uri;
  const _objAssetDetails = _obj?.name;
  
  // const transactionToast = useTransactionToast();
  // async function handleBuyListing() {
  //   if (!publicKey) {
  //     alert('Wallet not connected');
  //     return;
  //   }
  //   try {
  //     console.log('buying listing');
  //     const params = {
  //       id: listingId.toNumber(),
  //       reference: _objAssetDetails![2].value,
  //       key: publicKey.toString(),
  //       amount: 1,
  //       uri: uri!
  //     };
  //     const transaction = await buyListing(params);
  //     const tx = VersionedTransaction.deserialize(Buffer.from(transaction, "base64"));
  //     if (!tx) {
  //       return;
  //     }
  //     const signature = await sendTransaction(tx, connection, { skipPreflight: true });
  //     transactionToast(signature);
  //   } catch (error) {
  //     console.error('Error buying listing:', error);
  //   }
  // }

  if (!_objAssetDetails) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  // const object = {
  //   brand: _objAssetDetails[0].value ?? 'null',
  //   model: _objAssetDetails[1].value ?? 'null',
  //   reference: _objAssetDetails[2].value ?? 'null',
  //   diameter: _objAssetDetails[3].value ?? 'null',
  //   movement: _objAssetDetails[4].value ?? 'null',
  //   dial_color: _objAssetDetails[5].value ?? 'null',
  //   case_material: _objAssetDetails[6].value ?? 'null',
  //   bracelet_material: _objAssetDetails[7].value ?? 'null',
  //   year_of_production: _objAssetDetails[8].value ?? 'null'
  // }

  return (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          { _objAssetDetails}
          {/* <h2
            className="card-title justify-center text-3xl cursor-pointer"
          >
            {object?.brand}
          </h2>
          <div className="card-actions flex flex-col items-center justify-around">
            <p>Model: {object?.model}</p>
            <p>Reference: {object?.reference}</p>
            <p>Diameter: {object?.diameter}</p>
            <p>Movement: {object?.movement}</p>
            <p>Dial Color: {object?.dial_color}</p>
            <p>Case Material: {object?.case_material}</p>
            <p>Bracelet Material: {object?.bracelet_material}</p>
            <p>Year of Production: {object?.year_of_production}</p>
          </div>
          <div className="text-center space-y-4">
            <p>
              <ExplorerLink
                path={`account/${account}`}
                label={ellipsify(account.toString())}
              />
            </p>
          </div>
          <button
              className="btn btn-xs lg:btn-md btn-primary"
              onClick={()=> handleBuyListing()}
              // disabled={buyListing.isPending}
            >
              Buy
            </button> */}
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ account }: { account: PublicKey }) {
  const {
    profileQuery
  } = useArtisanProgramAccount({ account });

  const profile: { username: string, spending: BN, membership: any, isVerified: boolean, bump: number } | undefined = useMemo(() => {
    return profileQuery.data && {
      username: profileQuery.data.username ?? '',
      spending: profileQuery.data.spending ?? new BN(0),
      membership: profileQuery.data.membership ?? '',
      isVerified: profileQuery.data.isVerified ?? false,
      bump: profileQuery.data.bump ?? 0
    }
  }, [
    profileQuery.data?.username,
    profileQuery.data?.spending,
    profileQuery.data?.membership,
    profileQuery.data?.isVerified,
    profileQuery.data?.bump
  ]);

  return profileQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2
            className="card-title justify-center text-3xl cursor-pointer"
            onClick={() => profileQuery.refetch()}
          >
            {profile?.username}
          </h2>
          <div className="card-actions flex flex-col items-center justify-around">
            
          </div>
          <div className="text-center space-y-4">
            <p>
              <ExplorerLink
                path={`account/${account}`}
                label={ellipsify(account.toString())}
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CounterCard({ account }: { account: PublicKey }) {
  const {
    listingQuery,
  } = useArtisanProgramAccount({ account });

  const count = useMemo(
    () => listingQuery.data?.id ?? 0,
    [listingQuery.data?.id]
  );

  return listingQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <div className="card card-bordered border-base-300 border-4 text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="space-y-6">
          <h2
            className="card-title justify-center text-3xl cursor-pointer"
            onClick={() => listingQuery.refetch()}
          >
            {count}
          </h2>
          <div className="card-actions justify-around">
            
          </div>
        </div>
      </div>
    </div>
  );
}
