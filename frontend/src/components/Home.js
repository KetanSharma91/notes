import React, { useState } from 'react';
import Navbar from './Navbar';
import Notes from './Notes';


const Home = ({ triggerPopup }) => {
    const [query, setQuery] = useState('');

    return <>
        <Navbar triggerPopup={triggerPopup} query={query} setQuery={setQuery} />
        <Notes triggerPopup={triggerPopup} query={query} />
    </>;
}

export default Home;