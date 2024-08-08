// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import ArtsnCoreIDL from '../target/idl/artisan.json';
import type { ArtsnCore } from '../target/types/artisan';

// Re-export the generated IDL and type
export { ArtsnCore, ArtsnCoreIDL };

// The programId is imported from the program IDL.
export const ARTISAN_PROGRAM_ID = new PublicKey(ArtsnCoreIDL.address);

// This is a helper function to get the Counter Anchor program.
export function getArtisanProgram(provider: AnchorProvider) {
  return new Program(ArtsnCoreIDL as ArtsnCore, provider);
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getArtisanProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Counter program on devnet and testnet.
      return new PublicKey('Hyjee2KiJXJRtabtvwQgWGt9ZozPEF18DYr5oRvYTq6K');
    case 'mainnet-beta':
    default:
      return ARTISAN_PROGRAM_ID;
  }
}
