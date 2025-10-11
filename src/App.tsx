import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { NoteList } from './components/NoteList/NoteList'
import { defaultNote, type Note } from './types/Note'
import { NoteCard } from './components/NoteCard/NoteCard'

function App() {
  const [count, setCount] = useState(0)
  const [notes,setNotes] = useState<Note[]>([
          {id:"1",title:"nota 1",content:"esto es una notadwadwadawdwadawdwadawdwa"},
          {id:"2",title:"nota 2",content:"esto es una nota "},
          {id:"3",title:"nota 3",content:"la tercera nota"}
        ]);
  
  const [currentNote,setCurrentNote] = useState<Note>(defaultNote);
  const editNote = (note:Note)=>{
    const index = notes.findIndex(n=>n.id === note.id);
    if(index === -1) return;
    setNotes(prev=>{
      const next = [...prev];
      next[index] = note;
      return next;
    });
  }

  return (
    <>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={currentNote.title} 
          onChange={
            ({target})=>setCurrentNote({
              ...currentNote,
              title:target.value
            })
          }/>
        <label htmlFor="content">Content</label>
        <input type="text" id="content" value={currentNote.content} 
        onChange={
            ({target})=>setCurrentNote({
              ...currentNote,
              content:target.value
            })
          }/>
      </div>
      <button onClick={()=>editNote(currentNote)}>save</button>
      <br />
      <NoteList notes={notes} onSelecteNotes={(note)=>setCurrentNote(note)}>
      </NoteList>
    </>
  )
}

export default App
