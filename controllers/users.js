import { UserMessage } from "../models/schemaMessage.js";
import QRCode from "qrcode";

export const getUsers = async (req, res) => {
  try {
    const userMessages = await UserMessage.find();
    res.status(200).json(userMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createUser = async (req, res) => {
  const { _id, name, email, phone } = req.body;
  const badges = [];
  const notification = [];
  const usedRewards = [];
  const qrcode = QRCode.toString(_id, function (err, string) {
    if (err) throw err;
  })
  const newUserMessage = new UserMessage({ _id, name, email, phone, qrcode, badges, notification, usedRewards });
  try {
    await newUserMessage.save();
    res.status(201).json(newUserMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserMessage.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const userExist = await UserMessage.exists({ _id: id });
  if (userExist == null) return res.status(404).send('User does not exist');
  const { name, email, phone, badges, notification, usedRewards } = req.body;
  const updatedUser = { _id: id, name, email, phone, badges, notification, usedRewards }
  await UserMessage.findByIdAndUpdate(req.params.id, updatedUser, { new: true });

  res.send(updatedUser);

}

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userExist = await UserMessage.exists({ _id: id });
  if (userExist == null) return res.status(404).send('User does not exist');

  await UserMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully' });
}
