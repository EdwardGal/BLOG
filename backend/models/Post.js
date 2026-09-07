import mongoose from 'mongoose';

const PostSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    timetoread: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
