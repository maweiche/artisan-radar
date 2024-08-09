import * as anchor from "@coral-xyz/anchor"; 
import { Program, AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { ArtsnCore, getArtisanProgramId, USDC_MINT, MANAGER, mplCoreProgram, getArtisanProgram, ArtsnCoreIDL } from '@artsn-ui/anchor';
import {
    SYSVAR_INSTRUCTIONS_PUBKEY,
    PublicKey,
    SystemProgram,
    Keypair,
    Transaction,
    Connection,
    TransactionMessage,
    VersionedTransaction,
    sendAndConfirmTransaction
  } from "@solana/web3.js";
  
  import { 
    ASSOCIATED_TOKEN_PROGRAM_ID, 
    TOKEN_2022_PROGRAM_ID, 
    TOKEN_PROGRAM_ID, 
    getAssociatedTokenAddressSync, 
 } from "@solana/spl-token";
import * as b58 from "bs58";
import { useAnchorProvider } from '@/components/solana/solana-provider';
import { useConnection } from '@solana/wallet-adapter-react';

//https://spl-token-faucet.com/?token-name=USDC-Dev
const USDC_DEV = new PublicKey(USDC_MINT);

export async function POST( request: Request ) {
    

    try {
        const wallet = Keypair.generate();
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        // @ts-expect-error - wallet is dummy variable, signing is not needed
        const provider = new AnchorProvider(connection,  wallet, {commitment: "confirmed"});
        const program : Program<ArtsnCore> = new Program(ArtsnCoreIDL as ArtsnCore, provider);

        const req = await request.json();
        const buyer_publicKey = new PublicKey(req.publicKey);
        const id = req.id;
        const uri = req.uri;
        const reference = req.reference;
        const amount = req.amount;
        console.log('buyer_publicKey', buyer_publicKey.toBase58())
        console.log('id', id)
        console.log('uri', uri)
        console.log('reference', reference)
        console.log('amount', amount)
        const fraction = Keypair.generate();

        const watch = PublicKey.findProgramAddressSync([Buffer.from('watch'),  Buffer.from(reference)], program.programId)[0];
        const listing = PublicKey.findProgramAddressSync([Buffer.from('listing'), new anchor.BN(id).toBuffer("le", 8)], program.programId)[0];
        const auth = PublicKey.findProgramAddressSync([Buffer.from('auth')], program.programId)[0];
        const buyer_profile = PublicKey.findProgramAddressSync([Buffer.from('profile'), buyer_publicKey.toBuffer()], program.programId)[0];
        const listingCurrencyAta = getAssociatedTokenAddressSync(USDC_MINT, listing, true)
        const buyerCurrencyAta = getAssociatedTokenAddressSync(USDC_MINT, buyer_publicKey)

        const feeKey = process.env.PRIVATE_KEY!;
        const feePayer = Keypair.fromSecretKey(b58.decode(feeKey));

        const buyerProfileAccount = await connection.getAccountInfo(buyer_profile);
        if(buyerProfileAccount == null) {
            const profileInitIx = await await program.methods
                .initializeProfile(
                    buyer_publicKey.toBase58().slice(-4)
                )
                .accountsPartial({
                    user: buyer_publicKey,
                    payer: feePayer.publicKey,
                    profile: buyer_profile,
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

        const buyShareIx = await program.methods
            .buyFractionalizedListing(uri)
            .accountsPartial({
                buyer: buyer_publicKey,
                payer: feePayer.publicKey,
                mint: USDC_MINT,
                buyerAta: buyerCurrencyAta,
                listingAta: listingCurrencyAta,
                manager: MANAGER,
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
        
        const { blockhash } = await connection.getLatestBlockhash("finalized");
        const messageV0 = new TransactionMessage({
          payerKey: feePayer.publicKey,
          recentBlockhash: blockhash,
          instructions: [buyShareIx],
        }).compileToV0Message();
        
        const txn = new VersionedTransaction(messageV0);
        txn.sign([feePayer, fraction])

        const base64 = Buffer.from(txn.serialize()).toString('base64'); 

        // for(let i = 0; i < amount ; i++) {
        //     console.log('buying share', i);
        //     transaction.add(buyShareIx);
        // }
        // transaction.partialSign(feePayer);
        // const serializedTransaction = transaction.serialize({
        //     requireAllSignatures: false,
        //   });
        // const base64 = serializedTransaction.toString("base64");
        // console.log('base64', base64)

        
        // console.log(
        //     'simulate transaction', 
        //     await connection.simulateTransaction(
        //         txn,
        //         config
        //     ))
        return new Response(JSON.stringify({transaction: base64 }), {
            headers: {
                'content-type': 'application/json',
            },
        });

    } catch (e) {
        console.log(e);
        throw e;
    }
};
