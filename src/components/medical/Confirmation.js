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

export default function Confirmation ({ medicalData, prevStep, nextStep , arrayImage, arrayMcert, arrayID, addRequest, requestStatus}){
  const classes = useStyles();
  const { name, state, address, phno, image, id, hName, hAddress, hPhno,doctor,  mCert, accountHolder, accountNumber
  , IFSC, amount, request} = medicalData;
  const dispatch = useDispatch();
  const [requestLoading, setRequestLoading] = useState(requestStatus.isLoading);
  const [requestErr, setRequestErr] = useState(requestStatus.errMess);
  const [requestSuccess, setRequestSuccess] = useState(requestStatus.requestSuccess);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(modal => modal = !modal);

  const addMedical = async() =>{
  const requestData = JSON.stringify({category: 'medical',
  name: name,
  state: state,
  address: address,
  phno: phno,
  image: arrayImage,
  id: arrayID,
  hName: hName,
  hAddress:hAddress,
  hPhno: hPhno,
  doctor:doctor,
  mCert: arrayMcert,
  accountHolder: accountHolder,
  accountNumber: accountNumber,
  IFSC: IFSC,
  amount: amount,
  request: request,
  comments:[]
  });
   const result = await ipfs.add(requestData);
   console.log('result ', result);
   addRequest('QmeQT4wpPkwyRtQmM4f9wMxYnShNjqcTAdd2sj1e19dj8y', amount);
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
            onClick={() => addMedical()}
          >
            Confirm & Continue
          </Button>
        </div>
      </div>
    
  );
};

Confirmation.propTypes = {
  medicalData: PropTypes.object.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  arrayImage: PropTypes.object.isRequired,
  arrayID: PropTypes.object.isRequired,
  arrayMcert: PropTypes.object.isRequired,
  addRequest: PropTypes.func.isRequired,
  requestStatus: PropTypes.object.isRequired,

};
