const { Alchemy, Network } = require("alchemy-sdk");

const config = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(config);

const main = async () => {
    let txHash = "0xb4c4895a1369fb11c5ebd781559bedc7735289df33c3fbc3aba72ebc8c196a73"; // Replace with your transaction hash

    let response = await alchemy.core.getTransactionReceipt(txHash);

    if (response && response.contractAddress) {
        console.log("Contract Address: ", response.contractAddress);
    } else {
        console.log("No contract address found in transaction receipt.");
    }
};

main();
