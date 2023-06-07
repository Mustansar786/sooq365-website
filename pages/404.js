import React,{useState,useEffect} from 'react';
import GeneralLayout from "Layouts/GeneralLayout";
import { Container, Header } from 'semantic-ui-react'; 
export default function Custom404() {
   const [innerHeight,setInnerHeight]=useState(0)
 useEffect(()=>{
     setInnerHeight(window.innerHeight)
 })
    return (
        <GeneralLayout>
            <Container style={{height :innerHeight - 515,display:'flex',justifyContent:'center',alignItems:'center'}}>
                
                    <Header size="huge" color="teal">404 - Page Not Found</Header>
                
            </Container>
        </GeneralLayout>
    )
}