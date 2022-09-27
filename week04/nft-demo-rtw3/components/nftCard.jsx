export const NFTCard = ({ nft }) => {
    return (
        <div className="w-1/5 flex flex-col ">
            <div className="rounded-md">
                <img className="object-cover h-128 w-auto rounded-t-md" src={nft.media[0].gateway} ></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-indigo-100 rounded-b-md h-110 w-auto">
                <div className="">
                    <h2 className="text-xl text-gray-800">{nft.title}</h2>
                    {/* <p className="text-gray-600">Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p> */}
                    <p className="text-gray-600" >Contract: {nft.contract.address.substr(0, 6)}...{nft.contract.address.substr(nft.contract.address.length - 4)}
                        {/* <img className="" src="../assets/copy.png"></img> */}
                    </p>
                </div>

                <p className="text-white bg-blue-500 px-4 py-1 w-fit rounded-sm "><a href='https://opensea.io/assets/ethereum/{nft.contract.address}/{nft.id}'>OpenSea</a></p>
            </div>

        </div>
    )
}