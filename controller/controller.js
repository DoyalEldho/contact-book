const contactModel = require('../model/contactModel');
const express = require('express');

//  add Contacts
const addContact = async (req, res) => {
    try {
        
        const {name,email,phone} = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // checking email format
    const emailRegex = /^\S+@\S+\.\S+$/;
   if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
}
         const contacts = new contactModel({name,email,phone});
         const saveDetails = await contacts.save();
         res.status(201).json({message:"Contact Saved"});

    } catch (error) {

    // handle duplication of email
    if (error.code === 11000) {
      return res.status(401).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Server Error', error });
    }
};


//get all contacts
const getAllContacts = async(req,res)=>{
   try {
     
    const allContacts = await contactModel.find();
    res.json(allContacts);
     
   } catch (error) {
    
   }
}

// update contacts info
const updateContact = async (req, res) => {
  const { name, phone, email } = req.body;

  try {

    const emailRegex = /^\S+@\S+\.\S+$/;
   if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
}

    const updated = await contactModel.findByIdAndUpdate(
      req.params.id,{ name, email, phone }, { new: true, runValidators: true } 
    );

    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//delete
const deleteContact = async (req, res) => {
  try {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'contact not found' });

    await contactModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'contact deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {addContact,getAllContacts,updateContact,deleteContact};