import mongoose from 'mongoose';

interface TransactionSchema extends mongoose.Document {
  user: String;
  transactionType: String;
  transactionAmount: Number;
  description: String;
  transactionDate: Date;
}

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  transactionType: {
    type: mongoose.Schema.Types.String,
    enum: ['DEBIT', 'CREDIT'],
  },
  transactionAmount: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.String,
  },
  transactionDate: {
    type: mongoose.Schema.Types.Date,
  },
});

export default mongoose.model<TransactionSchema>(
  'transactions',
  transactionSchema,
);
