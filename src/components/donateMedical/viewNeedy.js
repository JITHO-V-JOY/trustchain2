import React, {useState} from 'react';
import { useDispatch } from "react-redux";
import {Button } from 'reactstrap';
import {Form, Input, FormGroup, Label} from 'reactstrap';
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

export default function ViewNeedy({data,  requestCount, payment, payForRequested}){
    const dispatch = useDispatch();

    const [comment, setComment] = useState('Help him...');
    console.log('comment', comment);
    const addComment = async() =>{
            data.comments.push(comment);
            console.log('data', data);
        await ipfs.files.write('/QmeQT4wpPkwyRtQmM4f9wMxYnShNjqcTAdd2sj1e19dj8y', data);

    }
    console.log('data', data)
    const  _arrayBufferToBase64 = ( buffer ) => {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
    }

    let Image = _arrayBufferToBase64(data.image.data)
    console.log('base64',Image);

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 col-md mt-1">
                    <img src={`data:image/jpeg;base64,${Image}`} className="img-fluid"/>
                </div>
                <div className="col-12 col-md mt-5">
                    <h3>
                        My Request
                    </h3>
                    {`-${data.request}`}
                </div>

            </div>
            <hr></hr>
            <div className="row">
            <div className="col-12 col-md mt-1">
                  <h4>Personal Details</h4><br/>
                  <p><b>Name : </b>{` ${data.name}`}</p><br/>
                  <p><b>State : </b>{` ${data.state}`}</p><br/>
                  <p><b>Address : </b>{` ${data.address}`}</p><br/>
                  <p><b>Phone : </b>{` ${data.phno}`}</p><br/>
                  <Button color="primary">View Identity</Button>
            </div>
            <div className="col-12 col-md mt-1">
                <h4>
                    Hospital Details
                </h4>
                <br/>
                  <p><b>Hospital Name : </b>{`${data.hName}`}</p><br/>
                  <p><b>Address : </b>{` ${data.hAddress}`}</p><br/>
                  <p><b>Consultant Doctor : </b>{` ${data.doctor}`}</p><br/>
                  <p><b>Hospital Phone : </b>{` ${data.hPhno}`}</p><br/>
                  <Button color="primary">View Medical Certificate</Button>
            </div>

        </div>
        <hr></hr>
            <div className="row">
                <div className="col-12 col-md-6 mt-1">
                <h3>{`Pay For ${data.name}`}</h3>
                <Button onClick={()=> payForRequested(requestCount, 1000) }>PAY</Button>

                </div>
            </div>
    
        <hr></hr>
            <div className="row">
                <div className = "col-12 col-md-12 mt-2">
                        <Form onSubmit={(values) => console.log(values)}>
                          <FormGroup>
                            <Label for="comment">Add Comment</Label>
                            <Input type="textarea" name="comment" id="comment" placeholder="write your comment" onChangeText={(value) => setComment(value)} />
                            </FormGroup> 
                            <FormGroup>
                            <Button  onClick={async() => addComment()}>Comment</Button>
                          </FormGroup>
                        </Form>
                
                </div>
            </div>   

            <hr></hr>




        
        </div>
    );

}

