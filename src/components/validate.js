import React, { Component, useEffect, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Input, Media} from 'reactstrap';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Loader from './medical/loader';
import {incStatus, loadTrustChainData, payForRequested, addRequest} from '../redux/ActionCreater';
import { Switch, Route, Redirect, withRouter, useParams, Router } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
	  width: '100%',
	  maxHeight:'50ch',
	 // maxWidth: '36ch',
	  backgroundColor: theme.palette.background.paper,
	},
	inline: {
	  display: 'inline',
	},
  }));

  

const Web3 = require('web3');
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
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
const TrustChainAddress =  '0x67ba8919f54E188F7a7e62D9d8a007350EE8fCB6'; //'0x4D8BBf5A16Fdc02340a34132E62391Ee782B79a1';
const web3 = new Web3( new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/c1633c281b39417eb2d061c5479a68f7'));

/*
const mapStateToProps = (state) => {
    return {
        images: state.images,
        person: state.Person,
		request: state.TrustChainData.request,
		loading: state.TrustChainData.isLoading,
        requestCount: state.TrustChainData.requestCount,
        trustChainData: state.TrustChainData.trustChain,
        verify: state.TrustChainData.verify,
        payment: state.Payment,
    
    }
}

const mapDispatchToProps = (dispatch) =>({
    incrementStatus: (status) =>{ dispatch(incStatus(status))},
    loadTrustChainData: () => {dispatch(loadTrustChainData())},
    payForRequested: (id, money) => {dispatch(payForRequested(id, money))},
    addRequest: (rHash, amount) => {dispatch(addRequest(rHash, amount))},

	});
	*/
	
function RenderRequest({Data, verify, request}){

	const list = Data.map((data, index)=>{
		console.log(index);
	const  _arrayBufferToBase64 = ( buffer ) => {
			var binary = '';
			var bytes = new Uint8Array( buffer );
			var len = bytes.byteLength;
			for (var i = 0; i < len; i++) {
				binary += String.fromCharCode( bytes[ i ] );
			}
			return window.btoa( binary );
		}
	const  arrayBufferView = data.image;
	let base = _arrayBufferToBase64(data.image.data)
	//console.log('base64',base);
	//const  blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
	
	//const  urlCreator = window.URL;
	//const imageUrl = urlCreator.createObjectURL(blob);
	const imageUrl = arrayBufferView.toString('base64');
		//console.log('hello', imageUrl)
		const imgStyle = {
			maxHeight: 100,
			maxWidth: 100
		  }

		if(verify[index].valid == 0){
		return (
			<Media key={index}>
			<Media left href="/home">
			  <Media object src={`data:image/jpeg;base64,${base}`} style = {imgStyle} alt="Generic placeholder image" />
			</Media>
			<Media body>
			  <Media heading>
			  <h4 style={{tabSize: 4}}>{data.name}</h4>
			  </Media>

			  {`  -  ${data.request}`}
			  <br/>
			  <br/>
			  {`  Amount Needed - ${request[index].amount}, Amount Collected - ${verify[index].collectedAmount}`}
			  <br/>
			  <br/>
			  <Button component={Link} to={`/viewValidate/${index}`} color="primary" className="mt-2">View</Button>
			</Media>
			<br/>
			
		  </Media>
			

			 
	
		  );
		}
	})
		return(
			<div>
				{list}
			</div>
		);

	
  }

class  Validate extends Component{

	constructor(props){
		super(props);
		this.state={
				data :null,
				verify : null,
				request : null,
		}
       
	}	
	/*
	     componentDidMount(){
			 //this.props.loadTrustChainData()
			 console.log("testing", this.props.trustChainData)

			 this.setState({data: this.props.trustChainData})
			 this.setState({verify: this.props.verify})
			 this.setState({request: this.props.request})
	}
	*/
	
       render(){

		
        
			return(
				<div className="container mt-5">
					
					<RenderRequest Data = {this.props.Data} verify = {this.props.verify} request = {this.props.requestStatus} />
				
				</div>
			);
	  
	   }
	}	
	  
    

export default Validate