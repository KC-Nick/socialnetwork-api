const { Schema, model } = require('mongoose');

// Schema to create Reaction model to be used as the subdocument
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
        maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      virtuals: true,
      id: false,
    },
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;