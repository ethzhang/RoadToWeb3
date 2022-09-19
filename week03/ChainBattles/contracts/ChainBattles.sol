// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// deploy to mumbai testnet, contract address is :0x8b3d36Fb0CdBbcAc1215f6Cf1f5FfE5c2Da6cC24

contract ChainBattles is ERC721URIStorage {
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 MAX_SUPPLY = 10000;
    uint    MAX_PER_WALLET = 5;

    mapping(address => uint) public walletMints;

    // mapping (uint256 => uint256) public tokenIdtoLevels;

    mapping (uint256 => Hero) public tokenIdtoHero;

    struct Hero {
        uint256 level;
        uint256 hp;
        uint256 speed;
        uint256 strength;
    }

    constructor() ERC721("Chain Battles", "CBTLS") {
        
    }

    function generateCharacter(uint256 tokenId) public view returns (string memory) {
        string memory level;
        string memory hp;
        string memory speed;
        string memory strength;
        (level, hp, speed, strength) = getHero(tokenId);
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            '<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>',
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',"Warrior",'</text>',
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">', "Levels: ", level ,'</text>',
            '<text x="50%" y="55%" class="base" dominant-baseline="middle" text-anchor="middle">', "HP: ", hp ,'</text>',
            '<text x="50%" y="60%" class="base" dominant-baseline="middle" text-anchor="middle">', "Speed: ", speed ,'</text>',
            '<text x="50%" y="65%" class="base" dominant-baseline="middle" text-anchor="middle">', "Strength: ", strength ,'</text>',
            '</svg>'
        );
        return string(
            abi.encodePacked(
                "data:image/svg+xml;base64,",
                Base64.encode(svg)
            )
        );
    }

    // function getLevels(uint256 tokenId) public view returns (string memory){
    //     uint256 levels = tokenIdtoLevels[tokenId];
    //     return levels.toString();
    // }
    
    function getHero(uint256 tokenId) public view returns (string memory,  string memory, string memory, string memory) {
        Hero storage hero = tokenIdtoHero[tokenId];
        return (hero.level.toString(), hero.hp.toString(), hero.speed.toString(),hero.strength.toString());
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
         bytes memory dataURI = abi.encodePacked(
            '{',
                '"name": "Chain Battles #', tokenId.toString(), '",',
                '"description": "Battles on chain",',
                '"image": "', generateCharacter(tokenId), '"',
            '}'
        );
        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(dataURI)
            )
        );
    }

    function mint() public  {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);

        Hero memory hero = Hero(1, 100, 10, 25);
        tokenIdtoHero[newItemId] = hero;

        // tokenIdtoLevels[newItemId] = 0;
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    function train(uint256 tokenId) public {
        require(_exists(tokenId), "Please use an existing token");
        require(ownerOf(tokenId) == msg.sender, "You must own this token to train it");

        Hero storage hero = tokenIdtoHero[tokenId];
        hero.level = hero.level + 1;
        hero.hp = hero.hp + 100;
        hero.speed = hero.speed + 10;
        hero.strength = hero.strength + 25;
        tokenIdtoHero[tokenId] = hero;

        // uint256 currentLevel = tokenIdtoLevels[tokenId];
        // tokenIdtoLevels[tokenId] = currentLevel + 1;

        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}