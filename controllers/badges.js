import { BadgeMessage } from "../models/schemaMessage.js";
import express from "express";
import mongoose from "mongoose";

export const getBadges = async (req, res) => {
  try {
    const badgeMessages = await BadgeMessage.find();
    res.status(200).json(badgeMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getBadge = async (req, res) => {
  const { id } = req.params;
  try {
    const badge = await BadgeMessage.findById(id);
    res.status(200).json(badge);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createBadge = async (req, res) => {
  const { name, description, company } = req.body;
  const id = new ObjectId(32);
  const rewards = [];
  const newBadgeMessage = new BadgeMessage({ name, description, company, rewards });
  companies.forEach((company) => { CompanyMessage.findOneAndUpdate({ _id: company }, { $addToSet: { badges: [id] } }) })
  try {
    await newUserMessage.save();
    res.status(201).json(newBadgeMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updateBadge = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No badge with that ID');

  const { name, description, company, rewards } = req.body;


  const updatedBadge = { name, description, company, rewards, _id: id };
  await BadgeMessage.findByIdAndUpdate(id, updatedBadge, { new: true });

  res.send(updatedBadge);
}