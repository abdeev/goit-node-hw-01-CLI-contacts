const { Command } = require("commander");
// import {
//   addContact,
//   getContactById,
//   listContacts,
//   removeContact,
// } from "./contacts.js";
const contactsHandler = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsHandler.listContacts();
      break;

    case "get":
      contactsHandler.getContactById(id);
      break;

    case "add":
      contactsHandler.addContact(name, email, phone);
      break;

    case "remove":
      contactsHandler.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
