import React from 'react'
import { useState, useEffect } from 'react';
import { auth } from '../Firebase';
import { Card, Form, Button, Alert,Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link} from 'react-router-dom';
import Login from './Login';
import { useNavigate } from 'react-router-dom';







function SignUp() {
    // var [currentUser,setCurrentUser] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [Name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const Navigate = useNavigate()
    const {currentUser} = useAuth();


    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const passChange = (e) => {
        setPassword(e.target.value)
    }
    const passConfirmChange = (e) => {
        setPasswordConfirm(e.target.value)
    }
    const NameChange = (e) => {
        setName(e.target.value)
    }



    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== passwordConfirm) {
            return setError('Password do not match')
        }else if (password.length < 8){
            return setError('password must be eight digit')
        }
        try {
            setError('')
            setLoading(true)
            await auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
                const user = userCredential.user
                user.updateProfile({
                    displayName: Name
                }).then(() => {
                    Navigate("/home")

                    console.log(user)
                })
            })

        } catch {
            setError('Account already exist')
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
                                <h2 className='text-center mb-4'>Sign Up</h2>
                                {error && <Alert variant='danger'>{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type='text' value={Name} required onChange={NameChange} />
                                    </Form.Group>
                                    <Form.Group id='email'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' value={email} required onChange={emailChange} />
                                    </Form.Group>
                                    <Form.Group id='password'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' value={password} required onChange={passChange} />
                                    </Form.Group>
                                    <Form.Group id='password-Confirm'>
                                        <Form.Label>Password-Confirm</Form.Label>
                                        <Form.Control type='password' value={passwordConfirm} required onChange={passConfirmChange} />
                                    </Form.Group>
                                    <Button disabled={loading} type='submit' className='w-100 mt-4'>Sign Up</Button>
                                </Form>
                            </Card.Body>
                        <div className='w-100 text-center mt-2 py-4'>
                            Already have an account?<Link to={"/"}>Log In</Link>
                        </div>
                        </Card>
                    </div>
                </Container>
            </>
        </div>
    )
}

export default SignUp