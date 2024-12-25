import React, { useEffect, useState } from 'react';
import { useUser } from '../context/userdata/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.png';

const Navbar = ({ triggerPopup, query, setQuery }) => {
    const { user } = useUser();

    let history = useNavigate();
    const [storedUser, setStoredUser] = useState(null);

    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (localUser) {
            setStoredUser(localUser);
        } else if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            setStoredUser(user);
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem('token');
        history('/');
        triggerPopup("You have successfully logged out!");
        window.location.reload();
    };

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    return <>
        <header className="header">
            <div className="d-flex jc-spaceb">
                <Link to="/home" className="logo filter-i">
                    <img src={logo} alt="logo" style={{ width: "80px" }} />
                </Link>

                <form className="search-big-btn noted-n" action="" onClick={handleSearchSubmit}>
                    <button type="submit" className="search-button" aria-label="Submit form">
                        <i className="i-search"></i>
                    </button>
                    <input type="text" placeholder="Search.." name="search" value={query} onChange={handleSearch} />
                </form>

                <div id="user-details" style={{ cursor: "pointer" }} className="user-details">
                    {storedUser?.email ? storedUser.email.charAt(0).toUpperCase() : "U"}
                    <span className="user-info">
                        <p>
                            {storedUser?.name ||
                                (storedUser?.email.split("@")[0].charAt(0).toUpperCase() +
                                    storedUser?.email.split("@")[0].slice(1)) ||
                                "User"}
                        </p>
                        <br />
                        <p>{storedUser?.email || "Email"}</p> <br />
                        <Link onClick={handleLogout}>
                            Logout
                        </Link>
                    </span>
                </div>

            </div>

        </header>
    </>;
}

export default Navbar;