import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const host = "https://notebook-backend-ir8y.onrender.com/api/notes/";
    const Notesinitial = [];
    const [notes, setNotes] = useState(Notesinitial);

    // Get all Notes
    const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            }
        });

        const json = await response.json();
        // console.log(json)

        setNotes(json)
    }

    //Add a Note
    const addNote = async (title, description, tag) => {

        // API Call
        const response = await fetch(`${host}addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        setNotes(notes.concat(note));

    }

    // Delete a Note
    const deleteNote = async (id) => {

        // API Call
        const response = await fetch(`${host}deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            }
        });

        const json = await response.json();
        console.log(json)

        // console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {

        // console.log(id);

        // API Call
        const response = await fetch(`${host}updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authtoken": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        console.log(json)


        //logic to edit in client side

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newNotes)

    }



    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }} >
            {props.children}
        </NoteContext.Provider >
    )
}

export default NoteState;