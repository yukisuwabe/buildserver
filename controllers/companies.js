import { CompanyMessage } from "../models/schemaMessage.js";
import express from "express";
import mongoose from "mongoose";

export const getCompanies = async (req, res) => {
  try {
    const companyMessages = await CompanyMessage.find();
    res.status(200).json(companyMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await CompanyMessage.findById(id);
    res.status(200).json(company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createCompany = async (req, res) => {
  const { name } = req.body;
  const badges = [];
  const rewards = [];
  const transaction = [];
  const newCompanyMessage = new CompanyMessage({ name, badges, rewards, transaction });
  try {
    await newCompanyMessage.save();
    res.status(201).json(newCompanyMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateCompany = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No company with that ID');
  const { name, badges, rewards, transaction } = req.body;

  const updatedCompany = { name, badges, rewards, transaction, _id: id };

  await CompanyMessage.findByIdAndupdate(_id, updatedCompany, { new: true });

  res.send(updatedCompany);
}