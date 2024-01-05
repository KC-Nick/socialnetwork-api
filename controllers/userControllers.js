const { User, Thought } = require('../models');

module.exports = {
  // 
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .select('-__v')
        .populate('thoughts');

      res.json(users);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params._id })
        .select('-__v')
        .populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params._id });
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ user_id: user._id });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params._id },
        //this takes an object and sets it to the body input
        { $set: { username: req.body.username } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  async addFriend(req, res) {

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        { $addToSet: { friends: { _id: req.body.friendId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params._id },
        { $pull: { friends: { _id: req.params.friendId } } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
};
