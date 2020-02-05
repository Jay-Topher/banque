import mongoose from 'mongoose';

export interface iAccountSchema extends mongoose.Document {
  user: string;
  accountNumber: string;
  accountBalance: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
// todo account balance should be in kobo

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    accountNumber: {
      type: mongoose.Schema.Types.String,
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

export default mongoose.model<iAccountSchema>('accounts', accountSchema);
