
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";
Axios.defaults.withCredentials = true;

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, SetLoginStatus] = useState("");


    const logout = () => {
        localStorage.removeItem("userID");
        window.location = '/'
        sessionStorage.removeItem('userID');
    }
    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password,
        }).then((resopnse) => {
            console.log(resopnse.data);
            window.location.reload();
        });
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((resopnse) => {
            if (resopnse.data.loggedIn == true)
                SetLoginStatus(resopnse.data.user[0].username)
        });
    }, []);
    return (
        <div>
            <Navbar />
            <Form className='App-login-form font-css '>
                <br />
                <Form.Group className="mb-3 font-css " controlId="formBasicEmail">
                    <h1 className="app-login mt-5 mb-5">เข้าสู่ระบบ</h1>
                    <Form.Label className='font-usr-pass mb-3'>ชื่อผู้ใช้ :</Form.Label>
                    <Form.Control className='use-pass mb-3' type="username" placeholder="Username" required onChange={(event) => {
                        setUsername(event.target.value)
                    }} />
                    <Form.Label className='font-usr-pass mb-3'>รหัสผู้ใช้ :</Form.Label>
                    <Form.Control className='use-pass mb-3' type="password" placeholder="Password" required onChange={(event) => {
                        setPassword(event.target.value)
                    }} />
                    <Form.Text className="draw-a-line font-usr-pass">
                        ลืมรหัสผ่าน
                    </Form.Text>
                    <Link to="/" className='submitcenter'>
                        <button className='submit-black-ground' onClick={login}>
                            เข้าสู่ระบบ
                        </button>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </Link>
                </Form.Group>
                <h1>{loginStatus}</h1>
            </Form>

        </div>
    )
}
