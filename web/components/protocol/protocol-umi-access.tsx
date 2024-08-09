import { publicKey } from '@metaplex-foundation/umi'
import { PublicKey } from '@solana/web3.js'
import { fetchAssetsByOwner, AssetV1, fetchCollectionV1, CollectionV1 } from '@metaplex-foundation/mpl-core'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { PROTOCOL } from '@artsn-ui/anchor';
const RPC = 'https://api.devnet.solana.com';
// Create Umi Instance
const umi = createUmi(RPC);


export const fetchAssets = async (owner: string): Promise<AssetV1[]> => {
  try {
    const assetsByOwner = await fetchAssetsByOwner(umi, owner, {
      skipDerivePlugins: false,
    })
    const filteredAccounts = assetsByOwner.filter((asset) => {
      return asset.oracles![0].baseAddress === PROTOCOL.toBase58()
    });
    return filteredAccounts
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchProducts = async (productList: any[]): Promise<{ 
    availableWatches: CollectionV1[], 
    availableDiamonds: CollectionV1[], 
    comingSoonWatches: CollectionV1[], 
    comingSoonDiamonds: CollectionV1[] } | 
    undefined
> => {
    const formatDateToDddMmm = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const day = date.getDate();
        const minute = date.getMinutes();
    
        const paddedDay = day.toString().padStart(2, '0');
        const paddedMinute = minute.toString().padStart(2, '0');
        
        return `${paddedDay}::${paddedMinute}`;
    };

    try {
        const currentTime = Math.floor(Date.now() / 1000);
        const availableProducts = productList.filter(product => product.startingTime < currentTime);
        const comingSoonProducts = productList.filter(product => product.startingTime >= currentTime);
        const detailedAvailableProducts = [];

        for( let i = 0; i < availableProducts.length; i++){
            const nft = availableProducts[i];
            const watch = await fetchCollectionV1(umi, availableProducts[i].object);

            detailedAvailableProducts.push({
                ...nft,
                watch: watch.attributes!.attributeList
            })
        };

        const detailedComingSoonProducts = [];

        for( let i = 0; i < comingSoonProducts.length; i++){
            const nft = comingSoonProducts[i];
            const watch = await fetchCollectionV1(umi, comingSoonProducts[i].object);

            detailedComingSoonProducts.push({
                ...nft,
                watch: watch.attributes!.attributeList
            })
        };

        console.log('detailedAvailableProducts', detailedAvailableProducts[0].objectType)

        // filter the products by type
        const availableWatches = detailedAvailableProducts.filter(product => product.objectType.watch);
        const availableDiamonds = detailedAvailableProducts.filter(product => product.objectType.diamonds);
        const comingSoonWatches = detailedComingSoonProducts.filter(product => product.objectType.watch);
        const comingSoonDiamonds = detailedComingSoonProducts.filter(product => product.objectType.diamond);

        const products = {
            availableWatches: availableWatches as CollectionV1[],
            availableDiamonds: availableDiamonds as CollectionV1[],
            comingSoonWatches: comingSoonWatches as CollectionV1[],
            comingSoonDiamonds: comingSoonDiamonds as CollectionV1[], 
        };
        console.log('products', products)
        return products 
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return undefined;
    }
};

export const fetchObjectDetails = async (object: PublicKey): Promise<CollectionV1 | undefined> => {
    try {
        const objectKey = publicKey(object);
        const _obj = await fetchCollectionV1(umi, objectKey);
        
        return _obj as CollectionV1;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return undefined;
    }
};
