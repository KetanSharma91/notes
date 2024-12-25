import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = ({ triggerPopup }) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    const [isHidden, setIsHidden] = useState(true);
    const [isDivHidden, setIsDivHidden] = useState(false);

    const handlesubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        triggerPopup("Added");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const toggleNoteWriter = () => {
        setIsDivHidden(true);
        setIsHidden(false);
    };

    const closeNoteWriter = () => {
        setIsDivHidden(false);
        setIsHidden(true);
    };

    return <div className="container container-cn" style={{ marginTop: "100px" }}>
        <div className="note-container">
            <div className={`notewriter ${isDivHidden ? 'hidden' : ''}`} id="notewriter" onClick={toggleNoteWriter} >Take a note...</div>

            <input type="text" placeholder="Title" id="title" className={isHidden ? 'hidden' : ''} name='title' value={note.title} onChange={onChange} />
            {/* <input type="text" placeholder="Tag" id="tag" className='d-block' name='tag' value={note.tag} onChange={onChange} /> */}
            <textarea placeholder="Take a note..." id="description" className={isHidden ? 'hidden' : ''} name='description' value={note.description} onChange={onChange}></textarea>


            <div className="icon-row hidden" id="iconRow" style={{ margin: "10px 15px" }}>
                <span className="close-btn" disabled={note.title.length < 5 || note.description.length < 5} onClick={handlesubmit}>Add</span>
                <span className="close-btn" id='closeBtn' onClick={closeNoteWriter} >Close</span>
            </div>
        </div>
    </div>;
}

export default AddNote;