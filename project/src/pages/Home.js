import React, { useEffect, useState } from 'react'
import Admin from './Admin';
import User from './User';
import Navbar from '../components/Navbar';
export default function Home() {
    const get_role = localStorage.getItem('role')
    const role = ('role: ', JSON.parse(get_role))

    // Functions that use for Logout
    const logout = () => {
        localStorage.removeItem("token");
        window.location = '/login'
        localStorage.removeItem('role');
    }
    // Function that use for Check roles
    // const roles_check = () => {

    //     console.log(role.role)
    //     if (role.role == 'Admin') {
    //         console.log("Yes i am admin")
    //     } else if (role.role == 'User') {
    //         console.log("am just user")
    //     } else {
    //         alert('User type ของคุณไม่มีในระบบ กรุณาติดต่อพนักงาน')
    //         window.location = '/login'
    //         localStorage.removeItem('token')
    //         localStorage.removeItem('role')

    //     }
    // }
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

                } else {
                    // roles_check();
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
            <button onClick={logout}>logout</button>
            <h1>
                Test Homepage (ทดลอง)
            </h1>

            {/* {role.role == 'Admin' 
            ? (<Admin />) 
            :  role.role =='User'
            ? (<User/>)
            : <User/>
            } */}
        </div>
    )
}
