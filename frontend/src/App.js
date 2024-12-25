import './App.css';
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Mess from './components/Mess';
import { UserProvider } from './context/userdata/UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); 
  };

  return (
    <>
      <NoteState>
        <UserProvider>
          <Mess message={popupMessage} show={showPopup} />
          <Router>
            <Routes>
              <Route path="/" element={<Login triggerPopup={triggerPopup} />} />
              <Route path="/home" element={<Home triggerPopup={triggerPopup} />} />
              <Route path="/signup" element={<Signup triggerPopup={triggerPopup} />} />
            </Routes>
          </Router>
        </UserProvider>
      </NoteState >
    </>
  );
}

export default App;
