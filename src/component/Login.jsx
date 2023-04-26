import React from 'react'
import { useState, useEffect } from 'react';
import { auth } from '../Firebase';
import { Card, Form, Button, Alert,Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link,useNavigate } from 'react-router-dom';
import SignUp from './SignUp'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();


    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const passChange = (e) => {
        setPassword(e.target.value)
    }






    async function handleLogin(e) {
        e.preventDefault()

        // if (password !== passwordConfirm) {
        //     return setError('Password do not match')
        // }
        try {
            setError('')
            setLoading(true)
            await auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
                const user = userCredential.user
                navigate("/home")
            })

        } catch {
            setError("Accout does not exist")
        }
        setLoading(false)
    }



    return (
        <div>
            <>
                <Container className="d-flex align-item-center justify-content-center mt-4"
                    style={{ minHeight: '100vh' }}>
                    <div className="w-100" style={{ maxWidth: '400px' }}>

                        <Card>
                            <Card.Body>
                                <h2 className='text-center mb-4'>Log In</h2>
                                {error && <Alert variant='danger'>{error}</Alert>}
                                <Form onSubmit={handleLogin}>
                                    <Form.Group id='email'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' value={email} required onChange={emailChange} />
                                    </Form.Group>
                                    <Form.Group id='password'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' value={password} required onChange={passChange} />
                                    </Form.Group>
                                    <Button disabled={loading} type='submit' className='w-100 mt-4'>Login In</Button>
                                </Form>
                            </Card.Body>
                        <div className='w-100 text-center mt-2 py-4'>
                            Create an account?<Link to={"/signup"}>Sign Up</Link>
                        </div>
                        </Card>
                    </div>
                </Container>
            </>
        </div>
    )
}

export default Login