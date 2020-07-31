import * as ActionTypes from './ActionTypes';
const Web3 = require('web3');
const ipfsClient = require('ipfs-http-client');


//const Gsn = require("@opengsn/gsn/dist/src/relayclient/")
//const RelayProvider = Gsn.RelayProvider;
//const configureGSN = require('@opengsn/gsn/dist/src/relayclient/GSNConfigurator').configureGSN;
const ethers = require("ethers");
const web3 = new Web3( new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/c1633c281b39417eb2d061c5479a68f7'));
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https ' });
/*
const conf = {
	ourContract: '0x19870E0837496886Dc9FB56d956399DD7d052754',
	paymaster:   '0x3E745FE690830b376A45a561db39Bf1e6AA74839',
	relayhub:    '0xEF46DD512bCD36619a6531Ca84B188b47D85124b',
	stakemgr:    '0x41c7C7c1Bf501e2F43b51c200FEeEC87540AC925',
	gasPrice:  20000000000   // 20 Gwei
}
const gsnConfig = configureGSN({
	relayHubAddress: conf.relayhub,
	paymasterAddress: conf.paymaster,
	stakeManagerAddress: conf.stakemgr,
	gasPriceFactorPercent: 70,
	methodSuffix: '_v4',
    jsonStringifyRequest: true,
    chainId: 3,
	relayLookupWindowBlocks: 1e5
});
const gsnProvider = new RelayProvider((new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/c1633c281b39417eb2d061c5479a68f7'))).currentProvider, gsnConfig);

//const origProvider = web3.give;
//const gsnProvider = new RelayProvider(origProvider, gsnConfig);
const provider = new ethers.providers.Web3Provider(gsnProvider);
var acct = provider.provider.newAccount();
*/
const abi= [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "requestHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "fullfilled",
				"type": "bool"
			}
		],
		"name": "RequestCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "collectedAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "valid",
				"type": "uint256"
			}
		],
		"name": "Verified",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_rHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "makeRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "request",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "author",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "requestHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "fullfilled",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_money",
				"type": "uint256"
			}
		],
		"name": "sendMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "verify",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "collectedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "valid",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const TrustChainAddress = '0x4D8BBf5A16Fdc02340a34132E62391Ee782B79a1';
 /*
const blockChain = async()=>{
    let contract = await new ethers.Contract( conf.ourContract, abi,  provider.getSigner(acct.address, acct.privateKey));
    const transaction = await contract.makeRequest('abcd', 1000);
    const receipt = await provider.waitForTransaction(transaction.hash);
    console.log(`Mined in block: ${receipt}`);
    let count = await contract.requestCount.call();
    console.log('count', count.toNumber());
}
*/
export const incStatus = (status) =>(dispatch) =>{
    dispatch(addStatus(status));
    console.log('st', status)
};

export const addStatus = (status) =>({
    type: ActionTypes.STATUS_INCREMENT,
    payload: status
});

export const medicalDetails = (rHash, amount) => async(dispatch) => {
  
  
      dispatch(addMedicalDetails("hello"));
  
   
};

export const addMedicalDetails = (person) => ({
    type: ActionTypes.SAVE_PERSONAL_DETAILS,
    payload: person
});