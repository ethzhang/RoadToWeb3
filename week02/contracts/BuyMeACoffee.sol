// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Switch this to your own contract address once deployed, for bookkeeping!
// Example Contract Address on Goerli: 0xfbC181753eF73E9365B6d88D1dcFE3F6f478055d

contract BuyMeACoffee {
    // Event to emit when a Memo is created
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    address payable owner;

    Memo[] memos;

    constructor(){
        owner = payable(msg.sender);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function buyCoffee(string memory _name, string memory _message) public payable  {
        // must accept more than 0 Eth for a coffee
        require(msg.value > 0, "can't buy coffee for free");

        // Add the memo
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    function withdrawTips() public  {
        require(owner.send(address(this).balance));
    }

    function setOwner(address newOwner) public   {
        require(owner == msg.sender, "Only owner can call this function");

        owner = payable(newOwner);
    }
}
