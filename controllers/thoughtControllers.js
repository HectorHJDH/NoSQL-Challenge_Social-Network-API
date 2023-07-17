const { Thought } = require("../models");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.json(thoughtData);
      console.log(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // get one thought by generated id
  async getThoughtById(req, res) {
    try {
      const thoughtData = await Thought.findById(req.params.thoughtId);
      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // createThought
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // updateThought
  async updateThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // deleteThought
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
