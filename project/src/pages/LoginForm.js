import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import DataTable from 'react-data-table-component';
export default function LoginForm() {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();


    const login = () => {


        const data = { username, password };
        fetch('http://localhost:3001/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.login == "pass") {
                    alert('login success')

                    console.log(data.test) //role
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role', JSON.stringify(data.test));

                    navigate(0)

                    if (data.test.role === 'User') {
                        navigate('/user')

                    } else if (data.test.role === 'Admin') {
                        navigate('/admin')

                    } else {
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                        navigate('/login')
                    }

                } else {
                    alert('username หรือ password ไม่ถูกต้อง')
                }
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    useEffect(() => {

        const token = localStorage.getItem('token')
        fetch('http://localhost:3001/authen', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == "ok") {

                    alert('คุณ Login ไปแล้วกรุณาออกจากระบบก่อน')
                    window.location = ('/home')

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <div>
            <Navbar />
            <Container>

                <Form className='App-login-form font-css ' >
                    <br />
                    <Form.Group className="mb-3 font-css " controlId="formBasicEmail">
                        <h1 className="app-login mt-5 mb-5">เข้าสู่ระบบ</h1>
                        <Form.Label className='font-usr-pass mb-3'>ชื่อผู้ใช้ :</Form.Label>
                        <Form.Control className='use-pass mb-3' type="username" placeholder="" required onChange={(event) => {
                            setUsername(event.target.value)
                        }} />


                        <Form.Label className='font-usr-pass mb-3'>รหัสผู้ใช้ :</Form.Label>
                        <Form.Control className='use-pass mb-3' type="password" placeholder="" required onChange={(event) => {
                            setPassword(event.target.value)
                        }} />
                        <Form.Text className="draw-a-line font-usr-pass">
                            ลืมรหัสผ่าน
                        </Form.Text>

                        <Button variant="primary" disabled={!username || !password} type='button' className='submit-black-ground mt-4' onClick={login}>เข้าสู่ระบบ</Button>{' '}

                    </Form.Group>

                </Form>
            </Container>

        </div>
    )
}
