import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// Create bootcamp slug from the name
TaskSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Task = mongoose.model('Task', TaskSchema);

export default Task;
