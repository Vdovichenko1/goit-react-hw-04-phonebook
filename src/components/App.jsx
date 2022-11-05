import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import useLocalStorage from './useLocalStorage';

const LS_KEY = 'reader_item';

export default function App() {
  const [contacts, setContacts] = useLocalStorage(LS_KEY, []);
  const [filter, setFilter] = useState('');

  const fromSubmitHandler = ({ name, number }) => {
    const todo = {
      id: nanoid(),
      name,
      number,
    };
    const findName = contacts.find(
      e => e.name.toLowerCase() === todo.name.toLowerCase()
    );
    findName
      ? toast.error(`${todo.name} is already in contacts`)
      : setContacts([todo, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(todo =>
      todo.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(state => state.filter(todo => todo.id !== contactId));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={fromSubmitHandler} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        deleteContacts={deleteContact}
      />
      <ToastContainer autoClose={3000} />
    </>
  );
}
