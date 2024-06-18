import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

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
      default: null,
    },
    video: {
      type: String,
      maxLength: 255,
      default: null,
    },
    price: {
      type: Number,
      default: null,
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
