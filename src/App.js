import React, {useState, useEffect} from 'react';
import contactService from './service/contact';

function App() {

  const [contacts, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [searchKey, setSearchKey] = useState();


  useEffect(() => {
      contactService
          .getAll()
          .then(contactList => setPersons(contactList))
  }, []);

  const newPerson = (event) => {
      console.log(event.target.value);
      setNewName(event.target.value);
  }

  const newNum = (event) => {
      setNumber(event.target.value);
  }

  const searchList = (event) => {
      setSearchKey(event.target.value);
  }

  const contactDisplay = searchKey ?
      contacts.filter(contact => contact.name.toLowerCase().includes(searchKey)) : contacts;


  const newPersons = (event) => {
      event.preventDefault();
      if(contacts.some(contact => contact.name === newName)){
          alert(`${newName}is already saved in your phonebook`);
          return;
      }
      const personObj = {
          name: newName,
          number: newNumber
      }
      console.log('setting new name');
      contactService
          .update(personObj)
          .then(newContact => setPersons(contacts.concat(newContact)));
      setNewName('');
      setNumber('');
  }

  return (
      <div>
          <h2>Phone Book</h2>
          <label> Search </label>
          <input onChange={searchList}/>
        <form>
            <div>
          <label htmlFor="name">Name</label>
          <input value={newName} onChange={newPerson} id="name"/>
            </div>
            <div>
          <label htmlFor='phone'>Number</label>
            <input value={newNumber} onChange={newNum} id='phone'/>
            </div>
          <button onClick={newPersons} type="submit">Add</button>
        </form>
          <h2>Numbers</h2>
          <div>
              <ul>
                  {contactDisplay.map(contact =>
                      <li key={contact.name}>{contact.name} : {contact.number}</li>
                  )}
          </ul>
          </div>
      </div>

  );
}

export default App;
