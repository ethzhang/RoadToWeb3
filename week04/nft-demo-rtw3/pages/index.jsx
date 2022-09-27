import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { NFTCard } from '../components/nftCard';

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const fetchNFTs = async() => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "CmtivHWw7oTnHXe2jdj28Cc-SeX8GPw-";
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
 
    var requestOptions = {
      method: 'GET'
    };

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;
      console.log(fetchURL);
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());

    } else {
      console.log("fetching nfts for collection owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
    }

    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async() => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "CmtivHWw7oTnHXe2jdj28Cc-SeX8GPw-";
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;

      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-indigo-400">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <p className='flex justify-center text-4xl pt-10 text-white font-semibold	tracking-wide
'>NFT Gallery</p>
        <p className='flex justify-center text-l underline text-white '>Road to Web3</p>
        <div className='flex flex-wrap gap-x-3 align-middle'>
          <input className='w-80 px-2 text-xs outline-slate-300' disabled={fetchForCollection} onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet}  type={"text"} placeholder="Add your wallet address"></input>
          <input className='w-80 px-2 text-xs outline-slate-300' onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
          <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-1 py-1 w-auto  rounded-sm w-10"} onClick={
            () => {
              if (fetchForCollection) {
                fetchNFTsForCollection();
              } else {
                fetchNFTs();
              }
            }
          }>go</button>
          <label className="text-gray-600 text-white"><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2 align-middle"></input>Fetch for collection</label>

        </div>
        
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-16 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
