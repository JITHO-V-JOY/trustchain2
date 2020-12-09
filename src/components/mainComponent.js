import React, { Component } from 'react';
import Header from './headerComponent';
import Footer from './footerComponent';
import Home from './homeComponent';
import Medical from "./medical/medicalComponent";
import RequestHome from './requestHomeComponent';
import DonateHome from './donateHomeComponent';
import HomeRequest from './home/homeRequestComponent';
import Request from './donateMedical/viewRequest';
import ViewNeedy from './donateMedical/viewNeedy';
import { Switch, Route, Redirect, withRouter, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {incStatus, loadTrustChainData, payForRequested, addRequest} from '../redux/ActionCreater';


const mapStateToProps = (state) => {
    return {
        images: state.images,
        person: state.Person,
        request: state.TrustChainData.request,
        requestCount: state.TrustChainData.requestCount,
        trustChainData: state.TrustChainData.trustChain,
        payment: state.Payment,
        request: state.Request
    }
}

const mapDispatchToProps = (dispatch) =>({
    incrementStatus: (status) =>{ dispatch(incStatus(status))},
    loadTrustChainData: () => {dispatch(loadTrustChainData())},
    payForRequested: (id, money) => {dispatch(payForRequested(id, money))},
    addRequest: (rHash, amount) => {dispatch(addRequest(rHash, amount))},

    });


class Main extends Component{
    constructor(props){
        super(props);
    }
    async componentDidMount(){
        console.log('hello')
        this.props.loadTrustChainData();
    }
   
     render(){
        const  ViewRequestId = ({match}) => {
            console.log("hi")
            const  {requestId} = match.params;
            console.log('requestID', requestId)
            console.log(this.props.trustChainData)
            console.log(this.props.trustChainData.filter((arrData, index, arr)=> index === Number(requestId))[0])
            return(
                <ViewNeedy data = {this.props.trustChainData.filter((arrData, index, arr)=> index === Number(requestId))[0]}
                      // request  ={} //{this.props.request.filter((request, index, arrr)=> index === Number(requestId))[0]}
                       requestCount  = {this.props.requestCount.filter((requestCount, index, arr)=> index === Number(requestId))[0]}
                       paymentStatus = {this.props.payment}
                       payForRequested = {this.props.payForRequested}
            />
            );
            
        }
         return(
             <div>
             <Header />
             <Switch>      
                <Route path="/home" component = {()=><Home images={this.props.images}/>}/>
                <Route path="/request" component = {()=><RequestHome images={this.props.images}/>}/>
                <Route path="/donate" component = {()=><DonateHome images={this.props.images}/>}/>
                <Route path="/requestMedical" component = {() => <Medical addRequest = {this.props.addRequest} requestStatus = {this.props.request}/>} />
                <Route path="/requestHome" component = {() => <HomeRequest />} />
                <Route path="/viewMedicalRequest" component = {() => <Request Data = {this.props.trustChainData}/>} />
                <Route path="/viewMedicallRequest/:requestId" component = {({match}) => <ViewRequestId match={match} />} />

                <Redirect to="/home" />
             </Switch>
             <Footer />
             </div>
             
              
         );
     }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Main)) ;