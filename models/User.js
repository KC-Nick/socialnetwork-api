const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //check this regex with ``
      //match creates a validator in SchemaType string which uses Regexp
      match: [`/^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/`, 'Please enter a valid email address'],
    },
    thoughts: [
        {
        //this type is used to store _id values of the Thought documents associated with this user
        //it represents a unique identifier for the document in this database
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      friends: [
        {
         //check if this is right
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
  },
  {
    //this changes how the document behaves when converting a document to JSON
    toJSON: {
    //this includes virtuals in the JSON conversion
      virtuals: true,
    },
    //and this hides the unique identifer of the User when converted to JSON for security
    id: false,
  }
);

const User = model('user', userSchema);

module.exports = User;