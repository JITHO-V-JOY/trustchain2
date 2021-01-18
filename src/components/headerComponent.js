import React, {Component, useState,} from 'react';
import { Switch, Route, Redirect, withRouter, useParams, Router } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
import history from './history';
  
 

function  Header(){
    
    const [isOpen, setisOpen] = useState(false)

    const Role = useSelector(state => state.User.role)

    const toggleNav=()=>{
         setisOpen(!isOpen)
    }

        if(Role == 'village-officer'){
            return(
                <Navbar dark expand="md">
                <div className="container">
               <NavbarBrand href="/"><h2>Trust Chain</h2></NavbarBrand>
                   <NavbarToggler onClick={toggleNav} />
                   <Collapse isOpen={isOpen} navbar>
                   <Nav className="mr-auto" navbar>
                   <NavItem>
                                <button onClick={()=> history.push('/home')} >Home</button>              
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/about">
                                    About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem >
                                <button onClick={()=> history.push('/donate')}> Donate</button>

                                </NavItem>
                               
                                
                       <NavItem>
                       <button onClick={()=> history.push('/request')}>Request</button>

                       </NavItem>
                       
                       
                   </Nav>  
                   </Collapse>  
                   </div>
           </Navbar>
            )
        }
        else if(Role == "decision-maker"){
        return(
                    
                    <Navbar dark expand="md">
                         <div className="container">
                        <NavbarBrand href="/"><h2>Trust Chain</h2></NavbarBrand>
                            <NavbarToggler onClick={toggleNav} />
                            <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <button onClick={()=> history.push('/home')} >Home</button>              
                                </NavItem>
                                <NavItem>
                                <button onClick={()=> history.push('/home')} >About Us</button>              
     
                                </NavItem>
                                <NavItem >
                                <button onClick={()=> history.push('/donate')}> Donate</button>

                                </NavItem>
                                <NavItem>
                                <button onClick={()=> history.push('/validate')}> Validate</button>

                                </NavItem>
                                
                            </Nav>  
                            </Collapse>  
                            </div>
                    </Navbar>
                   
               
        );
    }
    else if(Role == 'user'){
        return(
                    
            <Navbar dark expand="md">
                 <div className="container">
                <NavbarBrand href="/"><h2>Trust Chain</h2></NavbarBrand>
                    <NavbarToggler onClick={toggleNav} />
                    <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                        <button onClick={()=> history.push('/home')}> Home</button>
                                
                        </NavItem>
                        <NavItem>

                      <button onClick={()=> history.push('/about')}> About Us</button>
 
                        </NavItem>
                        <NavItem>
                      
                                <button onClick={()=> history.push('/donate')}> Donate</button>

                                </NavItem>

                       
                        <NavItem>
                        <button onClick={()=> history.push('/login')}>Login</button>

                        </NavItem>
                    </Nav>  
                    </Collapse>  
                    </div>
            </Navbar>
           
       
);
    }
}



export default Header