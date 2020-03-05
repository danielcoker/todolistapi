import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

export default {
  User
};
