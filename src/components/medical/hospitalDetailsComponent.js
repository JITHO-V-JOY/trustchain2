import React, { useState } from 'react';
import PropTypes from  'prop-types';
import { Formik, Form, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, TextareaAutosize,Card, CardContent, } from '@material-ui/core/';
import {Button,} from '@material-ui/core';
import { Select, SimpleFileUpload} from 'formik-material-ui';
import * as yup from 'yup';

const useStyles = makeStyles(theme => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      width:'85%',
      margin: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(1),
  
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
     hName: yup
      .string()
      .required('Full Name is required')
      .max(20),
     hAddress: yup
      .string()
      .required('Hospital Address is Required'),
    hPhno: yup
      .string()
      .required('Hospital Phone Number is Required')
      .min(10),
    doctor: yup
      .string()
      .required('Doctor is Required')
      .max(20),
    mCert: yup.string()
    .required("Medical Certificate is Required ")
    
  });


function HospitalDetails({medicalData, nextStep, prevStep, setMedicalData, setArrayMcert}){
    const classes = useStyles();
    const [direction, setDirection] = useState('back');
    const convertMcert = (file) =>{     
      console.log("Hello");
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file);
      reader.onloadend = () =>{
        setArrayMcert(Buffer(reader.result));

      }
    }
        return(
         
        <div className="mt-5 mb-5">   
                
          <h3>Hospital Details</h3>
 
       <Card>
          
        <CardContent>
          <Formik 
          initialValues={medicalData}
          onSubmit={values => {
            convertMcert(values.mCert);
            setMedicalData(values);
            direction === 'back' ? prevStep() : nextStep();
          }}
             validationSchema={validationSchema}
             >
             {({ errors, touched }) => (
                 <Form className={classes.form}>
                   <Field
                     name='hName'
                     label='Hospital Name *'
                     margin='normal'
                     as={TextField}
                     error={touched.hName&& errors.hName}
                     helperText={touched.hName && errors.hName}
                   />
                   
                   <Field
                     name='hAddress'
                     label='Hospital Address *'
                     margin='normal'
                     rows="3"
                     placeholder='Hospital Address *'
                     className={classes.textArea}
                     as={TextareaAutosize}
                     error={touched.hAddress && errors.hAddress}
                     helperText={touched.hAddress && errors.hAddress}
                   />
                   <label className="error">{touched.hAddress && errors.hAddress}</label>
                   
                     <Field
                     type = "number"
                     name='hPhno'
                     label='Hospital Phone Number *'
                     margin='normal'
                     as={TextField}
                     error={touched.hPhno && errors.hPhno}
                     helperText={touched.hPhno && errors.hPhno}
                     />
                     <Field
                     name='doctor'
                     label='Consultant Doctor *'
                     margin='normal'
                     as={TextField}
                     error={touched.doctor && errors.doctor}
                     helperText={touched.doctor && errors.doctor}
                     />
                     <div className={classes.select}>
                     <label for="id">Upload Your Verification document</label>
                     <Field component={SimpleFileUpload} 
                     InputProps={{ disableUnderline: true }}
                     name="mCert" label={medicalData.mCert.name}
                     error={touched.mCert && errors.mCert}
                     helperText={touched.mCert&& errors.mCert} />
                    </div>

                     <div className="mt-4">
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
    }


export default HospitalDetails;

HospitalDetails.propTypes = {
    medicalData: PropTypes.object.isRequired,
    setMedicalData: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired
  };
  