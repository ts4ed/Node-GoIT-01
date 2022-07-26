const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);

    const contactsList = JSON.parse(data);

    return console.table(contactsList);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);

    const idContact = contactsList.filter(
      (contact) => contact.id === contactId
    );

    return console.table(idContact);
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);

    const filteredContacts = contactsList.filter(
      (contact) => contact.id != contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    console.table(filteredContacts);
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = { name, email, phone, id: uuidv4() };
    const data = await fs.readFile(contactsPath);
    const contactsList = JSON.parse(data);
    const NewContactList = [...contactsList, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(NewContactList));

    console.table(NewContactList);
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
