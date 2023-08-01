import { ObjectId } from "mongodb";
import { RewardMessage, CompanyMessage } from "../models/schemaMessage.js";

export const getReward = async (req, res) => {
  try {
    const RewardMessages = await RewardMessage.find();
    res.status(200).json(RewardMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createReward = async (req, res) => {
  const { name, description, companies, requirement, expiration, limit, status } = req.body;
  const id = new ObjectId(32);
  const QRCode = require('qrcode');
  const qrcode = QRCode.toString(id, function (err, string) {
    if (err) throw err;
  })
  const newRewardMessage = new RewardMessage({ id, name, description, companies, requirement, expiration, limit, qrcode, status });
  companies.forEach((company) => { CompanyMessage.findOneAndUpdate({ _id: company }, { $addToSet: { rewards: [id] } }) })
  try {
    await newRewardMessage.save();
    res.status(201).json(newRewardMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}