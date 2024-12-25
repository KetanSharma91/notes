import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/userdata/UserContext';

const Login = ({triggerPopup}) => {

    const [credentails, setCredentails] = useState({ email: "", password: "" });
    const { setUser } = useUser();
    let history = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://notebook-backend-ir8y.onrender.com/api/auth/Login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentails.email, password: credentails.password })
        });

        const json = await response.json();
        // console.log(json)

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            setUser({
                email: credentails.email
            });
            triggerPopup("You have successfully Logged in!");
            history("/home");
        }
        else {
            setUser(null);
            triggerPopup("Invalid credentails");
            credentails.email = '';
            credentails.password = '';
        }
    }

    const onChange = (e) => {
        setCredentails({ ...credentails, [e.target.name]: e.target.value });
    }
    return <div className="container container-sg" style={{ marginTop: "160px" }}>
        <h1 className="mb-3">Sign in</h1>
        <form onSubmit={handlesubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={credentails.email} onChange={onChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={credentails.password} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-blue">Log in</button>
        </form>
        <h1 style={{ fontSize: "1rem" }}>Not Have a Account <Link to="/signup" style={{ opacity: 0.7 }}>Create it</Link></h1>
    </div>;
}

export default Login;