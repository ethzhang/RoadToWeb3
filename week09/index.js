const qs = require('qs');
const BigNumber = require('bignumber.js');
const web3 = require('web3');

let currentTrade = {};
let currentSelectSide;
let tokens;


async function init(){
   await listAvailableTokens();
}

async function listAvailableTokens() {
    console.log("initializing");
    let response = await fetch('https://tokens.coingecko.com/uniswap/all.json');
    let tokenListJSON = await response.json();
    console.log("listing available tokens: ", tokenListJSON);
    tokens = tokenListJSON.tokens
    console.log("tokens:", tokens);

    let parent = document.getElementById("token_list");

    for (const i in tokens) {
        let div = document.createElement("div");
        div.className = "token_row";
        let html = `
        <img class="token_list_img" src="${tokens[i].logoURI}">
        <span class="token_list_text">${tokens[i].symbol}</span>
        `;
        div.innerHTML = html;
        div.onclick = () =>{
            selectToken(tokens[i]);
        }
        parent.appendChild(div);
    }
}

async function getPrice(){
    console.log("Getting Price");
    if (!currentTrade.from || !currentTrade.to || !document.getElementById("from_amount").value) return;

    let amount = Number(document.getElementById("from_amount").value * 10 ** currentTrade.from.decimals);

    const params = {
        // sellToken: currentTrade.from.address,
        // buyToken: currentTrade.to.address,
        sellToken: 'ETH',
        buyToken: 'DAI',
        sellAmount: amount,
    }

    const response = await fetch(
        `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`
    );

    swapPriceJSON = await response.json();
    console.log("Price: ", swapPriceJSON);

    document.getElementById("to_amount").value = swapPriceJSON.buyAmount / (10 ** currentTrade.to.decimals);

    document.getElementById("gas_estimate").innerHTML = swapPriceJSON.estimatedGas;
}

async function getQuote(account){
    console.log("Getting Quote");
    if (!currentTrade.from || !currentTrade.to || !document.getElementById("from_amount").value) return;

    let amount = Number(document.getElementById("from_amount").value * 10 ** currentTrade.from.decimals);

    const params = {
        // sellToken: currentTrade.from.address,
        // buyToken: currentTrade.to.address,
        sellToken: 'ETH',
        buyToken: 'DAI',
        sellAmount: amount,
        takerAddress: account,
    }

    const response = await fetch(
    `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`
    );

    swapQuoteJSON = await response.json();
    console.log("Quote: ", swapQuoteJSON);

    document.getElementById("to_amount").innerHTML = swapQuoteJSON.buyAmount / (10 ** currentTrade.to.decimals);

    document.getElementById("gas_estimate").innerHTML = swapQuoteJSON.estimatedGas;

    return swapQuoteJSON;
}

async function trySwap(){
    let accounts = await ethereum.request({method: "eth_accounts"});
    let takerAddress = accounts[0];

    console.log("talerAddress:", takerAddress);
    const erc20abi = [{ "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }];
    
    const swapQuoteJSON = await getQuote(takerAddress);

    const fromTokenAddress = currentTrade.from.address;
    const web3 = new Web3(web3.givenProvider);    
    const ERC20TokenContract = new web3.eth.Contract(erc20abi, fromTokenAddress);
    console.log("setup ERC20 token Contract", ERC20TokenContract);

    const maxApproval = new BigNumber(2).pow(256).minus(1);
    console.log("approve amount: ", maxApproval);

    const tx = await ERC20TokenContract.methods.approve(
        swapQuoteJSON.allowanceTarget,
        maxApproval,
    )
    .send({from: takerAddress})
    .then(tx => {
        console.log("tx: ", tx);
    });


    const receipt = await web3.eth.sendTransaction(swapQuoteJSON);
    console.log("receipt: ", receipt);

}

async function connect (){
    if (typeof window.ethereum != "undefined") {
        try {
            console.log("connecting...");

            await ethereum.request({method: "eth_requestAccounts"});
        } catch (error) {
            console.log(error);
        }

        document.getElementById("login_button").innerHTML = "Connected";

        document.getElementById("swap_button").disabled = false;
    } else {
        document.getElementById("login_button").innerHTML = "Please install MetaMask";
    }
}

function selectToken(token){
    closeModal();
    currentTrade[currentSelectSide] = token;
    console.log("currentTrade:", currentTrade);

    renderInterface();
}

function renderInterface(){
    if (currentTrade.from) {
        console.log(currentTrade.from);
        document.getElementById("from_token_img").src = currentTrade.from.logoURI;
        document.getElementById("from_token_text").innerHTML = currentTrade.from.symbol;
    }

    if (currentTrade.to) {
        // Set the to token image
      document.getElementById("to_token_img").src = currentTrade.to.logoURI;
        // Set the to token symbol text
      document.getElementById("to_token_text").innerHTML = currentTrade.to.symbol;
    }
}

function openModel(side){
    currentSelectSide = side;
    document.getElementById("token_modal").style.display = "block";
}

function closeModal(){
    document.getElementById("token_modal").style.display = "none";
}

init();

document.getElementById("login_button").onclick = connect;
document.getElementById("from_token_select").onclick = () =>{
    openModel("from");
};

document.getElementById("to_token_select").onclick = () =>{
    openModel("to");
};
document.getElementById("modal_close").onclick = closeModal;
document.getElementById("from_amount").onblur = getPrice;
document.getElementById("swap_button").onclick = trySwap;