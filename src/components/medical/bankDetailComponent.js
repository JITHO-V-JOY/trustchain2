import React, { useState } from 'react';
import PropTypes from  'prop-types';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import {Button,Card, CardContent,} from '@material-ui/core';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width:'85%',
        margin: theme.spacing(1),
      },
      button: {
        margin: theme.spacing(1)
      },
  
      select:{
        marginTop:'3%',
        width:'25%'
      },
      textArea:{
          marginTop:'4%',
          
      }
  }));

  const validationSchema = yup.object({
     bemail: yup
      .string()
      .required(' Name is required'),
/*
     accountNumber: yup
      .string()
      .required('Account Number is Required'),
    
    IFSC: yup
      .string()
      .required('IFSC code is Required'),
     */ 
    amount: yup
      .string()
      .required('Amount is Required')
      .min(3),
    
  });


function BankDetails({medicalData, nextStep, prevStep, setMedicalData}){
   const classes = useStyles();
    const [direction, setDirection] = useState('back');
        return(
         <div className="mt-5 mb-5">   
                
                     <h3>Bank Details</h3>
        
              <Card>
              
                  <CardContent>
                  <Formik
                  initialValues={medicalData}
                  onSubmit={values => {
                    console.log('values', values);
                    setMedicalData(values);
                    direction === 'back' ? prevStep() : nextStep();
                  }}
                     validationSchema={validationSchema}
                     >
                     {({ errors, touched }) => (
                         <Form className={classes.form} >
                           <Field
                             name='bemail'
                             label='bemail'
                             margin='normal'
                             as={TextField}
                             error={touched.bemail&& errors.bemail}
                             helperText={touched.bemail && errors.bemail}
                           />
                             
                             <Field
                             name='amount'
                             label='Amount You Need *'
                             margin='normal'
                             as={TextField}
                             error={touched.amount && errors.amount}
                             helperText={touched.amount && errors.amount}
                             />
                             <div className="mt-5">
                             <Button
                               type='submit'
                               variant='contained'
                               color='primary'
                              // className={classes.button}
                               onClick={() => setDirection('back')}
                             >
                               Back
                             </Button>
                             <Button
                             type='submit'
                             variant='contained'
                             color='primary'
                             className={classes.button}
                             onClick={() => setDirection('forward')}
                           >
                             Save And Continue
                           </Button>
                           
                           </div>
                         </Form>
                       )}
                  
              </Formik>
                  </CardContent>
              </Card>
                
        </div>
                   
    
           
        );


        /*
        
        
            <Field
                           type="number"
                           name='accountNumber'
                           label='Account Number *'
                           margin='normal'
                           as={TextField}
                           error={touched.accountNumber && errors.accountNumber}
                           helperText={touched.accountNumber && errors.accountNumber}
                         />
                          
                           
                             <Field
                             name='IFSC'
                             label='IFSC Code *'
                             margin='normal'
                             as={TextField}
                             error={touched.IFSC && errors.IFSC}
                             helperText={touched.IFSC && errors.IFSC}
                             />
        */
    }


export default BankDetails;

BankDetails.propTypes = {
    medicalData: PropTypes.object.isRequired,
    setMedicalData: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired
  };
  