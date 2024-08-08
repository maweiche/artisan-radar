'use client';

import { getArtisanProgram, getArtisanProgramId } from '@artsn-ui/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

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

  const listings = useQuery({
    queryKey: ['listings', 'all', { cluster }],
    queryFn: () => program.account.fractionalizedListing.all(),
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

  return {
    program,
    programId,
    listings,
    getProgramAccount,
    // initializeProfilee,
  };
}

export function useArtisanProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, listings } = useArtisanProgram();

  const accountQuery = useQuery({
    queryKey: ['listing', 'fetch', { cluster, account }],
    queryFn: () => program.account.fractionalizedListing.fetch(account),
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
    accountQuery,
    // closeMutation,
    // decrementMutation,
    // incrementMutation,
    // setMutation,
  };
}
