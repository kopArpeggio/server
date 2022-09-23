
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";


// Function that use for Check roles


export default function User() {
  const navigate = useNavigate();



  const logout = () => {
    
    localStorage.removeItem("token");
    // localStorage.removeItem('role');
    navigate('/login')
  }

  useEffect(() => {
    

    const token = localStorage.getItem('token')
    fetch('http://localhost:3001/authen', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status != "ok") {
          alert('โปรดเข้าสู่ระบบก่อน')
          window.location = '/login'
          localStorage.removeItem('token');

        }
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, []);
  return (
    <div>
      <Navbar />
      <h1>User โง่ๆๆๆๆๆ</h1>
      <button onClick={logout}>logout</button>
      <h1>
        Test Homepage (ทดลอง)
      </h1>

    </div>
  )
}
