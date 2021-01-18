import React, { useState } from 'react';


import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import {Card , CardContent}from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';
import PersonalDetails from './personalDetailsComponent';
import HospitalDetails from './hospitalDetailsComponent';
import BankDetails from "./bankDetailComponent";
import MyRequest from './myRequest';
import Confirmation from './Confirmation';
import Success from './Success';

  function getSteps() {
    return ['Personal Details', 'Hospital Details', 'Bank Details', 'My Request', 'Confirmation'];
  }

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop:'3%'
      },
     
   
  }));

  function StepperComponent({step}){
    const classes = useStyles();
    const steps = getSteps();
      return(
        <Card className="mt-3">
            <CardContent>
            <div className={classes.root}>
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
          </div>
            
            </CardContent>
        </Card>
      
      );
  }


 function Medical({addRequest, requestStatus}) {
  
  const[step, setStep] = useState(0);
  const[arrayImage, setArrayImage] = useState('');
  const[arrayID, setArrayID] = useState('');
  const[arrayMcert, setArrayMcert] = useState('');


  const[medicalData, setMedicalData] = useState({
      name: '',
      email: '',
      state:'' ,
      address:'',
      phno:'',
      adhar:'',
      image: '',
      id: '',
      hName:'',
      hAddress:'',
      hPhno:'',
      doctor:'',
      mCert:'000',
      bemail:'', 
      amount:'',
      request:'',
      agree:false,
      arrayImage:'',
      arrayID: '',
      arrayMcert:'000'

  });
 /*
  accountHolder:'',
      accountNumber:'',
      IFSC:'',
 */
    
   const nextStep = () => setStep(prev => prev + 1);
   const prevStep = () => setStep(prev => prev - 1);

    switch(step) {
                case 0:
                    return (<div className="container">
                            <StepperComponent step={step}/>
                            <PersonalDetails
                            nextStep={nextStep}
                            medicalData={medicalData}
                            setMedicalData={setMedicalData}
                            setArrayImage = {setArrayImage}
                            setArrayID = {setArrayID}
                            />
                            </div>
                      
                          )
                case 1:
                    return (<div className="container">
                            <StepperComponent step={step}/>
                            <HospitalDetails
                            nextStep={nextStep}
                            prevStep={prevStep}
                            medicalData={medicalData}
                            setMedicalData={setMedicalData}
                            setArrayMcert={setArrayMcert}
                            />
                            </div>)
                case 2:
                    return (<div className="container">
                            <StepperComponent step={step}/>
                            <BankDetails
                            nextStep={nextStep}
                            prevStep={prevStep}
                            medicalData={medicalData}
                            setMedicalData={setMedicalData}
                            />
                            </div>)
                case 3: 
                     return (<div className="container">
                             <StepperComponent step={step}/>
                            <MyRequest
                            nextStep={nextStep}
                            prevStep={prevStep}
                            medicalData={medicalData}
                            setMedicalData={setMedicalData}
                            />  
                            </div>)  
                case 4: 
                    return  (<div className="container">
                            <StepperComponent step={step}/>
                            <Confirmation
                            nextStep={nextStep}
                            prevStep={prevStep}
                            medicalData={medicalData}
                            arrayImage={arrayImage}
                            arrayID={arrayID}
                            addRequest={addRequest}
                            requestStatus={requestStatus}
                            />   
                            </div>)
                            
                default: 
                    return (<div className="container">
                    <StepperComponent step={step}/>
                    <PersonalDetails
                    nextStep={nextStep}
                    medicalData={medicalData}
                    setMedicalData={setMedicalData}
                    setArrayImage = {setArrayImage}
                    setArrayID = {setArrayID}
                    />
                    </div>
              
                  )
                }
        };
       

  
export default Medical;