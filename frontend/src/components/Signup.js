import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/userdata/UserContext';

const Signup = ({triggerPopup}) => {

    const [credentails, setCredentails] = useState({ name: "", email: "", password: "", cpassword: "" });
    const { setUser } = useUser();

    let history = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentails;

        const response = await fetch("https://notebook-backend-ir8y.onrender.com/api/auth/NewUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();
        // console.log(json)

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            setUser({
                name: credentails.name,
                email: credentails.email
            });
            triggerPopup("You have successfully Signed in!");
            history("/home");
        }
        else {
            triggerPopup("User already present");
        }
    }

    const onChange = (e) => {
        setCredentails({ ...credentails, [e.target.name]: e.target.value });
    }

    return <div className="container container-sg" style={{ marginTop: "60px" }}>
        <h1 className="mb-3">Sign in</h1>
        <form onSubmit={handlesubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" onChange={onChange} required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5} />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5} />
            </div>
            <button type="submit" className="btn btn-blue mb-3">Sign Up</button>
        </form>
        <h1 style={{ fontSize: "1rem" }}>Already Account <Link to="/" style={{ opacity: 0.7 }}>login</Link></h1>
    </div>;
}

export default Signup;