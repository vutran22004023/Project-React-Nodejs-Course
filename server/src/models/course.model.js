import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    childname: {
      type: String,
      maxLength: 255,
      required: true,
    },
    slug: {
      type: String,
    },
    video: {
      type: String,
      required: true,
    },
    time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const chapterSchema = new mongoose.Schema(
  {
    namechapter: {
      type: String,
      maxLength: 255,
      required: true,
    },
    videos: [videoSchema],
  },
  {
    timestamps: true,
  }
);

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 255,
      required: true,
      unique: true, // Ensuring course names are unique
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
    video: {
      type: String,
      default: null,
    },
    chapters: [chapterSchema],
    price: {
      type: String,
      required: true,
      enum: ['free', 'paid'],
    },
    priceAmount: {
      type: Number,
      required: function () {
        return this.price === 'paid';
      },
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
