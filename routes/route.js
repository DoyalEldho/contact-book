const express = require('express');
const { addContact, getAllContacts, updateContact, deleteContact } = require('../controller/controller');
const contactRouter =express.Router();

contactRouter.post('/contacts',addContact);
contactRouter.get('/contacts',getAllContacts);
contactRouter.patch('/contacts/:id',updateContact);
contactRouter.delete('/contacts/:id',deleteContact);

module.exports = contactRouter;