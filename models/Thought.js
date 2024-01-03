const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: String,
      required: true,
    },
    //this references the subdocument reactionSchema
    reactions: [reactionSchema],
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
postSchema
  .virtual('reactionCount')
  // getter function
  .get(function () {
    return this.reactions.length;
  });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;
