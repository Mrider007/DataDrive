import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './navbar.css'

import { auth } from '../Firebase';


function updateTime() {

  const hktDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' });


  document.getElementById('hkt-time').textContent = hktDate;
}

setInterval(updateTime, 1000);




function Navbar1() {
  const Navigate = useNavigate()
  // const {currentUser} = useAuth()

  

  return (

    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home"><b>X</b> Drive</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text id="hkt-time">
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navbar1