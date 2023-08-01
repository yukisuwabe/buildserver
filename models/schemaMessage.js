import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: String,
  name: {
    first: {
      type: String
    },
    last: {
      type: String,
      required: true
    }
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
  },
  joined: {
    type: Date,
    default: new Date()
  },
  qrcode: {
    type: String,
    required: true
  },
  badges: [{
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    name: [String],
    visits: Number,
    totalSpend: Decimal128
  }],
  notification: [{
    type: String,
    description: String,
    recieved: {
      type: Date,
      default: new Date()
    }
  }],
  usedRewards: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Reward'
  }]
});

const badgeSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  company: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  rewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }]
});

const rewardSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: {
    type: String,
    required: true
  },
  descripton: {
    type: String,
    required: true
  },
  companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
  requirement: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
  expiration: Date,
  limit: { use: Number, time: String },
  qrcode: String,
  status: { type: String, required: true }
});

const transactionSchema = mongoose.Schema({
  user: { type: String, ref: 'User' },
  transType: { type: String, required: true },
  description: String,
  date: { type: Date, default: new Date() },
  purchase: Decimal128
});

const companySchema = mongoose.Schema({
  name: { type: String, required: true },
  badges: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Badge'
  }],
  partners: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Company'
  }],
  rewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }],
  transaction: [{
    transactionSchema
  }]
});

export const UserMessage = mongoose.model('UserMessage', userSchema);
export const CompanyMessage = mongoose.model('CompanyMessage', companySchema);
export const RewardMessage = mongoose.model('RewardMessage', rewardSchema);
export const BadgeMessage = mongoose.model('BadgeMessage', badgeSchema); 