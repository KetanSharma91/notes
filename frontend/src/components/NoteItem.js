import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = ({ note, updateNote, triggerPopup }) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return <div className="card note">
        <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <div className="icons">
                <div className="card-options">
                    <button onClick={() => { updateNote(note) }}>
                        <span className="icon"><i className="i-edit"></i><span className="tooltip">Update</span></span>
                    </button>
                    <button onClick={() => { deleteNote(note._id); triggerPopup("Deleted Note") }}>
                        <span className="icon"><i className="i-delete"></i><span className="tooltip">Delete</span></span>
                    </button>
                </div>
            </div>
        </div>
    </div >;
}

export default NoteItem;