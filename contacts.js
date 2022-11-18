const fs = require("fs/promises");
const path = require("path");
require("colors");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");

    return console.log(contactsData.bgBlue);
  } catch (error) {
    console.log(error.red);
  }
}

async function getContactById(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(contactsData);
    const findedContactById = data.find((contact, index) => {
      if (contact.id === `${contactId}`) return data[index];
    });
    if (!findedContactById)
      return console.log(
        `There's no user with ID ${contactId} in database`.red
      );
    return console.log(`${JSON.stringify(findedContactById)}`.green);
  } catch (error) {
    console.log(error.red);
  }
}

async function removeContact(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(contactsData);
    const indexOfUserById = data.findIndex((i) => i.id === contactId);
    if (indexOfUserById === -1)
      return console.log(`There's no user with ID ${contactId}`.red);

    const deletedUser = [...data.splice(indexOfUserById, 1)];
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    console.log(
      `User ${deletedUser[0].name} with ID ${deletedUser[0].id} sucsessfully deleted`
        .underline.red
    );
  } catch (error) {
    console.log(error.red);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(contactsData);

    const indexOfUserByName = data.findIndex((i) => i.name === name);
    if (indexOfUserByName !== -1)
      return console.log(`User with name ${name} is already in database`.red);
    const indexOfUserByMail = data.findIndex((i) => i.email === email);
    if (indexOfUserByMail !== -1)
      return console.log(`User with email ${email} is already in database`.red);
    const indexOfUserByPhone = data.findIndex((i) => i.phone === phone);
    if (indexOfUserByPhone !== -1)
      return console.log(
        `User with phone number ${phone} is already in database`.red
      );

    const newId = Math.max(...data.map((contact) => contact.id)) + 1;

    const newContact = {
      id: `${newId}`,
      name: name,
      email: email,
      phone: phone,
    };
    const newContactsList = [...data, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf8");

    return console.log(
      `added new contact for ${name} with phone number: ${phone} and mail: ${email}`
        .green
    );
  } catch (error) {
    console.log(error.red);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
