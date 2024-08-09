import * as anchor from "@coral-xyz/anchor";
import { USDC_MINT, MANAGER, mplCoreProgram, getArtisanProgram } from '@artsn-ui/anchor';
import { useAnchorProvider } from '@/components/solana/solana-provider';
import { useConnection } from '@solana/wallet-adapter-react';
import {
    PublicKey,
    SystemProgram,
    Keypair,
    Transaction,
    SYSVAR_INSTRUCTIONS_PUBKEY,
    VersionedTransaction,
    sendAndConfirmTransaction,
    TransactionMessage
  } from "@solana/web3.js";
  
  import { 
    ASSOCIATED_TOKEN_PROGRAM_ID, 
    TOKEN_2022_PROGRAM_ID, 
    TOKEN_PROGRAM_ID, 
    getAssociatedTokenAddressSync, 
 } from "@solana/spl-token";
import * as b58 from "bs58";

const USDC_DEV = new PublicKey(USDC_MINT);

export type MakeTransactionInputData = {
    account: string,
}
  
export type MakeTransactionOutputData = {
    transaction: string,
    message: string,
}

export async function GET( request: Request, res: Response ){
    return new Response(JSON.stringify({
      label: "The Artisan",
      icon: "https://artisan-one.vercel.app/assets/footer-logo1.png",
    }))
}

export async function POST( request: Request) {
    const { connection } = useConnection();
    const provider = useAnchorProvider();
    const program = getArtisanProgram(provider);

    try {
        const req = await request.json();
        const { account } = req as MakeTransactionInputData
        
        const searchParams = new URLSearchParams(request.url);
        const id_string = searchParams.get('id');
        const reference = searchParams.get('reference');
        const refKey = searchParams.get('refKey');
        const id = Number(id_string!);
        const buyer_publicKey = new PublicKey(account);
        const _uri = searchParams.get('uri');
        const uri = `https://arweave.net/${_uri}`
        const watch = PublicKey.findProgramAddressSync([Buffer.from('watch'),  Buffer.from(reference!)], program.programId)[0];
        const listing = PublicKey.findProgramAddressSync([Buffer.from('listing'), new anchor.BN(id).toBuffer("le", 8)], program.programId)[0];
        const fraction = Keypair.generate();
        const buyerProfile = PublicKey.findProgramAddressSync([Buffer.from('profile'), buyer_publicKey.toBuffer()], program.programId)[0];
      
        const listingCurrencyAta = getAssociatedTokenAddressSync(USDC_DEV, listing, true)
        const buyerCurrencyAta = getAssociatedTokenAddressSync(USDC_DEV, buyer_publicKey)
        const buyerProfileAccount = await connection.getAccountInfo(
            buyerProfile
        );
        
        const feeKey = process.env.PRIVATE_KEY!;
        const feePayer = Keypair.fromSecretKey(b58.decode(feeKey));

        const profileInitIx = await program.methods
            .initializeProfile(
                buyer_publicKey.toBase58().slice(-4),
            )
            .accountsPartial({
                payer: feePayer.publicKey,
                user: buyer_publicKey,
                profile: buyerProfile,
                systemProgram: SystemProgram.programId,
            })
            .signers([feePayer])
            .instruction();
    
        const buyShareIx = await program.methods
            .buyFractionalizedListing(uri)
            .accountsPartial({
                buyer: buyer_publicKey,
                payer: feePayer.publicKey,
                mint: USDC_MINT,
                buyerAta: buyerCurrencyAta,
                listingAta: listingCurrencyAta,
                manager: MANAGER,
                buyerProfile: buyerProfile,
                listing: listing,
                object: watch,
                fraction: fraction.publicKey,
                instructions: SYSVAR_INSTRUCTIONS_PUBKEY,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                tokenProgram: TOKEN_PROGRAM_ID,
                mplCoreProgram: mplCoreProgram,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .instruction();

        const { blockhash } = await connection.getLatestBlockhash("confirmed");

        const total_instructions = [];

        if(buyerProfileAccount == null) {
            const profileInitIx = await await program.methods
                .initializeProfile(
                    buyer_publicKey.toBase58().slice(-4)
                )
                .accountsPartial({
                    user: buyer_publicKey,
                    payer: feePayer.publicKey,
                    profile: buyerProfile,
                    systemProgram: SystemProgram.programId,
                })
                .signers([feePayer])
                .instruction()
            const { blockhash } = await connection.getLatestBlockhash("confirmed");

            const transaction = new Transaction({
                recentBlockhash: blockhash,
                feePayer: feePayer.publicKey,
            });
            
            transaction.add(profileInitIx);

            await sendAndConfirmTransaction(connection, transaction, [feePayer], {
                commitment: "confirmed",
                skipPreflight: true,
                maxRetries: 3,
            });
        }
        // run a for loop to add a set of instructions to the total_instructions array for the amount of shares to buy

        total_instructions.push(buyShareIx);
        const messageV0 = new TransactionMessage({
            payerKey: feePayer.publicKey,
            recentBlockhash: blockhash,
            instructions: total_instructions
        }).compileToV0Message();
        const transaction = new VersionedTransaction(messageV0);

        transaction.sign([feePayer, fraction]);
        const base64 = Buffer.from(transaction.serialize()).toString('base64');
        const message = "Enjoy your Fraction from The Artisan!"
        
        return new Response(JSON.stringify({transaction: base64, message: message }), {
            headers: {
                'content-type': 'application/json',
            },
        });
    } catch (e) {
        console.log(e);
        throw e;
    }
};

