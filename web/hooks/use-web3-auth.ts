import { useState, useEffect, useCallback } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { getDefaultExternalAdapters } from "@web3auth/default-solana-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";
import RPC from "@/components/solana/web3auth/auth-data-access";

export const clientId = "BKkPEGMI4EaJgVrH5AwG0coQvAb8xq5XDXPsPOcmP4pLKUL-WRVkYd3WhXINXrYYULUSmsZBBE8XTyYuHCVvYAk";

export const chainConfig = {
  chainId: "0x3",
  chainNamespace: CHAIN_NAMESPACES.SOLANA,
  rpcTarget: "https://api.testnet.solana.com",
  tickerName: "SOLANA",
  ticker: "SOL",
  decimals: 18,
  blockExplorerUrl: "https://explorer.solana.com/?cluster=testnet",
  logo: "https://images.toruswallet.io/sol.svg",
};

export const useWeb3Auth = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const solanaPrivateKeyProvider = new SolanaPrivateKeyProvider({
          config: { chainConfig: chainConfig },
        });

        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider: solanaPrivateKeyProvider,
          // Add other configurations as needed
        });

        const adapters = await getDefaultExternalAdapters({
          options: {
            clientId,
            chainConfig,
          },
        });
        adapters.forEach((adapter) => {
          web3auth.configureAdapter(adapter);
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const checkIfLoggedIn = useCallback(async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    if (!web3auth.connected) {
        console.log("User not logged in");
        return;
    }
    if (!provider) {
        console.log("provider not initialized yet");
        return;
    }

    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    const user = await web3auth.getUserInfo();
    console.log('user:', user)

    const user_details = {
        publicKey: address[0],
        email: user.email,
    }
    return user_details;
  }, [web3auth, provider]);

  const login = useCallback(async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    setLoggedIn(true);
  }, [web3auth]);

  const logout = useCallback(async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  }, [web3auth]);

  const getUserInfo = useCallback(async () => {
    console.log('checking user info')
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log('user:', user)
    return user;
  }, [web3auth]);

  const getAccounts = useCallback(async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    return address;
  }, [provider]);

  const getBalance = useCallback(async () => {
    if (!provider) {
        console.log("provider not initialized yet");
        return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    return balance;
  }, [provider]);

  const sendTransaction = useCallback(async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    return receipt;
  }, [provider]);

  const sendVersionTransaction = useCallback(async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendVersionTransaction();
    return receipt;
  }, [provider]);

  const signVersionedTransaction = useCallback(async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.signVersionedTransaction();
    return receipt;
  }, [provider]);

  const signAllVersionedTransaction = useCallback(async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.signAllVersionedTransaction();
    return receipt;
  }, [provider]);

  const signAllTransaction = useCallback(async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.signAllTransaction();
    return receipt;
  }, [provider]);

  const signMessage = useCallback(async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    return signedMessage;
  }, [provider]);

  const getPrivateKey = useCallback(async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    return privateKey;
  }, [provider]);

  // Add other methods (getBalance, sendTransaction, etc.) here...

  return {
    web3auth,
    provider,
    loggedIn,
    checkIfLoggedIn,
    login,
    logout,
    getUserInfo,
    getAccounts,
    getBalance,
    sendTransaction,
    sendVersionTransaction,
    signVersionedTransaction,
    signAllVersionedTransaction,
    signAllTransaction,
    signMessage,
    getPrivateKey,
  };
};
