import mongoose from 'mongoose';

interface AccountSchema extends mongoose.Document {
  user: String;
  accountNumber: Number;
  accountBalance: Number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    accountNumber: {
      type: mongoose.Schema.Types.Number,
      unique: true,
    },
    accountBalance: {
      type: mongoose.Schema.Types.Number,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<AccountSchema>('accounts', accountSchema);
