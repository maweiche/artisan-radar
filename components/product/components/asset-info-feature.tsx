"use client"

import { useState } from "react";
import { VersionedTransaction } from "@solana/web3.js";
import { useSolanaRPC } from "@/hooks/use-web3-rpc";
import { useWeb3Auth } from "@/hooks/use-web3-auth";
import RPC from "@/components/solana/web3auth/solana-rpc";
import toast from "react-hot-toast";
export default function AssetInfo({ asset }: { asset: any }) {
  const { provider, login: web3Login, logout: web3Logout, getUserInfo, web3auth, userAccounts } = useWeb3Auth();
  const { signVersionedTransaction, getAccounts } = useSolanaRPC(provider);
  console.log('asset for render ->', asset);
  const [amount, setAmount] = useState(5); // Initial amount set to 5

  const increment = () => setAmount(amount + 1);
  const decrement = () => setAmount(amount - 1);

  const buyTx = async(id: number, reference: string, key: string, amount: number, uri: string) => {
    try{
      const response = await fetch('/api/protocol/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            reference: reference,
            publicKey: key,
            amount: amount,
            uri: uri,
        })
      })
      const { transaction } = await response.json(); //VersionedTransaction
      const tx = VersionedTransaction.deserialize(Buffer.from(transaction, "base64"));
      if(!tx){
        console.log('no transaction');
        return;
      }
      return tx;
    } catch (error) {
      console.error('Error sending transaction', error);
    }
  }

  const handleBuy = async() => {
    if (web3auth && web3auth.connected && web3auth.provider) {
      const rpc = new RPC(web3auth.provider);
      const accounts =  await getAccounts();
      console.log('userAccounts ->',accounts);
      if (!accounts) {
        console.error('No accounts found');
        return;
      }
      const tx = await buyTx(Number(asset.onChainData.id), asset.attributes[2].value, accounts![0], amount, asset.onChainData.watchUri);
      console.log('tx ->', tx); // VersionedTransaction
      if (tx) {
        const signature = await rpc!.signVersionedTransaction({ tx });
        console.log('signature ->', signature);
        toast.success(`Transaction sent!`);
      } else {
        console.error('Transaction is undefined');
      }
    }
  }

  return (
    <section className="bg-white rounded-3xl border-gray p-5 mb-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-3">
          <button className="text-xs md:text-base border-gray text-black p-2.5 rounded-2xl shadow-sm">
            <span>{asset.onChainData.objectType.watch ? 'Watch' : 'Diamonds'}</span>
          </button>
          {asset.onChainData.objectType.watch && (
            <button className="text-xs md:text-base border-gray text-black p-2.5 rounded-2xl shadow-sm">
              <span>{asset.attributes[4].value.toString()}</span>
            </button>
          )}
        </div>
        <button className="text-xs md:text-base bg-black text-white px-4 py-2.5 rounded-2xl shadow-sm">
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            Share
          </span>
        </button>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">{asset.attributes[0].value.toString()}</h1>
      </div>
      <p className="text-gray-600 mb-5">{asset.attributes[1].value.toString()}</p>
      <p className="text-lg mb-3">Remaining fractions</p>
      <p className="text-3xl font-bold mb-2">
        {/* {asset.share - asset.shareSold} / {asset.share} */}
        {Number(asset.onChainData.share) - Number(asset.onChainData.shareSold)} / {asset.onChainData.share}
      </p>
      <p className="text-sm mb-2">{Number(asset.onChainData.price)}$ / fractions</p>
      <div className="w-full bg-gray-200 h-2 rounded mb-5">
        <div className="bg-black h-2 w-3/5 rounded"></div>
      </div>
      <div className="flex md:flex-row flex-col justify-between items-start md:items-center mb-5 gap-4">
      <div className="w-full max-w-48 flex justify-between items-center gap-4">
      <button
        style={{ height: "50px", width: "78px" }}
        className="bg-gray-300 flex justify-center items-center rounded-2xl"
        onClick={decrement} // Decrement the amount
      >
        -
      </button>
      <button
        style={{ height: "50px", width: "78px" }}
        className="bg-white flex justify-center items-center rounded-2xl font-bold border-gray box-border"
      >
        {amount} {/* Display the current amount */}
      </button>
      <button
        style={{ height: "50px", width: "78px" }}
        className="bg-gray-700 flex justify-center items-center rounded-2xl text-white"
        onClick={increment} // Increment the amount
      >
        +
      </button>
    </div>
        <button className="w-full md:w-2/3 bg-black text-white py-3 rounded-2xl" onClick={()=> handleBuy()}>
          {`Buy $${amount * Number(asset.onChainData.price)} of this Fraction`}
        </button>
      </div>
      <p className="text-sm text-gray-500 p-7 border-gray rounded-3xl">
        {asset.offChainData.about}{" "}
        <a href="#" className="text-blue-600">
          See more
        </a>
      </p>
    </section>
  );
}
