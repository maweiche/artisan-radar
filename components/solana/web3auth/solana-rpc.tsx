import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    TransactionMessage,
    VersionedTransaction,
} from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, publicKey, signerIdentity } from "@metaplex-foundation/umi"
import { CustomChainConfig, IProvider } from "@web3auth/base";
import { SolanaWallet } from "@web3auth/solana-provider";
  
  export default class SolanaRpc {
    private provider: IProvider;
    private solanaWallet: SolanaWallet;
  
    constructor(provider: IProvider) {
      this.provider = provider;
      this.solanaWallet = new SolanaWallet(this.provider);
    }
  
    private async getConnection(): Promise<Connection> {
      // const connectionConfig = await this.solanaWallet.request<string[], CustomChainConfig>({
      //   method: "solana_provider_config",
      //   params: [],
      // });
      // return new Connection(connectionConfig.rpcTarget);
      return new Connection("https://soft-cold-energy.solana-devnet.quiknode.pro/ad0dda04b536ff45a76465f9ceee5eea6a048a8f");
    }
  
    async getAccounts(): Promise<string[]> {
      try {
        return await this.solanaWallet.requestAccounts();
      } catch (error) {
        console.error("Error getting accounts:", error);
        return [];
      }
    }
  
    async getBalance(): Promise<string> {
      try {
        const conn = await this.getConnection();
        const accounts = await this.getAccounts();
        const balance = await conn.getBalance(new PublicKey(accounts[0]));
        return balance.toString();
      } catch (error) {
        console.error("Error getting balance:", error);
        return "0";
      }
    }
  
    async signMessage(message: string = "Test Signing Message"): Promise<string> {
      try {
        const msg = Buffer.from(message, "utf8");
        const res = await this.solanaWallet.signMessage(msg);
        return res.toString();
      } catch (error) {
        console.error("Error signing message:", error);
        return "";
      }
    }
  
    async sendTransaction(amount: number = 0.01): Promise<string> {
      try {
        const accounts = await this.getAccounts();
        const connection = await this.getConnection();
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("finalized");
  
        const transaction = new Transaction({
          feePayer: new PublicKey(accounts[0]),
          blockhash,
          lastValidBlockHeight,
        }).add(
          SystemProgram.transfer({
            fromPubkey: new PublicKey(accounts[0]),
            toPubkey: new PublicKey(accounts[0]),
            lamports: amount * LAMPORTS_PER_SOL,
          })
        );
  
        const { signature } = await this.solanaWallet.signAndSendTransaction(transaction);
        return signature;
      } catch (error) {
        console.error("Error sending transaction:", error);
        return "";
      }
    }
  
    async signTransaction(tx: any): Promise<string> {
      try {
        console.log('signing and sending transaction w/ web3auth');
        const accounts = await this.getAccounts();
        // const connection = await this.getConnection();
        const connection = new Connection("https://soft-cold-energy.solana-devnet.quiknode.pro/ad0dda04b536ff45a76465f9ceee5eea6a048a8f");
        const { blockhash } = await connection.getLatestBlockhash("finalized");
  
        const umi = createUmi('https://api.devnet.solana.com');
        const UMI_KEY: string = process.env.NEXT_PUBLIC_UMI_KEY!;
        const UMI_KEY_JSON = JSON.parse(UMI_KEY);
        let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(UMI_KEY_JSON));
        const _signer = createSignerFromKeypair(umi, keypair);
        umi.use(signerIdentity(_signer));
  
        const signedTx = await this.solanaWallet.signTransaction(tx);
        console.log('signedTx:', signedTx);
        // Convert the signed transaction to a format compatible with Umi
        const umiTx = umi.transactions.deserialize(signedTx.serialize());
        
        const signature = await umi.rpc.sendTransaction(umiTx, {
        skipPreflight: true,
        });
        const confirmResult = await umi.rpc.confirmTransaction(signature, {
        strategy: { type: 'blockhash', ...(await umi.rpc.getLatestBlockhash()) },
        })

        console.log('Transaction confirmed:', confirmResult);
        
        return signature.toString() || "";
      } catch (error) {
        console.error("Error signing transaction:", error);
        return "";
      }
    }
  
    async sendVersionedTransaction(): Promise<string> {
      try {
        const accounts = await this.getAccounts();
        const connection = await this.getConnection();
        const { blockhash } = await connection.getLatestBlockhash("finalized");
  
        const instruction = SystemProgram.transfer({
          fromPubkey: new PublicKey(accounts[0]),
          toPubkey: new PublicKey(accounts[0]),
          lamports: 0.01 * LAMPORTS_PER_SOL,
        });
  
        const messageV0 = new TransactionMessage({
          payerKey: new PublicKey(accounts[0]),
          recentBlockhash: blockhash,
          instructions: [instruction],
        }).compileToV0Message();
  
        const transaction = new VersionedTransaction(messageV0);
        const { signature } = await this.solanaWallet.signAndSendTransaction(transaction);
        return signature;
      } catch (error) {
        console.error("Error sending versioned transaction:", error);
        return "";
      }
    }
  
    async signVersionedTransaction(): Promise<VersionedTransaction> {
      try {
        const accounts = await this.getAccounts();
        const connection = await this.getConnection();
        const { blockhash } = await connection.getLatestBlockhash("finalized");
  
        const instruction = SystemProgram.transfer({
          fromPubkey: new PublicKey(accounts[0]),
          toPubkey: new PublicKey(accounts[0]),
          lamports: 0.01 * LAMPORTS_PER_SOL,
        });
  
        const messageV0 = new TransactionMessage({
          payerKey: new PublicKey(accounts[0]),
          recentBlockhash: blockhash,
          instructions: [instruction],
        }).compileToV0Message();
  
        const transaction = new VersionedTransaction(messageV0);
        return await this.solanaWallet.signTransaction<VersionedTransaction>(transaction);
      } catch (error) {
        console.error("Error signing versioned transaction:", error);
        throw error;
      }
    }
  
    async signAllTransactions(count: number = 3): Promise<Transaction[]> {
      try {
        const accounts = await this.getAccounts();
        const connection = await this.getConnection();
        const { blockhash } = await connection.getLatestBlockhash("finalized");
  
        const transactions = Array(count).fill(null).map((_, i) => 
          new Transaction({
            feePayer: new PublicKey(accounts[0]),
            recentBlockhash: blockhash,
          }).add(
            SystemProgram.transfer({
              fromPubkey: new PublicKey(accounts[0]),
              toPubkey: new PublicKey(accounts[0]),
              lamports: (0.01 * (i + 1)) * LAMPORTS_PER_SOL,
            })
          )
        );
  
        return await this.solanaWallet.signAllTransactions(transactions);
      } catch (error) {
        console.error("Error signing all transactions:", error);
        throw error;
      }
    }
  
    async signAllVersionedTransactions(count: number = 3): Promise<VersionedTransaction[]> {
      try {
        const accounts = await this.getAccounts();
        const connection = await this.getConnection();
        const { blockhash } = await connection.getLatestBlockhash("finalized");
  
        const transactions = Array(count).fill(null).map((_, i) => {
          const instruction = SystemProgram.transfer({
            fromPubkey: new PublicKey(accounts[0]),
            toPubkey: new PublicKey(accounts[0]),
            lamports: (0.01 * (i + 1)) * LAMPORTS_PER_SOL,
          });
  
          const messageV0 = new TransactionMessage({
            payerKey: new PublicKey(accounts[0]),
            recentBlockhash: blockhash,
            instructions: [instruction],
          }).compileToV0Message();
  
          return new VersionedTransaction(messageV0);
        });
  
        return await this.solanaWallet.signAllTransactions(transactions);
      } catch (error) {
        console.error("Error signing all versioned transactions:", error);
        throw error;
      }
    }
  
    async getPrivateKey(): Promise<string> {
      try {
        return await this.provider.request({
          method: "solanaPrivateKey",
        }) as string;
      } catch (error) {
        console.error("Error getting private key:", error);
        return "";
      }
    }
  }