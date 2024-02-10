import React from 'react';
import logo from './assets/logo-nlw-expert-small.svg';
import { NewNoteCard } from './components/new-note-card';
import { NoteCard } from './components/note-card';

interface INote {
  id: string
  date: Date
  content: string
}

export const App = () => {
  const [notes, setNotes] = React.useState<INote[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })
  const [search, setSearch] = React.useState('')

  const onNoteCreated = (content: string) => {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content
    }

    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const onNoteDeleted = (id: string) => {
    const notesArray = notes.filter((note) => note.id !== id)
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearch(query)
  }

  const filteredNotes = search !== ''
    ? notes.filter((note) => note.content.toLowerCase().includes(search.toLowerCase()))
    : notes

  return (
    <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
      <img src={logo} alt="Logo NLW expert" />

      <form className='w-full'>
        <input
          className='w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none'
          type="text"
          placeholder='Busque em suas notas...'
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid gridcol-1 md:grid-clos-2 lg:grid-cols-3 gap-6 auto-rows-[250px] '>
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => {
          return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        })}

      </div>
    </div>
  )
}

