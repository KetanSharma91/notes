import React, { useContext, useEffect, useState, useRef } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = ({ triggerPopup, query }) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let history = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            history("/");
        }
        // eslint-disable-next-line
    }, [getNotes, history])

    const ref = useRef(null)

    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "default" });

    const handlesubmit = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        triggerPopup('Updated Note');
        refClose.current.click();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const highlightText = (text = "", query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex).map((part, index) =>
            regex.test(part) ? <mark key={index}>{part}</mark> : part
        );
        return parts;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        console.log("true");
    };

    const closeModal = () => {
        setIsModalOpen(false);
        console.log("false");
    };

    return <>
        <button ref={ref} type="button" className="model-btn d-none" id="openModalBtn" onClick={closeModal}>Launch Modal</button>

        <div id="modal" className={`modal ${!isModalOpen ? "" : "d-none"}`}>
            <div className="container container-cn">
                <div className="note-container">

                    <input type="text" id="etitle" className='d-block' name='etitle' value={note.etitle} onChange={onChange} />
                    <textarea id="edescription" name='edescription' className='d-block' value={note.edescription} onChange={onChange}></textarea>

                    <div className="icon-row" id="iconRow" style={{ margin: "10px 15px" }}>
                        <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="close-btn" style={{ background: "transparent" }} onClick={handlesubmit}>Update</button>
                        <button type="button" className="close-btn" id="closeModalBtnFooter" onClick={openModal} ref={refClose} style={{ background: "transparent" }}>Close</button>
                    </div>
                </div>
            </div>
        </div>

        <AddNote triggerPopup={triggerPopup} />

        <div className="container">
            <div className="row note-row" >
                {/* {notes.length === 0 && 'No notes to display'}
                {notes.map((note) => {

                    return <NoteItem key={note._id} note={{
                        ...note,
                        title: highlightText(note.title, query),
                        description: highlightText(note.description, query),
                    }} updateNote={updateNote} triggerPopup={triggerPopup} />
                })} */}
                {notes?.length === 0 && 'No notes to display'}
                {notes?.map((note) => (
                    <NoteItem
                        key={note._id}
                        note={{
                            ...note,
                            title: highlightText(note.title, query),
                            description: highlightText(note.description, query),
                        }}
                        updateNote={updateNote}
                        triggerPopup={triggerPopup}
                    />
                ))}

            </div>
        </div>

    </>
}

export default Notes;