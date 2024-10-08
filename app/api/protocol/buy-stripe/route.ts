import * as anchor from '@coral-xyz/anchor';
import {
  IDL,
  ArtsnCore,
  PROGRAM_ID,
  USDC_MINT,
} from '@/components/Protocol/idl';
import { mplCoreProgram, manager, mint } from "@/components/Protocol/constants";
import {
  SYSVAR_INSTRUCTIONS_PUBKEY,
  PublicKey,
  SystemProgram,
  Keypair,
  Transaction,
  Connection,
  Ed25519Program,
} from '@solana/web3.js';

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import * as b58 from 'bs58';

//https://spl-token-faucet.com/?token-name=USDC-Dev
const USDC_DEV = new PublicKey(USDC_MINT);

const intToBytes = (int: number): Uint8Array => {
  const buffer = new ArrayBuffer(4); // Create a buffer of 4 bytes (32 bits).
  const view = new DataView(buffer);
  view.setUint32(0, int, true); // Write the integer to the buffer. 'true' for little endian.
  return new Uint8Array(buffer);
};

const stringToBytes = (sessionId: string) => {
  return new TextEncoder().encode(sessionId);
};

const concatenateUint8Arrays = (arr1: Uint8Array, arr2: Uint8Array) => {
  const concatenatedArray = new Uint8Array(arr1.length + arr2.length);
  concatenatedArray.set(arr1, 0);
  concatenatedArray.set(arr2, arr1.length);
  return concatenatedArray;
};

export async function POST(request: Request) {

  console.log('route pinged');
  const wallet = Keypair.generate();
  const connection = new Connection(
    process.env.NEXT_PUBLIC_HELIUS_DEVNET!,
    'confirmed'
  );
  // @ts-expect-error - wallet is dummy variable, signing is not needed
  const provider = new anchor.AnchorProvider(connection, wallet, {});
  const programId = new PublicKey(PROGRAM_ID);
  const program = new anchor.Program<ArtsnCore>(IDL, provider);

  try {
    const req = await request.json();
    const buyer_publicKey = new PublicKey(req.publicKey);
    const id = req.id;

    // VARIABLES
    const reference = req.reference;
    const amount = req.amount;
    const sessionId = req.sessionId;
    const watch = PublicKey.findProgramAddressSync(
      [Buffer.from('watch'), Buffer.from(reference)],
      program.programId
    )[0];
    const listing = PublicKey.findProgramAddressSync(
      [
        Buffer.from('listing'),
        watch.toBuffer(),
        new anchor.BN(id).toBuffer('le', 8),
      ],
      program.programId
    )[0];

    const listingCurrencyAta = getAssociatedTokenAddressSync(
      USDC_DEV,
      listing,
      true
    );
    const buyerCurrencyAta = getAssociatedTokenAddressSync(
      USDC_DEV,
      buyer_publicKey
    );

    const feeKey = process.env.SIGNING_AUTHORITY!;
    const feePayer = Keypair.fromSecretKey(b58.decode(feeKey));

    const message = intToBytes(amount);
    const stringBytes = stringToBytes(sessionId); // Convert string to bytes
    const combinedBytes = concatenateUint8Arrays(message, stringBytes); // Concatenate the byte arrays
  
    const ed25519Ix = Ed25519Program.createInstructionWithPrivateKey({
      privateKey: feePayer.secretKey,
      message: combinedBytes,
    });
    const buyer_profile = PublicKey.findProgramAddressSync([Buffer.from('profile'), buyer_publicKey.toBuffer()], program.programId)[0];
    const fraction = Keypair.generate();
    const buyShareIx = await program.methods
    //@ts-expect-error - missing arguments
      .buyFractionalizedListing(uri)
      .accountsPartial({
          buyer: buyer_publicKey,
          payer: feePayer.publicKey,
          mint: mint,
          buyerAta: buyerCurrencyAta,
          listingAta: listingCurrencyAta,
          manager,
          buyerProfile: buyer_profile,
          listing,
          object: watch,
          fraction: fraction.publicKey,
          instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenProgram: TOKEN_PROGRAM_ID,
          mplCoreProgram: mplCoreProgram,
          systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([feePayer, fraction])
      .instruction();

    const { blockhash } = await connection.getLatestBlockhash('finalized');
    const transaction = new Transaction({
      recentBlockhash: blockhash,
      feePayer: feePayer.publicKey,
    });
    for (let i = 0; i < amount; i++) {
      console.log('buying share', i);
      transaction.add(ed25519Ix).add(buyShareIx);
    }
    transaction.partialSign(feePayer);
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
    });
    const base64 = serializedTransaction.toString('base64');

    return new Response(JSON.stringify({ transaction: base64 }), {
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}