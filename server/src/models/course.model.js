import mongoose from 'mongoose';


const videoSchema = new mongoose.Schema(
  {
    childname: {
      type: String,
      maxLength: 255,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    time: { type: String },
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
export default Course
