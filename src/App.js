import React, {useState, useEffect} from 'react';
import contactService from './service/contact';
import Notification from "./components/notification";

function App() {

  const [contacts, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [searchKey, setSearchKey] = useState();
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');


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
      let replace = false;
      let match = {};
      if(contacts.some(contact => contact.name.toLowerCase() === newName.toLowerCase())){
           replace = window.confirm(`${newName} is already added to phone book, replace the old number with a new one?`);
           match = contacts.find(contact => contact.name.toLowerCase() === newName.toLowerCase())
      }
      const personObj = {
          name: newName,
          number: newNumber
      }
      if(replace){
          contactService
              .replace(match.id, personObj)
              .then(returnedData => {
                  setPersons(contacts.map(map => map.id === match.id ? returnedData : map))
              })
              .catch(error => {
                setNotificationType('error');
                setNotification('Contact was already deleted');
                setTimeout(()=>{
                    setNotificationType('');
                    setNotification(null);
                }, 5000);
              });
      }

      contactService
          .update(personObj)
          .then(newContact => {
              setPersons(contacts.concat(newContact));
              setNotification(`Added ${newContact.name}`);
              setNotificationType('success');
              setTimeout(()=> {
                  setNotification(null);
                  setNotificationType('');
              }, 5000);
          })

      setNewName('');
      setNumber('');
  }

  const deleteContact = (id, name) => {
      console.log(id,name);
      const result = window.confirm(`Delete ${name} ?`);
      if(result){
          contactService
              .remove(id);
      }
      setPersons(contacts.filter(data => data.id !== id));
  }

  return (
      <div>
          <h2>Phone Book</h2>
          <Notification message={notification} type={notificationType}/>
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
                      <div>
                      <li key={contact.name}>{contact.name} : {contact.number}</li>
                      <button onClick={()=>deleteContact(contact.id, contact.name)}> Delete contact </button>
                      </div>
                  )}
          </ul>
          </div>
      </div>

  );
}

export default App;
