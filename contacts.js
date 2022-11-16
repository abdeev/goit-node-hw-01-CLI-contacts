import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("./db/contacts.json");

export async function listContacts() {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    console.log(contactsData);
    return contactsData;
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(contactsData);
    const findedContactById = data.find((contact, index) => {
      if (contact.id === `${contactId}`) return data[index];
    });
    return console.log(findedContactById);
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(contactsData);
    const indexOfUserById = data.findIndex((i) => i.id === contactId);
    if (indexOfUserById === -1)
      return console.log(`There's no user with ID ${contactId}`);

    const deletedUser = [...data.splice(indexOfUserById, 1)];
    await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
    console.log(`user ${JSON.stringify(deletedUser)} sucsessfully deleted`);
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(contactsData);

    const indexOfUserByName = data.findIndex((i) => i.name === name);
    if (indexOfUserByName !== -1)
      return console.log(`User with name ${name} is already in database`);
    const indexOfUserByMail = data.findIndex((i) => i.email === email);
    if (indexOfUserByMail !== -1)
      return console.log(`User with email ${email} is already in database`);
    const indexOfUserByPhone = data.findIndex((i) => i.phone === phone);
    if (indexOfUserByPhone !== -1)
      return console.log(
        `User with phone number ${phone} is already in database`
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

    return console.log("added new contact: ", newContact);
  } catch (error) {
    console.log(error);
  }
}
