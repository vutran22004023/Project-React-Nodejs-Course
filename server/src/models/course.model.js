import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug);

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
    slug: { type: String, slug: 'childname', slugPaddingSize: 4, unique: true },
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
    slug: { type: String, slug: 'name', slugPaddingSize: 4, unique: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Course', courseSchema);
