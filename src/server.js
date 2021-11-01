let axios = require('axios');
const web3Service = require('./web3Service.js');


async function load() {

    let totalSupply = await web3Service.ovn.methods.totalSupply().call();
    let totalBurn = await web3Service.ovn.methods.totalBurn().call();
    let totalMint = await web3Service.ovn.methods.totalMint().call();

    let request = {
        totalMint: totalMint / 10 ** 6,
        totalBurn: totalBurn / 10 ** 6,
        totalSupply: totalSupply / 10 ** 6,
    }

    return request;
}

async function activePrices() {

    let result = await web3Service.m2m.methods.assetPricesForBalance().call();
    return result;
}

async function payouts() {

    let address = web3Service.exchange.options.address;
    let token = 'YZPR4G2H7JSIIPXI5NTWN5G1HDX43GSUCR';
    let topik = '0x6997cdab3aebbbb5a28dbdf7c61a3c7e9ee2c38784bbe66b9c4e58078e3b587f';
    let fromBlock = 19022018;
    let toBlock = await web3Service.web3.eth.getBlockNumber();

    return axios.get(`https://api.polygonscan.com/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=${toBlock}&address=${address}&topic0=${topik}&apikey=${token}`);

}

const express = require('express')
const server = express()
const port = 3000

server.get('/api/total', (req, res) => {

    load().then(value => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(value));
    })

});

server.get('/api/payouts', (req, res) => {

    payouts().then(value => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(value.data));
    });
});

server.get('/api/prices', (req, res) => {


    activePrices().then(value => {

        value = value.assetPrices;
        let items = [];
        for (let i = 0; i < value.length; i++) {

            let element = value[i];
            items.push({
                symbol: element.symbol,
                decimals: element.decimals,
                name: element.name,
                amountInVault: element.amountInVault,
                usdcPriceInVault: element.usdcPriceInVault,
                usdcBuyPrice: element.usdcBuyPrice,
                usdcSellPrice: element.usdcSellPrice,
                usdcPriceDenominator: element.usdcPriceDenominator,
            })
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(items));
    })
});


server.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});


var cron = require('node-cron');

console.log('Start Cron')

cron.schedule('59 23 * * *', () => {
    console.log('Run cron');
    runReward();
});


const PRIV_KEY = process.env.pk

if (PRIV_KEY) {
    console.log('PK Key found')
} else {
    console.log('PK Key not found')

}

function runReward() {

    let exchange = web3Service.exchange;
    let web3 = web3Service.web3;

    const from = "0x5CB01385d3097b6a189d1ac8BA3364D900666445" // Ovn ADMIN account
    const to = "0x3be4a04d21d9ce2b38557cb9e89a9254aee7c132" // Exchange

    web3.eth.getTransactionCount(from, function (err, nonce) {

        const txData = {
            from: from,
            nonce: nonce,
            gasPrice: web3.utils.toHex(web3.utils.toWei('15', 'gwei')),
            gasLimit: 6721975,
            to: to,
            value: '0x0',
            data: exchange.methods.reward().encodeABI()
        }

        console.log('Tx data: ' + txData)

        web3.eth.accounts.signTransaction(txData, PRIV_KEY).then(value => {

            const sentTx = web3.eth.sendSignedTransaction(value.raw || value.rawTransaction);
            sentTx.on("receipt", receipt => {
                console.log(receipt);
            });
            sentTx.on("error", err => {
                console.log(err);
            });
        });

    });

}


