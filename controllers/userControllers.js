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
      // Used req.params.userId because in userRoutes the route is /:userId
      const userData = await User.findById(req.params.userId);
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
  async createUser({ body }, res) {
    try {
      const userData = await User.create(body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // updateUser
  async updateUser({ params, body }, res) {
    try {
      const userData = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
      });
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // deleteUser
  async deleteUser({ params }, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: params.id });
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
