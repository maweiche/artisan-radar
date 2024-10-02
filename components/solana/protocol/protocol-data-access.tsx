'use client';

import { getArtisanProgram, getArtisanProgramId } from './artisan-exports';
import { PublicKey, Connection, Keypair } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useCluster } from '@/components/cluster/cluster-data-access';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { fetchCollectionV1, } from '@metaplex-foundation/mpl-core'
import { publicKey as UMIPublicKey } from "@metaplex-foundation/umi";
import * as anchor from "@coral-xyz/anchor";
export function useArtisanProgram() {
  const wallet = Keypair.generate();
  const connection = new Connection(
      'https://api.devnet.solana.com',
      "confirmed"
  );
  // @ts-expect-error - wallet is dummy variable, signing is not needed
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const program = getArtisanProgram(provider);
  const programId = getArtisanProgramId('devnet');
  const cluster = 'devnet';
  const profiles = useQuery({
    queryKey: ['profiles', 'all', { cluster }],
    //@ts-expect-error - beleives it should be capitalized, but that creates error
    queryFn: () => program.account.profile.all(),
  });

  const certificates = useQuery({
    queryKey: ['certificates', 'all', { cluster }],
    //@ts-expect-error - beleives it should be capitalized, but that creates error
    queryFn: () => program.account.ipCertificate.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  return useMemo(() => ({
    program,
    programId,
    profiles,
    certificates,
    getProgramAccount,
  }), [program, programId, certificates, profiles, getProgramAccount]);
}

export function useArtisanProgramAccount({ account, username }: { account: PublicKey , username?: string}) { 
  const { cluster } = useCluster();
  const { program } = useArtisanProgram();

  const profileQuery = useQuery({
    queryKey: ['profile', 'fetch', { cluster, account }],
    //@ts-expect-error - beleives it should be capitalized, but that creates error
    queryFn: () => program.account.profile.fetch(account),
  });

  const certificates = useQuery({
    queryKey: ['certificates', 'all', { cluster }],
    //@ts-expect-error - beleives it should be capitalized, but that creates error
    queryFn: () => program.account.ipCertificate.all(),
  });

  const certificatesFilteredByOwner = useQuery({
    queryKey: ['certificatesFilteredByOwner', 'all', { cluster, account }],
    queryFn: async () => {
      //@ts-expect-error - beleives it should be capitalized, but that creates error
      const allCertificates = await program.account.ipCertificate.all();
      const filteredAccounts = allCertificates.filter((certificate: any) => certificate.account.creator.toBase58() == account);
      let detailedCertificates = [];
      for (let i = 0; i < filteredAccounts.length; i++) {
        const certificate = filteredAccounts[i];
        const umi = createUmi('https://api.devnet.solana.com')
        let umi_key = UMIPublicKey(certificate.account.ip)
        const collection = await fetchCollectionV1(umi, umi_key);
        const attributes = collection.attributes!.attributeList || [];
        detailedCertificates.push({
          ...certificate,
          collection,
          attributes,
        });
      }
      return detailedCertificates;
    },
    enabled: !!account, // Only run this query if account is provided
  });

  return useMemo(() => ({
    program,
    account,
    // userProfile,
    certificates,
    profileQuery,
    certificatesFilteredByOwner,
  }), [program, account, profileQuery]);
}
