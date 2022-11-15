import { nanoid } from 'nanoid';
import React, { Component } from 'react';
import ContactForm from './phonebook/contactForm/ContactForm';
import { ContactList } from './phonebook/contactList/ContactList';
import { Container } from './phonebook/container';
import Filter from './phonebook/filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addNewContact = data => {
    const { contacts } = this.state;
    const { name, number } = data;
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      this.notify(name);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    const state = this.state;
    const visibleContacts = state.contacts.filter(
      contact => contact.id !== contactId
    );
    this.setState({ contacts: visibleContacts });
  };

  onFilter = filter => {
    this.setState({ filter });
  };

  componentDidMount() {
    // if (localStorage.getItem('phone-book'))
    //   this.setState({
    //     contacts: JSON.parse(localStorage.getItem('phone-book')),
    //   });
    const parsedContacts = localStorage.getItem('phone-book');
    if (parsedContacts)
      this.setState({
        contacts: JSON.parse(parsedContacts),
      });
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('phone-book', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <>
        <Container>
          <h2>Phonebook</h2>
          <ContactForm onSubmit={this.addNewContact} />
          <h2>Contacts</h2>
          {contacts.length > 0 && (
            <Filter filter={filter} onFilter={this.onFilter} />
          )}
          {contacts.length > 0 && (
            <ContactList
              contacts={visibleContacts}
              deleteContact={this.deleteContact}
            />
          )}
        </Container>
      </>
    );
  }
}

export default App;
