import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {

    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.status === "Success") {
                    setAuth(true);
                    setName(res.data.email);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => {
                setAuth(false);
                setMessage('Network Error: Please try again later');
                console.log(err);
            });
    }, []);

    const handleDelete = () => {
        axios.get('http://localhost:8081/logout')
            .then(res => {
                setAuth(false);
                navigate('/login');
            })
            .catch(err => {
                setMessage('Network Error: Please try again later');
                console.log(err);
            });
    };

    return (
        <div>
            {auth ?
                <div>
                    <h3>You are Authorized --- {name}</h3>
                    <button onClick={handleDelete}>Logout</button>
                </div>
                :
                <div>
                    <h3>{message}</h3>
                    <h3>Login Now</h3>
                    <Link to="/login">Login</Link>
                </div>
            }
        </div>
    );
};
