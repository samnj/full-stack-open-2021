import React from 'react'

const DisplayContactList = ({ persons, filter, handleDelete }) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {filtered.map(person =>
        <div key={person.name}>
          <DisplayContact person={person} handleDelete={handleDelete} />
        </div>
      )}
    </div>
  )
}

const DisplayContact = ({ person, handleDelete }) => {
  return (
    <>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </>
  )
}

export default DisplayContactList
