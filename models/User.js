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
      //match creates a validator in SchemaType string which uses Regex
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
    },
    thoughts: [
      {
        thoughtId:
        {
          //this type is used to store _id values of the Thought documents associated with this user
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      },
    ],
    friends: [
      {
        friendId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],
  },
  {
    //this changes how the document behaves when converting a document to JSON
    toJSON: {
      //this includes virtuals in the JSON conversion
      virtuals: true,
      getters: true,
      // the unique identifer of the User when converted to JSON for security
      id: false,
    },
  }
);

//creates a virtual to retrieve the length of the user's friends array
userSchema
  .virtual('friendCount')
  // getter function
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;