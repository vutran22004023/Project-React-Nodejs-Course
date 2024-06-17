import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

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
    },
    video: {
      type: String,
      maxLength: 255,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    slug: { type: String, slug: 'title', slugPaddingSize: 4, unique: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Course', courseSchema);
