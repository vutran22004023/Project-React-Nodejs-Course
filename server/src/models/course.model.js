import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 255,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      maxLength: 255,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Course', courseSchema);
