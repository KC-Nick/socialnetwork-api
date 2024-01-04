const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    //change this to userId because it's not the username
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: function (timestamp) {
        return new Date(timestamp).toLocaleString();
      }
    },
    reactions: [{
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
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
    ]
  },
  {
    //this changes how the document behaves when converting a document to JSON
    toJSON: {
      //this includes virtuals in the JSON conversion
      virtuals: true,
      getters: true,
      //and this hides the unique identifer
      id: false,
    },
  }
);

//creates a virtual to retrieve the length of the thought model's reaction array
thoughtSchema
  .virtual('reactionCount')
  // getter function
  .get(function () {
    return this.reactions.length;
  });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;