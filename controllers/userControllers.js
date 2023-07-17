const { User } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // get one user by generated id
  async getUserById(req, res) {
    try {
      const userData = await User.findById(req.params.userId).populate(
        "thoughts" // Populate the thoughts field
      );
      if (!userData) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // createUser
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // updateUser
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // deleteUser
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
