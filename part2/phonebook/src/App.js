import React, { useState, useEffect } from 'react'
import DisplayContactList from './components/DisplayContactList'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import phoneService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const handleDelete = (id) => {
    const contactToDelete = persons.find(person => person.id === id).name
    if (window.confirm(`Are you sure you want to delete ${contactToDelete}?`)) {
      const newList = persons.filter(person => person.id !== id)
      phoneService
        .remove(id)
        .then(() => setPersons(newList)
        )
      setSuccessMessage(`${contactToDelete} was deleted from notebook`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }
  }

  const addPerson = (e) => {
    e.preventDefault()
    if (newName && newNumber) {
      const personToUpdate = persons.find(person => person.name === newName)
      const confirmMessage = `${newName} is already added to phonebook,
      replace the old number with a new one?`

      if (personToUpdate && window.confirm(confirmMessage)) {
        updateNumber(personToUpdate, newNumber)
      } else if (!personToUpdate) {
        const personObject = {
          name: newName,
          number: newNumber
        }
        phoneService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response))
          })
        setSuccessMessage(`${newName} was added to phonebook`)
      }
    } else {
      window.alert('Please fill both fields.')
    }
    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    }, 3000)
  }

  const updateNumber = (personToUpdate, newNumber) => {
    const updatedPerson = { ...personToUpdate, number: newNumber }
    phoneService
      .update(updatedPerson)
      .then(response => {
        setSuccessMessage(`${newName} number was updated`)
        setPersons(persons.map(person => person.id !== response.id
          ? person
          : response))
      })
      .catch(() => {
        setErrorMessage(`${personToUpdate.name} was already deleted from phonebook`)
        setPersons(persons.filter(person =>
          person.id !== personToUpdate.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add new contact</h2>
      <Notification {...{ successMessage, errorMessage }} />
      <PersonForm {...{ addPerson, newName, handleNewName, newNumber, handleNewNumber }} />
      <h2>Numbers</h2>
      <DisplayContactList
        persons={persons}
        filter={filter}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
