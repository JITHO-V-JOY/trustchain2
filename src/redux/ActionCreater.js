import * as ActionTypes from './ActionTypes';
import CryptoJS from 'crypto-js';
const Web3 = require('web3');
const { ethers } = require("ethers");
const provider =  new ethers.providers.InfuraProvider("ropsten");
/*
const Gsn = require("@opengsn/gsn/dist/src/relayclient/")
const RelayProvider = Gsn.RelayProvider;
const configureGSN = require('@opengsn/gsn/dist/src/relayclient/GSNConfigurator').configureGSN;
*/
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const TrustChainAddress =  '0x67ba8919f54E188F7a7e62D9d8a007350EE8fCB6'; //'0x4D8BBf5A16Fdc02340a34132E62391Ee782B79a1';
const web3 = new Web3( new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/c1633c281b39417eb2d061c5479a68f7'));

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

//const provider = new ethers.providers.Web3Provider(gsnProvider);
var acct = provider.provider.newAccount();
*/
const abi = [
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
//let contract = await new ethers.Contract( TrustChainAddress, abi,  provider.getSigner(acct.address, acct.privateKey));

/*
const blockChain = async()=>{
    let contract = await new ethers.Contract( TrustChainAddress, abi,  provider.getSigner(acct.address, acct.privateKey));
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


export const addRequest = (rHash, amount) => async(dispatch) => {
		dispatch(requestLoading());
		//const privatekey ="0xf78c843cf18966a92e63c82a9ac9e0b0839c6eb32405093cf2c96db2c1f732f9";
       // const  wallet = new ethers.Wallet(privatekey).connect(provider);
	   let wallet = new ethers.Wallet('0xf78c843cf18966a92e63c82a9ac9e0b0839c6eb32405093cf2c96db2c1f732f9', provider);
		const contract = new ethers.Contract(TrustChainAddress, abi, wallet);
		//let contract = await new ethers.Contract( TrustChainAddress, abi,  provider.getSigner("0x7E1c374EE69c79d0fF66Bd31Cc38d4A2EeE46f32", "339f6454f15bb8c6cbbf2a4203a37ee38422714aef21052b87b68593219fdc00"));

		console.log('contract', contract);
		contract.makeRequest(rHash, amount)
		.then(function(transaction){
			console.log("transaction", transaction);
			},error => {
				var errmess = new Error(error.message);
				throw errmess;
		})
		.then(()=> dispatch(requestSuccess()))
		.catch((error)=>{dispatch(requestFailed(error.message))});

	  
	 
};

export const requestLoading = () =>({
	type: ActionTypes.ADD_REQUEST_LOADING
});
export const requestFailed = (msg) =>({
	type: ActionTypes.ADD_REQUEST_LOADING,
	payload: msg
});
export const requestSuccess = () =>({
	type: ActionTypes.ADD_REQUEST
});


export const payForRequested =(id, money) => async(dispatch) => {
	dispatch(payLoading());
	//let privatekey ="0xf78c843cf18966a92e63c82a9ac9e0b0839c6eb32405093cf2c96db2c1f732f9";
	//let  wallet = new ethers.Wallet(privatekey).connect(provider)
	let wallet = new ethers.wallet('339f6454f15bb8c6cbbf2a4203a37ee38422714aef21052b87b68593219fdc00', web3);
	let contract = new ethers.Contract(TrustChainAddress, abi, wallet) ;
		console.log('contract', contract);
		contract.sendMoney(id, money)
		.then(function(transaction){
			console.log(transaction);
			},error => {
				var errmess = new Error(error.message);
				throw errmess;
		})
		.then(() => { dispatch(paySuccess())})
		.catch((error)=> dispatch(payFailed(error.message)));

};

export const payLoading = () =>({
	type: ActionTypes.PAY_LOADING
});
export const paySuccess = () =>({
	type: ActionTypes.PAY_SUCCESS
});

export const payFailed = (msg) => ({
	type: ActionTypes.PAY_FAILED,
	payload: msg
});

export const addComment = () => async(dispatch)=>{

	
}

export const loadTrustChainData = () => async(dispatch) => {
	console.log("hello")
	dispatch(trustChainDataLoading());
	const dataArray = []
	const verifyArray = []
	const requestArray = []
	const requestCountArray = []
	
	const contract = new web3.eth.Contract(abi, TrustChainAddress);
	contract.methods.requestCount().call().then((requestCount)=>{
		console.log("request count", requestCount)
		
		for(let i =1; i<=requestCount; i++){
			contract.methods.request(i).call().then(async(request)=>{
				console.log(request.requestHash)
				if(!request.fulfilled){
				  const concat = require('it-concat')
				  console.log(request.requestHash)
				  const  Data =  await concat(ipfs.cat(request.requestHash));
				   const trustChainData  = JSON.parse(Data.toString());
				   dataArray.push(trustChainData);
				   requestArray.push(request);
				   requestCountArray.push(i);
				}
				else{
					console.log(i);
				}
			})

			contract.methods.verify(i).call().then(async(verify)=>{	
					verifyArray.push(verify);
   
			})
		}
	}, error =>{ var errmess = new Error(error.message);
		console.log('error', errmess);
		throw errmess;
	})
	.then(()=>{
		dispatch(addTrustChainRequest(requestArray))
		console.log('request', requestArray);	
		dispatch(addTrustChainVerify(verifyArray))
		console.log('verify', verifyArray);
		dispatch(addTrustChainRequestId(requestCountArray))
		console.log('requestCount', requestCountArray);	
		dispatch(addTrustChainData(dataArray))
				console.log('data', dataArray);	
	})
	
   .catch(error => dispatch(trustChainDataFailed(error.message)));
	
};

export const trustChainDataLoading = () => ({
		type: ActionTypes.TRUSTCHAIN_DATA_LOADING
})

export const  trustChainDataFailed = (msg) =>({
	type: ActionTypes.TRUSTCHAIN_DATA_FAILED,
	payload: msg
});

export const addTrustChainRequest = (requestArray) => ({
	type: ActionTypes.ADD_TRUSTCHAIN_REQUEST,
	payload: requestArray
});
export const addTrustChainVerify = (verifyArray) => ({
	type: ActionTypes.ADD_TRUSTCHAIN_VERIFY,
	payload: verifyArray
});

export const addTrustChainRequestId = (requestCount) => ({
	type: ActionTypes.ADD_TRUSTCHAIN_REQUEST_ID,
	payload: requestCount
});

export const addTrustChainData = (dataArray) => ({
	type: ActionTypes.ADD_TRUSTCHAIN_DATA,
	payload: dataArray
});


