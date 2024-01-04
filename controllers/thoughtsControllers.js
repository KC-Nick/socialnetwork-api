const { Thought, User } = require('../models');

module.exports = {

  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()
        .select('-__v')
        .populate('reactions');

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params._id })
        .select('-__v')
        .populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const user = await User.findOneAndUpdate(
        { _id: req.body.user },
        //this takes a value and pushes it to the thoughts array
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const user = await Thought.findOneAndUpdate(
        { _id: req.params._id },
        //this takes an object and sets it to the body input
        { $set: { thoughtText: req.body.thoughtText } },
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

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params._id });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      await thought.reactions.remove();
      res.json({ message: 'Successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },


  async addReaction(req, res) {

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params._id },
        //this adds to the reactions array of the Thought model
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params._id },
        //this pulls value from reactions array
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};