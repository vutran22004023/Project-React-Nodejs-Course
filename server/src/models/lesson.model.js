import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

mongoose.plugin(slug);

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 255,
      required: true,
    },
    description: {
      type: String,
    },
    video: {
      type: String,
      maxLength: 255,
      required: true,
    },
    course_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    slug: { type: String, slug: 'title', slugPaddingSize: 4, unique: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Lesson', lessonSchema);
