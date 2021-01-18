import React, {useState} from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import { useDispatch } from "react-redux";
import {medicalDetails} from '../../redux/ActionCreater';
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
var TeleSignSDK = require('telesignsdk');
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  textCenter: {
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(1)
  },
  inline: {
    display: 'inline',
  },
  }));

export default function Confirmation ({ medicalData, prevStep, nextStep , arrayImage, arrayID, addRequest, requestStatus}){
  const classes = useStyles();
  const { name, email,  state, address, phno, adhar, image, id, hName, hAddress, hPhno,doctor,  mCert, bemail, amount, request} = medicalData;
  const dispatch = useDispatch();
  const [requestLoading, setRequestLoading] = useState(requestStatus.isLoading);
  const [requestErr, setRequestErr] = useState(requestStatus.errMess);
  const [requestSuccess, setRequestSuccess] = useState(requestStatus.requestSuccess);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(modal => modal = !modal);

  const sendEmailTOc = (templateId, variables) =>{
    window.emailjs.send(
      "service_gp9ndoc", templateId,
      variables
      ).then(res => {
        console.log('Email successfully sent!')
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }

    const sendEmailTOb = (templateId, variables) =>{
      window.emailjs.send(
        "service_gp9ndoc", templateId,
        variables
        ).then(res => {
          console.log('Email successfully sent!')
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      }

  const addMedical = async() =>{
  const requestData = JSON.stringify({category: 'medical',
  name: name,
  email: email,
  state: state,
  address: address,
  phno: phno,
  adhar: adhar,
  image: arrayImage,
  id: arrayID,
  hName: hName,
  hAddress:hAddress,
  hPhno: hPhno,
  doctor:doctor,
  
/*
  accountHolder: accountHolder,
  accountNumber: accountNumber,
  IFSC: IFSC,
  */
  bemail: bemail,
  amount: amount,
  request: request,
  comments:[]
  });
/*
  const Http = new XMLHttpRequest();
  const url =    "http://cloud.smsindiahub.in/vendorsms/pushsms.aspx?user=jitho&password=z8bZ7.QMMyehjgf=9746176014,9895352674&sid=WEBSMS&msg=test%20message&fl=0&gwid=2"
  Http.open("GET", url);
  Http.send();
  
  Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
  }
  /*
  const customerId = "3F41F293-DC1A-487E-9DF8-DAA348D2ADB5";
  const apiKey = "aBQ+4QeI9dbI/IvMyk+anhEDNsRVMrimc0ljfgZTRs9R4JkhrUTprn98e7fc27ntDI9iQeqNc6PDzdaEYVhyOQ==";
  const rest_endpoint = "https://rest-api.telesign.com";
  const timeout = 10*1000; // 10 secs

  const client = new TeleSignSDK( customerId,
      apiKey,
      rest_endpoint,
      timeout // optional
      // userAgent
  );

  const phoneNumber = phno;
  const message = "You're scheduled for a dentist appointment at 2:30PM.";
  const messageType = "ARN";

  console.log("## MessagingClient.message ##");
  

  function messageCallback(error, responseBody) {
      if (error === null) {
          console.log(`Messaging response for messaging phone number: ${phoneNumber}` +
              ` => code: ${responseBody['status']['code']}` +
              `, description: ${responseBody['status']['description']}`);
      } else {
          console.error("Unable to send message. " + error);
      }
  }
  client.sms.message(messageCallback, phoneNumber, message, messageType);
  */
  let otp = Math.floor(100000 + Math.random() * 900000)
  let templateId = 'template_3zrzj0f'
  let message = "Adhar no : " + adhar + "   Id : " + otp

  sendEmailTOc(templateId, { message: message, from_name: 'CAREBLOCKS', reply_to: email, to_email: email})
  sendEmailTOb(templateId, { message: message, from_name: 'CAREBLOCKS', reply_to: bemail, to_email: bemail})

/*

  const client = new SMTPClient({
    user: 'careblocks 7',
    password: 'careblocks@123',
    host: 'smtp.gmail.com',
    ssl: true,
  });


  client.send(
    {
      text: `CAREBLOCKS Adhar no : ${adhar}, Your id : ${otp}`,
      from: 'careblocks77@gmail.com',
      to: `${bemail}, ${email} `,
      cc: 'jithovjoy@cet.ac.in',
      subject: 'CAREBLOCKS',
    },
    (err, message) => {
      console.log(err || message);
      alert(err || message)
    }
  );
 */

   const result = await ipfs.add(requestData);
   console.log('result ', result.path);
   addRequest(result.path, amount);
   toggle()
   
   
}

 const RenderRequest = () =>{

      if(requestLoading){
        return(
          <div className={classes.root}>
              <CircularProgress />
          </div>
      );
      }
      else if(requestErr){
        return(
          <div>
              <p>{requestErr}</p>
          </div>
      );
      }
      else if(requestSuccess){
        return(
          <div>
              <p>Successfully added your request!</p>
          </div>
      );
      }
             
 }

 
  return (
  

      <div>
       
      <div>
            <Modal isOpen={modal} toggle={toggle}>
              <ModalHeader toggle={toggle}>Adding Request</ModalHeader>
              <ModalBody>
                <p>Loading...</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>Ok</Button>
              </ModalFooter>
            </Modal>
      </div>
        <List>
          <ListItem>
            <ListItemText 
              primary={`Name : ${name}`}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`State : ${state}`}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Address : ${address}`}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
          <ListItemText
            primary={`Phone : ${phno}`}
         
            className={classes.textCenter}
          />
        </ListItem>
          <ListItem>
            <ListItemText
              primary={`Image : ${image.name}`}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`ID : ${id.name}`}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Hospital Name : ${hName}`}
              className={classes.textCenter}
            />
          </ListItem>
         
          <ListItem>
            <ListItemText
              primary={`Hospital Address : ${hAddress}`}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
          <ListItemText
            primary={`Hospital Phone : ${hPhno}`}
            className={classes.textCenter}
          />
        </ListItem>
          <ListItem>
            <ListItemText
              primary={`Doctor : ${doctor}`}
        
              className={classes.textCenter}
            />
          </ListItem>
         
          <ListItem>
            <ListItemText
              primary={`Amount : ${amount}`}

              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Request : ${request}`}
              className={classes.textCenter}
            />
          </ListItem>
        </List>
        <div className={classes.textCenter}>
          <Button
            color='secondary'
            variant='contained'
            className={classes.button}
            onClick={() => prevStep()}
          >
            Back
          </Button>

          <Button
            color='primary'
            variant='contained'
            className={classes.button}
            onClick={() => {
              
              
              addMedical()}}
          >
            Confirm & Continue
          </Button>
        </div>
      </div>
    
  );
  /* 
  
               <ListItem>
            <ListItemText
              primary={`Medical Certificate : ${mCert.name}`}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Account Holder : ${accountHolder}`}
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Account Number : ${accountNumber}`}
            
              className={classes.textCenter}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`IFSC Code : ${IFSC}`}

              className={classes.textCenter}
            />
          </ListItem>
  */
};

Confirmation.propTypes = {
  medicalData: PropTypes.object.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  arrayImage: PropTypes.object.isRequired,
  arrayID: PropTypes.object.isRequired,
  addRequest: PropTypes.func.isRequired,
  requestStatus: PropTypes.object.isRequired,

};
