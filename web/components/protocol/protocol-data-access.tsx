'use client';

import { getArtisanProgram, getArtisanProgramId } from '@artsn-ui/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey, SYSVAR_INSTRUCTIONS_PUBKEY, TransactionMessage, VersionedTransaction, } from '@solana/web3.js';
import { useMutation, useQuery,  } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';
import { TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID  } from '@solana/spl-token';
import * as b58 from 'bs58';
import * as anchor from '@coral-xyz/anchor';

export function useArtisanProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getArtisanProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getArtisanProgram(provider);
  const fraction = Keypair.generate();
  const listings = useQuery({
    queryKey: ['listings', 'all', { cluster }],
    queryFn: () => program.account.fractionalizedListing.all(),
  });

  const listingDetails = useQuery({
    queryKey: ['listing-details', 'all', { cluster }],
    queryFn: () => {},
  });

  const watches = useQuery({
    queryKey: ['watches', 'all', { cluster }],
    queryFn: () => program.account.baseCollectionV1.all(),
  });

  const profiles = useQuery({
    queryKey: ['profiles', 'all', { cluster }],
    queryFn: () => program.account.profile.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  // const profileInitialize = useMutation({
  //   mutationKey: ['profile', 'initialize', { cluster }],
  //   mutationFn: (username: string, ) =>
  //     program.methods
  //       .initializeProfile(username)
  //       .accounts({ 

  //        })
  //       .signers([

  //       ])
  //       .rpc(),
  //   onSuccess: (signature) => {
  //     transactionToast(signature);
  //     return accounts.refetch();
  //   },
  //   onError: () => toast.error('Failed to initialize account'),
  // });

  // TODO: RELOCATE TO API
  async function buyListing(params:{id: number, reference: string, key: string, amount: number, uri: string}) {
    try{
      const response = await fetch('/api/protocol/buy/sol', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: params.id,
            reference: params.reference,
            publicKey: params.key,
            amount: params.amount,
            uri: params.uri,
        })
      })
      const { transaction } = await response.json(); //VersionedTransaction
      if(!transaction){
        console.log('no transaction');
        return toast.error('Failed to buy listing');
      }
      return transaction
    } catch (error) {
      console.error('Error sending transaction', error);
      toast.error('Failed to buy listing');
    }
  }

  return {
    program,
    programId,
    listings,
    watches,
    profiles,
    buyListing,
    getProgramAccount,
    // initializeProfilee,
  };
}

export function useArtisanProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, listings } = useArtisanProgram();

  const listingQuery = useQuery({
    queryKey: ['listing', 'fetch', { cluster, account }],
    queryFn: () => program.account.fractionalizedListing.fetch(account),
  });


  // TODO: fix to umi to read the core nft attributes
  const watchesQuery = useQuery({
    queryKey: ['watches', 'fetch', { cluster, account }],
    queryFn: () => program.account.baseCollectionV1.fetch(account),
  });

  const profileQuery = useQuery({
    queryKey: ['profile', 'fetch', { cluster, account }],
    queryFn: () => program.account.profile.fetch(account),
  });

  // const closeMutation = useMutation({
  //   mutationKey: ['counter', 'close', { cluster, account }],
  //   mutationFn: () =>
  //     program.methods.close().accounts({ counter: account }).rpc(),
  //   onSuccess: (tx) => {
  //     transactionToast(tx);
  //     return accounts.refetch();
  //   },
  // });

  // const decrementMutation = useMutation({
  //   mutationKey: ['counter', 'decrement', { cluster, account }],
  //   mutationFn: () =>
  //     program.methods.decrement().accounts({ counter: account }).rpc(),
  //   onSuccess: (tx) => {
  //     transactionToast(tx);
  //     return accountQuery.refetch();
  //   },
  // });

  // const incrementMutation = useMutation({
  //   mutationKey: ['counter', 'increment', { cluster, account }],
  //   mutationFn: () =>
  //     program.methods.increment().accounts({ counter: account }).rpc(),
  //   onSuccess: (tx) => {
  //     transactionToast(tx);
  //     return accountQuery.refetch();
  //   },
  // });

  // const setMutation = useMutation({
  //   mutationKey: ['counter', 'set', { cluster, account }],
  //   mutationFn: (value: number) =>
  //     program.methods.set(value).accounts({ counter: account }).rpc(),
  //   onSuccess: (tx) => {
  //     transactionToast(tx);
  //     return accountQuery.refetch();
  //   },
  // });

  return {
    listingQuery,
    watchesQuery,
    profileQuery,
    // closeMutation,
    // decrementMutation,
    // incrementMutation,
    // setMutation,
  };
}
