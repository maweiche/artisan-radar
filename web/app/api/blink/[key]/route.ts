import * as anchor from "@coral-xyz/anchor";
import {ActionGetResponse, ActionPostResponse, ActionPostRequest, ACTIONS_CORS_HEADERS, } from "@solana/actions"
import { getArtisanProgramId, USDC_MINT, MANAGER, mplCoreProgram, getArtisanProgram } from '@artsn-ui/anchor';
import {
    SYSVAR_INSTRUCTIONS_PUBKEY,
    PublicKey,
    SystemProgram,
    Keypair,
    Transaction,
    VersionedTransaction,
    sendAndConfirmTransaction,
    TransactionMessage,
} from "@solana/web3.js";
  import { 
    ASSOCIATED_TOKEN_PROGRAM_ID, 
    TOKEN_PROGRAM_ID, 
    getAssociatedTokenAddressSync, 
 } from "@solana/spl-token";
import * as b58 from "bs58";
import { useAnchorProvider } from '@/components/solana/solana-provider';
import { useConnection } from '@solana/wallet-adapter-react';

const ITEM_NAMES = [
    "Diamonds",
    "Nardin - Freak",
    "Richard Mille",
    "Patek - Nautilus"
    ];

const ITEM_URIS = [
    "https://arweave.net/G7r27Nw0A3jH0fdFkuh1xqqSaJvtU4HQoN_R-X6Y-is",
    "https://arweave.net/ErEQ1RmoPwDXZd40wmiw37IWrbHBGu3bL0VODueW6gc",
    "https://arweave.net/39goFY1vD4npxsN8RU4P6YWyVsDU85jYzfdUqYczbgM",
    "https://arweave.net/MNsnBsKulwBQ_zYyX-vJEuajj_KqUY6mXfMOb6naLP0"
];

export async function POST(_: Request, { params }: { params: { key : number } }) {
    const { connection } = useConnection();
    const provider = useAnchorProvider();
    const PROGRAM_ID = getArtisanProgramId("devnet").toBase58();
    const programId = new PublicKey(PROGRAM_ID);
    const program = getArtisanProgram(provider);

    try {
        // const req = await request.json();
        const req: ActionPostRequest = await _.json();
        const url = new URL(_.url);
        let account: PublicKey;
        const buyer_publicKey = new PublicKey(req.account);

        // VARIABLES
        const object = params.key;
        const ITEMS = [
            {
                listing: "kVZLPJm8dnHwKwEJDFCgxEWb7m9X5vCc21Sm2EKFUS5",
                watch: "EWgALVZo3mchbRqaGRwLhnAXoDjENbU5FSmjNcUwTvLm"
            },
            {
                listing: "ESwKLkpsaWLZRrPYpXxgYfb9Th7dnAkX5U6Aa9aJ9VEX",
                watch: "HUdy8UgjPjHAYVsdPJF9Jjwn7rwSDSBPFEpEYHAoaa7A"
            },
            {
                listing: "GTncZ7iJqH11jNmZAhjQSVxr9zHT2wv6mgbSvDrE9WVk",
                watch: "9GoP7Ys5fQ92jxAqy5XRdpBaipVmcicYrHN21p6CD9yH"
            },
            {
                listing: "9xD7zxAtecNVitnbBPo3wtMwKjg6is1CZ8M43mKuGWnw",
                watch: "QGnW3BPJLtu7ZEh61Mypxpnz64ygkVRRWwK8zKkpppv"
            }
        ];
        const watch = new PublicKey(ITEMS[object - 1].watch);
        // const listing = PublicKey.findProgramAddressSync([Buffer.from('listing'), watch.toBuffer(), new anchor.BN(id).toBuffer("le", 8)], program.programId)[0];
        const listing = new PublicKey(ITEMS[object - 1].listing);
        const buyerProfile = PublicKey.findProgramAddressSync([Buffer.from('profile'), buyer_publicKey.toBuffer()], programId)[0];      
        const buyer_profile = PublicKey.findProgramAddressSync([Buffer.from('profile'), buyer_publicKey.toBuffer()], programId)[0];
        const listingCurrencyAta = getAssociatedTokenAddressSync(USDC_MINT, listing, true)
        const buyerCurrencyAta = getAssociatedTokenAddressSync(USDC_MINT, buyer_publicKey)

        const feeKey = process.env.PRIVATE_KEY!;
        const feePayer = Keypair.fromSecretKey(b58.decode(feeKey));
        console.log('feePayer', feePayer.publicKey.toBase58());
        
            const fraction = Keypair.generate();
            console.log('uri', ITEM_URIS[object - 1])
            const buyShareIx = await program.methods
                .buyFractionalizedListing(ITEM_URIS[object - 1])
                .accountsPartial({
                    buyer: buyer_publicKey,
                    payer: feePayer.publicKey,
                    mint: USDC_MINT,
                    buyerAta: buyerCurrencyAta,
                    listingAta: listingCurrencyAta,
                    manager: MANAGER,
                    buyerProfile: buyer_profile,
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

        const buyerProfileAccount = await connection.getAccountInfo(buyer_profile);
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

        const response : ActionPostResponse = {
            transaction: base64,
            message: `Success! You bought 1 share of the ${ITEM_NAMES[object - 1]}!`
        };
        
        return Response.json(response, {headers: ACTIONS_CORS_HEADERS})

    } catch (e) {
        console.log(e);
        throw e;
    }
};

export async function OPTIONS(_: Request) {
    return Response.json(null, {
        headers: ACTIONS_CORS_HEADERS,
    });
};